const router = require('express').Router();
const data = require('../data/dataEstaciones')


router.get('/estaciones', async (req, res) => {
    res.json(await data.getEstaciones());
})

router.get('/estacion/:id', async (req, res) => {
    res.json(await data.getEstacionById(req.params.id));
})

router.get('/atributos/:id', async (req, res) => {
    res.json(await data.getAtributos(req.params.id));
})

module.exports = router