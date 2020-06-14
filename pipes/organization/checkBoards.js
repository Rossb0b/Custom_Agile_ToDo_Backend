const Board = require('../../models/board');

module.exports = async (boards) => {
    try {
        let newArr = [];
        for (let i = 0; i < boards.length; i++) {
            const resBoard = await Board.findById(boards[i].boardId);
            // if response is valid
            if(resBoard) {
                newArr.push(boards[i]);
            }
        }
        return newArr;
    } catch (error) {
        // console.log('BOARDS: ', error);
        return [];
    }
}