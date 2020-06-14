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
          res.status(201).json(createdBoard._id);
        })
      } catch (e) {
        res.status(500).json({
          message: 'Creating a new board failed',
          e: e,
        });
      }
    }
  });
};

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
};

exports.getBoards = async (req, res) => {
  if (!req.query.userId && !req.query.organizationId) {
    try {
      const boards = await getBoardsByUser(req.userData.userId);
      res.status(200).json(boards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching boards for user connected failed',
        e: e,
      });
    }
  } else if (req.query.userId && req.query.organizationId) {
    try {
      const boards = await getBoardsByOrganizationAndByUser(req.query.userId, req.query.organizationId);
      res.status(200).json(boards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching boards for this user in this organization failed',
        e: e,
      });
    }
  } else if (req.query.userId && !req.query.organizationId) {
    try {
      const boards = await getBoardsByUser(req.query.userId);
      res.status(200).json(boards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching boards for this user failed',
        e: e,
      });
    }
  } else if (!req.query.userId && req.query.organizationId) {
    try {
      const boards = await getBoardsByOrganization(req.query.organizationId);
      res.status(200).json(boards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching boards for organization failed',
        e: e,
      });
    }
  } else {
    res.status(400).json({
      message: 'Requires some params or at least, a connected user'
    });
  }
}

getBoardsByUser = async (userId) => {
  try {
    return await Board.find({
      'member.user': userId
    });
  } catch (e) {
    console.log(e);
  }
}

getBoardsByOrganization = async (organizationId) => {
  try {
    return await Board.find({
      organizationId: organizationId
    });
  } catch (e) {
    console.log(e);
  }
}

getBoardsByOrganizationAndByUser = async (userId, organizationId) => {
  try {
    return await Board.find({
      $and: [
        { organizationId: organizationId },
        { 'member.user': userId }
      ]
    });
  } catch (e) {
    console.log(e);
  }
}

exports.getById = async (req, res) => {
  try {
    const board = await board.findById(req.params.id);
    res.status(200).json(board);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Fetching board failed',
      e: e,
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
      e: e,
    });
  }
};