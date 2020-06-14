const Card = require('../models/card');

exports.createBoard = async (req, res) => {

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
          res.status(201).json(createdCard._id);
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
          console.log(result);
          // res.status(200).json({
          //     message: 'Updated the card with success',
          //     board: {
          //         ...
          //     }
          // })
        } else {
          console.log(result);
          // res.status(401).json({
          //     message: 'Updating the card failed',
          //     e : ?
          // });
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
    
}

getCardsByBoardAndByUser = async (userId, boardId) => {
    try {
        return await Card.find({
        $and: [
            { boardId: boardId },
            { worker: userId }
        ]
        });
    } catch (e) {
        console.log(e);
    }
}

exports.getById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
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