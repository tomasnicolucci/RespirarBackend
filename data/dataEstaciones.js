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

module.exports = {getEstaciones}