const express = require('express');
const morgan = require('morgan');
const db = require('./db/database');
const app = express();
const dotenv = require("dotenv");

//Setings
dotenv.config();
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(express.static(__dirname + '../../doc'));

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(`/api/${process.env.VERSION_API}/auth`, require('./routes/auth'));
app.use(`/api/${process.env.VERSION_API}/users`, require('./routes/users'));
app.use(`/api/${process.env.VERSION_API}/products`, require('./routes/products'));
app.use(`/api/${process.env.VERSION_API}/tracking`, require('./routes/tracking'));
module.exports = app; 