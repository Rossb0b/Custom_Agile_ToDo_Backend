const OrgaPrerogative = require('../models/organizationPrerogative');

/**
 * Async method to create organization prerogative.
 * 
 * @return { json{ message<string>, prerogative<organizationPrerogative> }}
 */
exports.createPrerogative = async (req, res, next) => {

  let prerogative = new OrgaPrerogative(req.body.prerogative);

  prerogative.validate(async (error) => {
    if (error) {
      return res.status(500).json({
        message: 'Not valid prerogative'
      });
    }

    let createdPrerogative;

    try {
      createdPrerogative = await prerogative.save();
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to save the prerogative'
      });
    }
    
    return res.status(201).json(createdPrerogative);
  });
};