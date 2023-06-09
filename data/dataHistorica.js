require('dotenv').config();
const sequelize = require('sequelize');

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



module.exports = {getHistoricosById}