const Notification = require('../models/notification');
const User = require('../models/user');

/**
 * Async method to create a new Notification
 * Init the Notification send
 * Ensure that the notification is valid
 *
 * @returns
 */
exports.createNotification = async (notification) => {

  const newNotification = new Notification(notification);

  /** checking that we got a valid notification */
  newNotification.validate(async (error) => {

    if (error) {
      res.status(500).json({
        message: 'not valid notification',
      });
    } else {
      try {
        createdNotification = await newNotification.save();
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }

  });
};

/**
 * Async method to get the notifications for this Article
 *
 * @returns {json{message<string>, notifications<Notification[]> if success}}
 */
exports.getNotificationsForThisUser = async (req, res, next) => {

  try {
    const notifications = await Notification.find({
      userId: req.query.userId,
    });

    res.status(200).json({
      message: 'Fetched notifications successfully',
      notifications: notifications,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Fetching notifications failed',
    });
  }
};

/**
 * Async method to delete a Notification
 * 
 * @returns
 */
exports.deleteNotification = async (notificationId) => {
    try {
        const result = await Notification.deleteOne({
            _id: notificatioNId,
          });
      
          if(result.n > 0) {
            return true;
          } else {
            return false;
          }
    } catch (e) {
        console.log(e);
    }
}
