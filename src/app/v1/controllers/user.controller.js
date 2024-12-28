const userService = require("../services/user.service");

class UserController {
  async getUser(req, res) {
    try {
      const result = await userService.getUser(req);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      })
    }
  }
}

module.exports = new UserController();
