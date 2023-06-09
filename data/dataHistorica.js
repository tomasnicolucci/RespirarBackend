require('dotenv').config();
const sequelize = require('sequelize');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const excelJS = require('exceljs');

const connection = new sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS,{
    host:'localhost',
    dialect:'mysql'
})

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

async function getHistoricosById(id, attr){
    //console.log(id, attr)
    const nombreTabla = id.replaceAll(':', '_') + '_Estacion'
   
    const datosHistoricos = connection.define(nombreTabla, {
        "recvTime": sequelize.STRING,
        "entityId": sequelize.STRING,  
        "entityType": sequelize.STRING,
        "attrName": sequelize.STRING,
        "attrType": sequelize.STRING,
        "attrValue": sequelize.STRING  
    }, {
        tableName: nombreTabla
    });

    let resultados;
    await datosHistoricos.findAll({attributes:['recvTime','entityId', 'attrName', 'attrValue'], where: {entityId: id, attrName: attr}}) 
    .then(datos => {
    resultados = datos
    //console.log(resultados)
    })
    return resultados
}

async function exportCsv(id, attr){
    const estacion = await getHistoricosById(id, attr);
    //console.log(estacion)
  
    const csvWriter = createCsvWriter({
        path: 'data.csv',
        header: [
            {id: 'date', title: 'Fecha'},
            {id: 'entityId', title: 'Id estacion'},
            {id: 'attrName', title: 'Tipo de dato'},
            {id: 'attrValue', title: 'Valor'}
        ]
    });

    let records =[]
    estacion.forEach(element => {
        let registro = {date: element.recvTime, entityId: element.entityId, attrName: element.attrName, attrValue: element.attrValue};
        records.push(registro);  
    })
    
    csvWriter.writeRecords(records).then(() => {
        console.log('Descargando Csv')
    });
}

async function exportExcel(id, attr){
    const estacion = await getHistoricosById(id, attr);
    //console.log(estacion)
    
    const workbook = new excelJS.Workbook();
    const fileName = 'data.xlsx'

    const sheet = workbook.addWorksheet('Data');
    const reColumns = [
        {header: 'Fecha', key: 'date'},
        {header: 'Id estacion', key: 'entityId'},
        {header: 'Tipo de dato', key: 'attrName'},
        {header: 'Valor', key: 'attrValue'}
    ];
    sheet.columns = reColumns;
        
    estacion.forEach(element => {
        const rows = [
            {
                date: element.recvTime,
                entityId: element.entityId,
                attrName: element.attrName,
                attrValue: element.attrValue
            }
        ];
        sheet.addRows(rows);
    });
        
    workbook.xlsx.writeFile(fileName).then(() => {
        console.log('Descargando Excel');
    });
    
}

module.exports = {getHistoricosById, exportCsv, exportExcel}