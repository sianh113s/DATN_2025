// const { route } = require("../src/routers/web");



// module.exports = {
//   app: {
//     router: `${__dirname}/../src/routers/web.js`,
//     staticFolder: `${__dirname}/../src/public`,
//   },
// };
module.exports = {
  app: require("./app"),
  db: require("./db"),
  mail: require("./mail"),
};