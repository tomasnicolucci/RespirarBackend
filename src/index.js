const express = require('express');
require('dotenv').config();
const path = require('path');
var cors = require('cors');

const app = express()
const port = (process.env.PORT || '3004')
const actualesRouter = require('../routes/estacionesActuales')
const historicosRouter = require('../routes/estacionesHistoricas')

app.use(cors());
app.use('/', actualesRouter);
app.use('/', historicosRouter);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`listening on port ${port}`));