const jwt = require("jsonwebtoken");
const config = require("config");
exports.verifyAuthenticationCustomer = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      jwt.verify(
        accessToken,
        config.get("app.jwtAccessKey"),
        (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: "Unauthorized" });

          }
          req.accessToken = accessToken;
          next();
        }
      );
    } else {
      return res.status(401).json({ message: "authentication required" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Unauthorized" });
  }
}