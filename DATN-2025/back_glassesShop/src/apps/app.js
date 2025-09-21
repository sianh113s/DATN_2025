const express = require("express");
const cookieParser = require("cookie-parser");
const { connectionRedis } = require("../common/init.redis");
connectionRedis();
const cors = require("cors");
const app = express();
const config = require("config");
const router = require("../routers/web");
// config cookie-parser
app.use(cookieParser());
app.use(express.json());
app.use("/uploads/images", express.static(config.get("app.baseImageUrl")));

app.use(
  cors(
    {
      origin: true,
      credentials: true,
    }
  )
)
// config body-parser

// config static folder

// config router
app.use(router);

module.exports = app;
