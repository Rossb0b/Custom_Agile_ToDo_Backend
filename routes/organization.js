const express = require('express');
const OrganizationController = require('../controllers/organization');
const AuthGuard = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    AuthGuard,
    OrganizationController.createOrganization
);

module.exports = router;