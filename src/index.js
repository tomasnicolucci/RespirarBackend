const express = require('express');
const path = require('path');

const app = express()

app.use(require('./routes'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3004, () => console.log('listening on port 3004'));