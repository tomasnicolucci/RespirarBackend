const router = require('express').Router();
const controllerHistoricos = require('../controllers/estacionesHistoricas')

//Datos historicos
router.get('/getHistoricosById/', async (req, res) => {
    const {id, attr} = req.query
    //console.log(req.query)
    res.json(await controllerHistoricos.getHistoricosById(id, attr));
})

router.get('/getHistoricosByIdFecha/', async (req, res) => {
    const {id, attr, fMin, fMax} = req.query
    //console.log(req.query)
    res.json(await controllerHistoricos.getHistoricosByIdFecha(id, attr, fMin, fMax));
})

//Exportacion datos
router.get('/exportCsv/', async (req, res) => {
    const {id, attr} = req.query
    res.json(await controllerHistoricos.exportCsv(id, attr));
})

router.get('/exportExcel/', async (req, res) => {
    const {id, attr} = req.query
    res.json(await controllerHistoricos.exportExcel(id, attr));
});

module.exports = router