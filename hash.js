const bcrypt = require("bcrypt");
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

async function verifyPassword(password, hash) {
  const result = await bcrypt.compare(password, hash);
  return result;
}

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
