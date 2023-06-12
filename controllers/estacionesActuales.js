const datosActuales = require('../data/dataActual');

async function getEstaciones() {
    return datosActuales.getEstaciones();
}

async function getEstacionById(id) {
    return datosActuales.getEstacionById(id);
}

module.exports = {getEstaciones, getEstacionById}