const express = require('express');
const UserController = require('../../controllers/user.controller');
const AuthMiddleware = require('../../middlewares/auth.middleware');
const router = express.Router();

router.use(AuthMiddleware.checkToken);

router.get("/profile", UserController.getUser);

module.exports = router;