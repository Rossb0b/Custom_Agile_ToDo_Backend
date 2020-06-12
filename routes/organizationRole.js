const express = require('express');
const RoleController = require('../controllers/organizationRole');
const AuthGuard = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    AuthGuard,
    RoleController.createRole
);

module.exports = router;