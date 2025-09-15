const exprees = require("express");
const cookieParser = require("cookie-parser");
const { connectionRedis } = require("../common/init.redis");
connectionRedis();
const app = exprees();
const config = require("config");
const router = require("../routers/web");
// config cookie-parser
app.use(cookieParser());
app.use(exprees.json());
// config body-parser

// config static folder

// config router
app.use(router);

module.exports = app;
