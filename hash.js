const bcrypt = require("bcrypt");

function hashPassword(password) {

  bcrypt.hash(password, 10, function (err, hash) {
    console.log(hash);
  });


}

hashPassword("jlkjlkj")
module.exports = hashPassword;
