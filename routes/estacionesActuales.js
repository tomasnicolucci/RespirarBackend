const router = require('express').Router();
const controllerActuales = require('../controllers/estacionesActuales')

//Datos actuales
router.get('/estaciones', async (req, res) => {
    res.json(await controllerActuales.getEstaciones());
})

router.get('/estacion/:id', async (req, res) => {
    res.json(await controllerActuales.getEstacionById(req.params.id));
})


module.exports = router