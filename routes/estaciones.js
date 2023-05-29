const router = require('express').Router();
const data = require('../data/dataEstaciones')


router.get('/estaciones', async (req, res) => {
    res.json(await data.getEstaciones());
})

module.exports = router