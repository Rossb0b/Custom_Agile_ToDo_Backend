const Board = require('../models/board');

exports.createBoard = async (req, res) => {

  const board = new Board();
  board.name = req.body.name;
  board.list = req.body.list;
  board.member = req.body.member;
  board.organization = req.body.organization;
  console.log(board);
  console.log(req.body);

  /**
   * Async mongoose method that check that our board respect Board's model
   */
  board.validate(async (e) => {

    if (e) {
      return res.status(500).json({
        message: 'Not a valid board',
        e: e,
      });
    }

    let createdBoard;

    try {
      createdBoard = await board.save();
      console.log(createdBoard);
      res.status(201).json(createdBoard._id);
    } catch (e) {
      res.status(500).json({
        message: 'Creating a new board failed',
        e: e,
      });
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
          return res.status(200).json({
              message: 'Updated the board with success',
              board: board,
          });
        } else {
          return res.status(401).json({
              message: 'Updating the board failed',
              e : "Unknow error with the edit",
          });
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

  let boards;

  if (!req.query.userId && !req.query.organizationId) {
    try {
      boards = await getBoardsByUser(req.userData.userId);
      console.log(boards);
      return res.status(200).json(boards);
    } catch (e) {
      return res.status(500).json({
        message: 'Fetching boards for user connected failed',
        e: e,
      });
    }
  } else if (req.query.userId && req.query.organizationId) {
    try {
      boards = await getBoardsByOrganizationAndByUser(req.query.userId, req.query.organizationId);
      return res.status(200).json(boards);
    } catch (e) {
      return res.status(500).json({
        message: 'Fetching boards for this user in this organization failed',
        e: e,
      });
    }
  } else if (req.query.userId && !req.query.organizationId) {
    try {
      boards = await getBoardsByUser(req.query.userId);
      return res.status(200).json(boards);
    } catch (e) {
      return res.status(500).json({
        message: 'Fetching boards for this user failed',
        e: e,
      });
    }
  } else if (!req.query.userId && req.query.organizationId) {
    try {
      boards = await getBoardsByOrganization(req.query.organizationId);
      return res.status(200).json(boards);
    } catch (e) {
      return res.status(500).json({
        message: 'Fetching boards for organization failed',
        e: e,
      });
    }
  } else {
    return res.status(400).json({
      message: 'Requires some params or at least, a connected user'
    });
  }
}

getBoardsByUser = async (userId) => {
  try {
    return await Board.find({
      'member.user': userId
    }).populate({
      path: 'member',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      },
    }).populate({
      path: 'organization',
      model: 'Organization',
      select: '_id name'
    }).populate({
      path: 'list.card',
      model: 'Card'
    });
  } catch (e) {
    console.log(e);
  }
}

getBoardsByOrganization = async (organizationId) => {
  try {
    return await Board.find({
      organizationId: organizationId
    }).populate({
      path: 'member',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      },
    }).populate({
      path: 'organization',
      model: 'Organization',
      select: '_id name'
    }).populate({
      path: 'list.card',
      model: 'Card'
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
    }).populate({
      path: 'member',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      },
    }).populate({
      path: 'organization',
      model: 'Organization',
      select: '_id name'
    }).populate({
      path: 'list.card',
      model: 'Card'
    });
  } catch (e) {
    console.log(e);
  }
}

exports.getById = async (req, res) => {

  let board;

  try {
    board = await Board.findById(req.params.id).populate({
      path: 'member',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      },
    }).populate({
      path: 'organization',
      model: 'Organization',
      select: '_id name'
    }).populate({
      path: 'list.card',
      model: 'Card'
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Fetching board failed',
      e: e,
    });
  }

  res.status(200).json(board);
};

exports.deleteBoard = async (req, res) => {

  let result;

  try {
    result = await Board.findOneAndDelete({ _id: req.params.id });
  } catch (e) {
    return res.status(401).json({
      message: 'deletion failed',
      e: e,
    });
  }

  res.status(200).json({ message: 'deletion succed', });
};