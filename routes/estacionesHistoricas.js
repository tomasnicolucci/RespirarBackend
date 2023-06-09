const router = require('express').Router();
const controllerHistoricos = require('../controllers/estacionesHistoricas')

//Datos historicos
router.get('/getHistoricosById/', async (req, res) => {
    const {id, attr} = req.query
    res.json(await controllerHistoricos.getHistoricosById(id, attr));
})

router.get('/getHistoricosByIdFecha/', async (req, res) => {
    const {id, attr, minDate, maxDate} = req.query
    res.json(await controllerHistoricos.getHistoricosByIdFecha(id, attr, minDate, maxDate));
})

module.exports = router