const userService = require("../services/user.service");

class UserController {
  async getUser(_, res) {
    try {
      const user = await userService.getUser();
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error in UserController:", error.message);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}

module.exports = new UserController();
