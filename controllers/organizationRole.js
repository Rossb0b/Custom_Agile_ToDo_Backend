const OrganizationRole = require('../models/organizationRole');
const checkPrerogativeId = require('../pipes/organizationRole/checkPrerogative');

/**
 * Async method to create organization role.
 * 
 * @return { json{ message<string>, role<OrganizationRole> }}
 */
exports.createRole = async (req, res, next) => {

  const role = new OrganizationRole(req.body.role);
  let prerogativeExists;

  try {
    prerogativeExists = await checkPrerogativeId(role.prerogativeId);
    if (!prerogativeExists) throw 'Prerogative not found';
  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }

  role.validate(async (error) => {
    if (error) {
      return res.status(500).json({
        message: 'Not valid role'
      });
    } 

    let createdRole;
    
    try {
      createdRole = await role.save();
    } catch (error) {
      // console.log(error);
      return res.status(500).json({
        message: 'Failed to save the role'
      });
    }
    
    res.status(201).json(createdRole);
  });
};