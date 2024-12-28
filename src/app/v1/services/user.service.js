const UserModel = require("../models/user.model");

class UserService {
  async getUser(req) {
    const { userId } = req.infoUserByToken;
    const user = await UserModel.getUser({ id: userId });
    return {
      user: user ? user : [],
      message: "User found successfully",
    }
  }
}

module.exports = new UserService();

// xem den phut 38:44