const sequelize = require('sequelize');

const connection = new sequelize('respirar','root','secret',{
    host:'localhost',
    dialect:'mysql'
})

const estaciones = connection.define('estaciones', {
    idEstacion: sequelize.STRING,  
    nombre: sequelize.STRING,
    ubicacion: sequelize.STRING
})

const datosHistoricos = connection.define('datosHistoricos', {
    "id": {type:sequelize.INTEGER, primaryKey:true},
    "idEstacion": sequelize.STRING,  
    "fecha": sequelize.STRING,
    "temperature": sequelize.DOUBLE,
    "relativeHumidity": sequelize.DOUBLE,
    "reliability": sequelize.DOUBLE,
    "pm1": sequelize.DOUBLE,
    "pm10": sequelize.DOUBLE,
    "pm25": sequelize.DOUBLE
})

try {
    connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}


async function estMysql(){
    let resultados;
    await estaciones.findAll({attributes:['idEstacion', 'nombre', 'ubicacion']}) 
        .then(datos => {
        resultados = datos
        })
    return resultados
}

async function estMysqlById(id){
    const estacion = await estaciones.findOne({attributes:['idEstacion', 'nombre', 'ubicacion'],
        where:{
            idEstacion: id
        }
    })
    
    return estacion
}

async function historicos(){
    let resultados;
    await datosHistoricos.findAll({attributes:['idEstacion', 'fecha', 'temperature', 'relativeHumidity', 'reliability',
    'pm1', 'pm10', 'pm25']}) 
    .then(datos => {
    resultados = datos
    console.log(resultados)
    })
    return resultados
}

async function getHistoricosById(id){
    let resultados;
    await datosHistoricos.findAll({attributes:['idEstacion', 'fecha', 'temperature', 'relativeHumidity', 'reliability',
    'pm1', 'pm10', 'pm25'], where: {idEstacion: id}}) 
    .then(datos => {
    resultados = datos
    console.log(resultados)
    })
    return resultados
}

module.exports = {historicos, estMysql, estMysqlById, getHistoricosById}