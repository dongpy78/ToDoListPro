const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser());

//! Connect to database
require("./share/database/pg.database").connect();

//! Routes
app.use('/api', require("./v1/routes"))

module.exports = app;
