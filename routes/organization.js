const express = require('express');
const OrganizationController = require('../controllers/organization');
const AuthGuard = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    AuthGuard,
    OrganizationController.createOrganization
);

router.post(
    '/nameCheck',
    AuthGuard,
    OrganizationController.checkOrganizationName
);

router.get(
    '/:id',
    AuthGuard,
    OrganizationController.getById
);

router.get(
    '',
    AuthGuard,
    OrganizationController.getAll
);

module.exports = router;