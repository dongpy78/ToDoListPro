const AuthService = require("../services/auth.service");

class AuthController {
  async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }


}

module.exports = new AuthController();


