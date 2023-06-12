const datosHistoricos = require('../data/dataHistorica');

async function getHistoricosById(id, attr) {
    return datosHistoricos.getHistoricosById(id, attr);
}

async function exportCsv(id, attr) {
    return datosHistoricos.exportCsv(id, attr);
}

async function exportExcel(id, attr) {
    return datosHistoricos.exportExcel(id, attr);
}

module.exports = {getHistoricosById, exportCsv, exportExcel}