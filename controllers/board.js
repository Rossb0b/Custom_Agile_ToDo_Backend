const Board = require('../models/board');

exports.createBoard = async (req, res) => {

    const board = new Board(req.body);

    /**
     * Async mongoose method that check that our board respect Board's model
     */
    board.validate(async (e) => {

        if (e) {
            res.status(500).json({
                message: 'Not a valid board',
                e: e,
            });
        } else {
            try {
                await board.save().then(createdBoard => {
                    res.status(201).json({
                        message: 'Creating a new board succed',
                        board: {
                            ...createdBoard,
                            id: createdBoard._id,
                        },
                    });
                })
            } catch (e) {
                res.status(500).json({
                    message: 'Creating a new board failed',
                    e: e,
                });
            }
        }
    });
}

exports.editBoard = async (req, res) => {

    const board = new Board(req.body);

    /**
     * Async mongoose method that check that our board respect Board's model
     */
    board.validate(async (e) => {

        if (e) {
            res.status(500).json({
                message: 'Not a valid board',
                e: e,
            });
        } else {
            try {
                result = await Board.updateOne({ _id: board._id }, board);

                if (result.n > 0) {
                    console.log(result);
                    // res.status(200).json({
                    //     message: 'Updated the board with success',
                    //     board: {
                    //         ...
                    //     }
                    // })
                } else {
                    console.log(result);
                    // res.status(401).json({
                    //     message: 'Updating the board failed',
                    //     e : ?
                    // });
                }
            } catch (e) {
                res.status(500).json({
                    message: 'Couldn\'t update the board',
                    e: e,
                });
            }
        }

    });
}

exports.getBoards = async (req, res) => {
    try {
      const boards = await Board.find({
        member: {
            user: {
                "$in" : [req.query.userId]
                }
            }
      });
      res.status(200).json({
        message: 'Boards successfully fetched',
        boards: boards,
      });
    } catch (e) {
      res.status(500).json({
        message: 'Fetching boards failed'
      });
    }
  };

exports.deleteBoard = async (req, res) => {
    try {
      const result = await Board.findOneAndDelete({
        _id: req.params.id
      }).then(() => {
          res.status(200).json({
            message: 'deletion succed',
          });
      });
    } catch (e) {
      res.status(401).json({
        message: 'deletion failed',
      });
    }
  };