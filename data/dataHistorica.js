require('dotenv').config();
const sequelize = require('sequelize');
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

module.exports = {getHistoricosById, getHistoricosByIdFecha}