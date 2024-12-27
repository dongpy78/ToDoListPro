const jwt = require("jsonwebtoken");

const authConstants = require("../constants/auth.constants");

class TokenUtil {
  static generateAccessToken({ payload, secret, expiresIn = authConstants.JwtTime.AccessTonken }) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  static generateRefreshToken({ payload, secret, expiresIn = authConstants.JwtTime.RefreshToken }) {
    return jwt.sign(payload, secret, { expiresIn });
  }
}

module.exports = TokenUtil;
