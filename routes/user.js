const express = require('express');

const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');

const AddAvatar = require('../middlewares/images/user/avatar');

const checkAuth = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post("", UserController.createUser, AuthController.autoLogin);

router.get("", checkAuth, UserController.getUserFromJWT);

router.post("/avatar", AddAvatar);


module.exports = router;