const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY;

const generateToken = ({ Username, StaffId }) => {
  try {
    const payload = { Username, StaffId };
    return jwt.sign(payload, SECRECT_KEY, { expiresIn: "7d" });
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

module.exports = generateToken;
