const jwt = require("jsonwebtoken");
const config = require("config");

exports = function auth(req, res, next) {
  const token = req.headers("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");
  try {
    const payload = jwt.verify(token, config.get("jwtPrivateKey"));
    res.status(200).send(payload);
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}