const Boards = require('../../models/board');

module.exports = async (boardIds) => {
    try {
        let formatedData =  [];
        if (boardIds.length > 0) {
            for (let i = 0; i < boardIds.length; i++) {
                const result = await Boards.findById(boardIds[i]);
                if (result !== null) {
                    formatedData.push(result);
                }
            }
        }
        return formatedData;
    } catch (error) {
        // console;log('error findBoards: ', error);
        return false;
    }
};