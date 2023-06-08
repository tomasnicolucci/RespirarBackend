const router = require('express').Router();
const dataActual = require('../data/dataActual')
const dataHistorica = require('../data/dataHistorica')


//Datos actuales
router.get('/estaciones', async (req, res) => {
    res.json(await dataActual.getEstaciones());
})

router.get('/estacion/:id', async (req, res) => {
    res.json(await dataActual.getEstacionById(req.params.id));
})

//Datos historicos
router.get('/historicos', async (req, res) => {
    res.json(await dataHistorica.historicos());
})

router.get('/estMysql', async (req, res) => {
    res.json(await dataHistorica.estMysql());
})

router.get('/estMysqlById/:id', async (req, res) => {
    res.json(await dataHistorica.estMysqlById(req.params.id));
})

router.get('/getHistoricosById/:id', async (req, res) => {
    res.json(await dataHistorica.getHistoricosById(req.params.id));
})

module.exports = router