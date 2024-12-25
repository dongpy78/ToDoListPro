const _ = require('lodash');
const authConstants = require('../constants/auth.constants');


class AuthValidate {
  static isEmailValid(email) {
    // Kiểm tra nếu email là một chuỗi
    if (!_.isString(email)) {
      throw new Error("Invalid input: email is required");
    }

    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Kiểm tra và trả về true nếu email hợp lệ
    return emailRegex.test(email);
  }

  static isUsernameValid(username) {
    if (!_.isString(username)) {
      throw new Error("Invalid input: username is required");
    }
    return username.length >= 8;
  }

  static checkTypeLogin(input) {
    if (this.isEmailValid(input)) {
      return authConstants.LoginType.Email;
    } else if (this.isUsernameValid(input)) {
      return authConstants.LoginType.Username;
    }
    return null;
  }


}

module.exports = AuthValidate;

//10: email
//20: password