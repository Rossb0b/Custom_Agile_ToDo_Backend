const bcrypt = require('bcryptjs');
const User = require('../models/user');

/**
 * Async method to create a new User
 * Init the user send by the request
 * Define the default logo for the user
 *
 * @returns {json{message<string>, result<User> if success}}
 */
exports.createUser = async (req, res, next) => {

  const user = new User(req.body);

  try {
    user.password = await hashPassword(req.body.password);
    const result = await user.save();
    const {_id, password, ...formatedUser} = result._doc;
    req.body = formatedUser;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Creation failed',
    });
  }
};

/**
 * Encrypt the password
 */
hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.getUserFromJWT = async (req, res) => {

  try {
    const user = await User.findById(req.userData.userId);
    const {password, ...formatedUser} = user._doc;
    res.status(200).json(formatedUser);
  } catch (e) {
    res.status(401).json({
      message: 'Fetching user failed', e: e,
    });
  }

};

/**
 * Async method that find the user.id for the given user.email
 *
 * @returns {json{user.id<id>}}
 */
exports.getUserId = async (userEmail) => {
  try {
    const user = await User.findOne({
      email: userEmail
    });

    return user.id;
  } catch (e) {
    console.log(e);
  }
}
