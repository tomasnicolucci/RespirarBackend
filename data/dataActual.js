const axios = require('axios');

async function getEstaciones(){
    try{
        const estaciones = await axios.get("http://localhost:1026/v2/entities")
        return estaciones.data
    }
    catch(error){
        console.log('Error get estaciones')
        return null
    }  
}

async function getEstacionById(id){
    try{
        const estacion = await axios.get("http://localhost:1026/v2/entities/" + id)
        return estacion.data
    }catch(error){
        console.log('Error get estacion por id')
        return null
    }  
}

async function getAtributos(id){
    try{
        const temp = await axios.get("http://localhost:1026/v2/entities/" + id + "/attrs")
        return temp.data
    }catch(error){
        return null
    }
}

module.exports = {getEstaciones, getEstacionById, getAtributos}