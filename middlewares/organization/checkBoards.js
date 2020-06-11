const Board = require('../../models/board');

module.exports = async (req, res, next) => {
    try {
        const boards = req.body.organization.board;
        let newArr = [];
        for (let i = 0; i < boards.length; i++) {
            const resBoard = await Board.findById(boards[i].boardId);
            // if response is valid
            if(resBoard) {
                newArr.push(boards[i]);
            }
        }
        req.body.organization.board = newArr;
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error occured'
        });
    }
}