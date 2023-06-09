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
router.get('/getHistoricosById/', async (req, res) => {
    const {id, attr} = req.query
    //console.log(req.query)
    res.json(await dataHistorica.getHistoricosById(id, attr));
})

module.exports = router