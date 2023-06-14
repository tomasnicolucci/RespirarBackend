const datosHistoricos = require('../data/dataHistorica');

async function getHistoricosById(id, attr) {
    return datosHistoricos.getHistoricosById(id, attr);
}

async function getHistoricosByIdFecha(id, attr, minDate, maxDate) {
    return datosHistoricos.getHistoricosByIdFecha(id, attr, minDate, maxDate);
}

async function exportCsv(id, attr) {
    return datosHistoricos.exportCsv(id, attr);
}

async function exportExcel(id, attr) {
    return datosHistoricos.exportExcel(id, attr);
}

module.exports = {getHistoricosById, getHistoricosByIdFecha, exportCsv, exportExcel}