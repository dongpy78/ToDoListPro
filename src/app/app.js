const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json())

app.use(morgan("dev"));

require("./share/database/pg.database").connect();

app.use('/api', require("./v1/routes"))

module.exports = app;
