const Board = require('../../models/board');

module.exports = async (data) => {
    console.log('CHECK BOARD');

    try {
        const boards = data;
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
        console.log(error);
        return false;
    }
}