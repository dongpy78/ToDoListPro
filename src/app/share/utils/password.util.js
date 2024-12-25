const bcrypt = require("bcrypt");

class PassWordUtils {
  static hash({password}) {
    return bcrypt.hash(password, 10);
  }
  static compare({password, hash}) {
    return bcrypt.compare(password, hash);
  }
}

module.exports = PassWordUtils;

