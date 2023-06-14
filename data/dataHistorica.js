require('dotenv').config();
const sequelize = require('sequelize');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const excelJS = require('exceljs');
const conn = require('../dbConnection/mysqlConn')


async function getHistoricosById(id, attr){
    
    const nombreTabla = id.replaceAll(':', '_') + '_Estacion'
    
    const connection = await conn.getConnection()
    
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
    await datosHistoricos.findAll({attributes:['recvTime','entityId', 'attrName', 'attrType', 'attrValue'], where: {entityId: id, attrName: attr}}) 
    .then(datos => {
    resultados = datos
    })
    return resultados
}

async function getHistoricosByIdFecha(id, attr, minDate, maxDate){
    const dataEstacion = await getHistoricosById(id, attr);
    const dateMin = new Date(minDate);
    const dateMax = new Date(maxDate);
    let dataFiltrada = [];

    dataEstacion.forEach(element => {
        let date = new Date(element.recvTime);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getYear() + 1900;
        let fecha = new Date(`${month}/${day}/${year}`)
        
        if(fecha >= dateMin && fecha <= dateMax){
            dataFiltrada.push(element);
        }
    })
    return dataFiltrada;
}

async function exportCsv(id, attr){
    const estacion = await getHistoricosById(id, attr);
  
    const csvWriter = createCsvWriter({
        path: 'data.csv',
        header: [
            {id: 'date', title: 'Fecha'},
            {id: 'entityId', title: 'Id estacion'},
            {id: 'attrName', title: 'Tipo de dato'},
            {id: 'attrValue', title: 'Valor'}
        ]
    });

    let records = []
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

module.exports = {getHistoricosById, getHistoricosByIdFecha, exportCsv, exportExcel}