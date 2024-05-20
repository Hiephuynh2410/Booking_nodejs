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

module.exports = {
  isUsernameUnique,
};
