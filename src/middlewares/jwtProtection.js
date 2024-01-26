const { verify } = require("jsonwebtoken");
require("dotenv").config();

exports.jwtProtection = (role) => {
  return (req, res, next) => {
    console.log(role);
    var token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        if (decoded.role != role) {
          return res.status(403).json({ message: "Forbidden" });
        }
        next();
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
