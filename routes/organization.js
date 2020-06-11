const express = require('express');
const OrganizationController = require('../controllers/organization');

const router = express.Router();

router.post(
    '',
    OrganizationController.createOrganization
);

module.exports = router;