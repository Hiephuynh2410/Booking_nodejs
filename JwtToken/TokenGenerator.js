const jwt = require("jsonwebtoken");
const SECRECT_KEY = process.env.SECRECT_KEY;

const generateToken = (payload) => {
    try {
        return jwt.sign(payload, SECRECT_KEY, { expiresIn: "7d" });
    } catch (error) {
        console.error("Token generation error:", error);
        throw error;
    }
};

const generateResetToken = (payload) => {
    try {
        return jwt.sign(payload, SECRECT_KEY, { expiresIn: "1h" });
    } catch (error) {
        console.error("Reset token generation error:", error);
        throw error;
    }
};

module.exports = { generateToken, generateResetToken };
