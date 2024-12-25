const authConstants = require("../../share/constants/auth.constants");
const PasswordUtil = require("../../share/utils/password.util");
const AuthValidate = require("../../share/validates/auth.validate");
const UserModel = require("../models/user.model");




class AuthService {
  async register(body) {
    // B1. Get data from body
    const { email, password } = body;

    // B2. Check validate email and password
    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const checkEmail = AuthValidate.isEmailValid(email); // true or false

    if (!checkEmail) {
      throw new Error("Invalid email format");
    }

    // B3. Check email exits or not exits
    const user = await UserModel.findOneByEmail({ email });

    // B4. If account exits
    if (user) {
      throw new Error("Email already exists");
    }

    // B4. If account not exits
    // B5. Hash password
    const hashPassword = await PasswordUtil.hash({ password });

    // B6. Save account to database
    const newUser = await UserModel.create({ email, password: hashPassword });

    return {
      user: {
        userId: newUser.id,
        email: newUser.email,
      },
      message: "User registered successfully",
    }
  }

  async login(body) {
    // B1. Get data from body
    const { identity, password } = body;

    // B2. Check type login
    const checkTypeLogin = AuthValidate.checkTypeLogin(identity);

    // B3. Check Validate
    let user;
    if (checkTypeLogin === authConstants.LoginType.Email) {
      const checkEmail = AuthValidate.isEmailValid(identity);
      if (!checkEmail) {
        throw new Error("Invalid email format");
      }
      // B4. Check email exits or not exits
      user = await UserModel.findOneByEmail({ email: identity });
    } else if (checkTypeLogin === authConstants.LoginType.Username) {
      const checkUsername = AuthValidate.isUsernameValid(identity);
      if (checkUsername) {
        throw new Error("Invalid username format");
      }
      // B4. Check username exits or not exits
      user = await UserModel.findOneByUsername({ username: identity });
    }

    if (!user) {
      throw new Error("Account does not exist");
    }

    // B5. Check Compare password
    const comparePassword = await PasswordUtil.compare({ password, hash: user.password_hash });
    if (!comparePassword) {
      throw new Error("Password is incorrect");
    }


    return {
      message: "Login successfully",
    }
  }
}

module.exports = new AuthService();