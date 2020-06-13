const express = require('express');
const BoardController = require('../controllers/board');
const checkAuth = require('../middlewares/auth/check-auth');

const router = express.Router();

router.post(
    '',
    checkAuth,
    BoardController.createBoard
);

router.put(
    '/:id',
    checkAuth,
    BoardController.editBoard
);

router.get(
    '/boardsByUser/:id',
    checkAuth,
    BoardController.getBoardsByUser
);

router.get(
    '/boardsByOrganization/:id',
    checkAuth,
    BoardController.getBoardsByOrganization
);

router.get(
    '/:id',
    checkAuth,
    BoardController.getById
);

router.delete(
    '/:id',
    checkAuth,
    BoardController.deleteBoard
);



module.exports = router;