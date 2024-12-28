const tokenConfig = require('../../share/configs/token.config');
const authConstants = require('../../share/constants/auth.constants');
const TokenUtil = require('../../share/utils/token.util');

class AuthMiddleware {
  static checkToken(req, res, next) {
    // B1. Get token from header
    const accessToken = TokenUtil.removeBearerPrefix(req.headers.authorization);

    // B2. Check access token
    if (!accessToken) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    // B3. Check cookie have refresh token
    const refreshToken = req.cookies[authConstants.KeyCookie.RefreshToken];

    // B4. Check refresh token
    if (!refreshToken) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    // B5. Verify access token
    try {
      const infoUserByToken = TokenUtil.verifyToken({
        token: accessToken,
        secret: tokenConfig.AccessSecret,
      });
      console.log(infoUserByToken);
      req.infoUserByToken = infoUserByToken;
      next();
    } catch (error) {
      // B6. Handle error token
      switch (error.name) {
        case authConstants.JwtMessage.TokenExpriredError:
          return res.status(401).json({
            message: 'Token expired'
          });
        case authConstants.JwtMessage.TokenSignatureError:
          return res.status(401).json({
            message: 'Token signature error'
          });
        default:
          return res.status(500).json({
            message: 'Internal server error'
          });
      }
    }

  }
}

module.exports = AuthMiddleware;