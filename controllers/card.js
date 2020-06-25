const Card = require('../models/card');

exports.createCard = async (req, res) => {

  const card = new Card(req.body);

  /**
   * Async mongoose method that check that our board respect Board's model
   */
  card.validate(async (e) => {

    if (e) {
      res.status(500).json({
        message: 'Not a valid card',
        e: e,
      });
    } else {
      try {
        await card.save().then(createdCard => {
          res.status(201).json(createdCard);
        })
      } catch (e) {
        res.status(500).json({
          message: 'Creating a new card failed',
          e: e,
        });
      }
    }
  });
};

exports.editCard = async (req, res) => {

  const card = new Card(req.body);

  /**
   * Async mongoose method that check that our board respect Board's model
   */
  card.validate(async (e) => {

    if (e) {
      res.status(500).json({
        message: 'Not a valid card',
        e: e,
      });
    } else {
      try {
        result = await Card.updateOne({ _id: card._id }, card);

        if (result.n > 0) {
          return res.status(200).json({
              message: 'Updated the card with success',
              card: card,
          });
        } else {
          return res.status(401).json({
              message: 'Updating the card failed',
              e : "Unknow error on card update",
          });
        }
      } catch (e) {
        res.status(500).json({
          message: 'Couldn\'t update the card',
          e: e,
        });
      }
    }

  });
};

exports.getCards = async (req, res) => {
  if (req.query.boardId && !req.query.userId) {
    try {
      const cards = await getCardsByBoard(req.query.boardId);
      res.status(200).json(cards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching cards for this board failed',
        e: e,
      });
    }
  } else if (req.query.userId && req.query.boardId) {
    try {
      const cards = await getCardsByBoardAndByUser(req.query.userId, req.query.boardId);
      res.status(200).json(cards);
    } catch (e) {
      res.status(500).json({
        message: 'Fetching cards for this user in this board failed',
        e: e,
      });
    }
  } else {
    res.status(400).json({
      message: 'Requires some params'
    });
  }
}

getCardsByBoardAndByUser = async (userId, boardId) => {
  try {
    return await Card.find({
      $and: [
        { board: boardId },
        { worker: userId }
      ]
    }).populate({
      path: 'comment',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      }
    }).populate({
      path: 'worker',
      model: 'User',
      select: ' -password'
    }).populate({
      path: 'label',
      model: 'Label'
    }).populate({
      path: 'list',
      model: 'Board.list'
    });
  } catch (e) {
    console.log(e);
  }
}

getCardsByBoard = async (boardId) => {
  try {
    return await Card.find({
      'boardId': boardId
    }).populate({
      path: 'comment',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      }
    }).populate({
      path: 'worker',
      model: 'User',
      select: ' -password'
    }).populate({
      path: 'label',
      model: 'Label'
    }).populate({
      path: 'list',
      model: 'Board.list'
    });
  } catch (e) {
    console.log(e);
  }
}

exports.getById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate({
      path: 'comment',
      populate: {
        path: 'user',
        model: 'User',
        select: ' -password'
      }
    }).populate({
      path: 'worker',
      model: 'User',
      select: ' -password'
    }).populate({
      path: 'label',
      model: 'Label'
    }).populate({
      path: 'list',
      model: 'Board.list'
    });
    res.status(200).json(card);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Fetching card failed',
      e: e,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const result = await Card.findOneAndDelete({
      _id: req.params.id
    }).then(() => {
      res.status(200).json({
        message: 'deletion succeed',
      });
    });
  } catch (e) {
    res.status(401).json({
      message: 'deletion failed',
      e: e,
    });
  }
};