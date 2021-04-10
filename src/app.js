const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const db = require('./db/database');
const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '../../doc'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/${process.env.VERSION_API}/auth`, require('./routes/auth'));
app.use(`/api/${process.env.VERSION_API}/users`, require('./routes/users'));
app.use(`/api/${process.env.VERSION_API}/products`, require('./routes/products'));
app.use(`/api/${process.env.VERSION_API}/tracking`, require('./routes/tracking'));
module.exports = app;