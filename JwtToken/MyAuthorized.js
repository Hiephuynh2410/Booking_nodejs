const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY;

const MyAuthorized = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  jwt.verify(token.split(" ")[1], SECRECT_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("Decoded token:", decoded);
    next();
  });
};

module.exports = MyAuthorized;
