const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router.post("", UserController.createUser);

router.get("", checkAuth, UserController.getUserFromJWT);

module.exports = router;