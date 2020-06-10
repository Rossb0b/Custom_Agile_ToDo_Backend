const express = require('express');
const OrganizationController = require('../controllers/organization');
const CheckMembers = require('../middlewares/organization/checkMembers');
const CheckMethodology = require('../middlewares/organization/checkMethodology');
const CheckBoard = require('../middlewares/organization/checkBoards');

const router = express.Router();

router.post(
    '',
    CheckMembers,
    CheckMethodology,
    CheckBoard,
    OrganizationController.createOrganization
);

module.exports = router;