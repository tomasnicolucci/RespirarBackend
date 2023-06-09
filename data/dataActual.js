require('dotenv').config();
const axios = require('axios');

const url_orion = (process.env.URL_ORION || "http://localhost:1026/v2/entities/") 

async function getEstaciones(){
    try{
        const estaciones = await axios.get(url_orion)
        return estaciones.data
    }
    catch(error){
        console.log('Error get estaciones')
        return null
    }  
}

async function getEstacionById(id){
    try{
        const estacion = await axios.get(url_orion + id)
        return estacion.data
    }catch(error){
        console.log('Error get estacion por id')
        return null
    }  
}

module.exports = {getEstaciones, getEstacionById}