const exprees = require("express");
const app = exprees();
const config = require("config");
const router = require("../routers/web");
app.use(exprees.json());
// config body-parser

// config static folder

// config router
app.use(router);

module.exports = app;
