require('dotenv').config();
const Sequelize = require('sequelize');


let connection = null;

async function getConnection() {
    if(connection == null){
        connection = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS,{
            host:'localhost',
            dialect:'mysql'
        })
    }
    return connection;
}

module.exports = {getConnection}