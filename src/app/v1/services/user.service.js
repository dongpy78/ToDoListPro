const userModel = require("../models/user.model");

class UserService {    
  async getUser() {
    return userModel.getUser({ id: 1 });
  }
}

module.exports = new UserService();