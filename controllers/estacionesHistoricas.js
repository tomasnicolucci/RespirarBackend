const datosHistoricos = require('../data/dataHistorica');

async function getHistoricosById(id, attr) {
    return datosHistoricos.getHistoricosById(id, attr);
}

async function getHistoricosByIdFecha(id, attr, minDate, maxDate) {
    return datosHistoricos.getHistoricosByIdFecha(id, attr, minDate, maxDate);
}

module.exports = {getHistoricosById, getHistoricosByIdFecha}