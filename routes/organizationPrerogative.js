const express = require('express');
const PrerogativeController = require('../controllers/orgaPrerogative');
const AuthGuard = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    AuthGuard,
    PrerogativeController.createPrerogative
);

module.exports = router;