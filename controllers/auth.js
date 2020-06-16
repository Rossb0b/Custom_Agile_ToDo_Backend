const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Organization = require('../models/organization');
const Board = require('../models/board');

/**
 * Async method to connect a User
 * First check that the user exist
 * Uncrypt and compare the password
 * Create a new token with user data, the JWT key, and the delay before his connexion expires
 *
 * @returns {json{message<string> || message<string>, token, expiresIn<number>, userId<string>}}
 */
exports.userLogin = async (req, res, next) => {

  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if(!user) {
      return res.status(401).json({
          message: 'Auth failed'
      });
    }

    const result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      return res.status(401).json({
          message: 'Auth failed'
      });
    }

    const {password, ...formatedUser} = user._doc;
    for(let i = 0; i < formatedUser.organization.length; i++) {
      const result = (await Organization.findById(formatedUser.organization[i]));
      const boards = (await Board.find({organizationId: result._id})).filter(x => x.member.includes(user._id));
      
      formatedUser.organization[i] = {
        _id: result._id,
        name: result.name,
        memberCount: result.memberCount,
        lastActivity: await Board.findById(result.lastActivity, 'name'),
        activeProjectsCount: boards.length
      };
    }

    const token = jwtSign({ email: formatedUser.email, userId: formatedUser._id });

    return res.status(200).json({
      token: token,
      expiresIn: 3600,
      user: formatedUser
    });
  } catch (e) {
    // console.log(e);
    res.status(401).json({
      message: 'Unknown error', e: e
    });
  }
};

/**
 * Create a new token of connexion for the identified user
 */
jwtSign = ({ email, userId }) => {
    return jwt.sign(
      { email: email, userId: userId },
      "rS)Td:>08Z}E?>6_x(}sX|DpdJms/Wf6Aw#lI0$^gH`$p,*h#p:vjjfSq,pDd]h",
      { expiresIn: '1h' },
    );
  };

