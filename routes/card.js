const express = require('express');
const CardController = require('../controllers/card');
const checkAuth = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    checkAuth,
    CardController.createCard
);

router.put(
    '/:id',
    checkAuth,
    CardController.editCard
);

router.get(
    '/:id',
    checkAuth,
    CardController.getById
);

router.get(
    '',
    checkAuth,
    CardController.getCards
);

router.delete(
    '/:id',
    checkAuth,
    CardController.deleteCard
);

module.exports = router;