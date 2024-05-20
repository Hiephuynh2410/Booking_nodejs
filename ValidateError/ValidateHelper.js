const Staff = require("../models/staff.model");

async function isUsernameUnique(username) {
  try {
    const existingStaff = await Staff.findOne({
      where: { Username: username },
    });
    return !existingStaff;
  } catch (error) {
    throw error;
  }
}

async function RegexPassword(password) {
  try {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/;

    const isValid = regex.test(password);

    return isValid;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  isUsernameUnique,
  RegexPassword,
};
