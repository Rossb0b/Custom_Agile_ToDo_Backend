const express = require('express');
const NotificationController = require('../controllers/notification');

const router = express.Router();

router.get("", NotificationController.getNotificationsForThisUser);

module.exports = router;