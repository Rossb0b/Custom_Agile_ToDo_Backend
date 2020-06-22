const Organization = require('../models/organization');

const checkMembers = require('../pipes/organization/checkMembers');
const checkMethodology = require('../pipes/organization/checkMethodology');
const checkBoard = require('../pipes/organization/checkBoards');
const findMembers = require('../pipes/organization/findMembers');
const findRoles = require('../pipes/organization/findRoles');
const findBoards = require('../pipes/organization/findBoards');
const findMethodologies = require('../pipes/organization/findMethodology');
const formatMembers = require('../pipes/organization/update/formatMembers');

/**
* Async method to create Organization
*
@returns {json{ message<string>, organization<Organization>}}
*
*/
exports.createOrganization = async (req, res, next) => {

  let organization = new Organization(req.body);
  let hasError = [];

  try {
    organization.member = await checkMembers(organization.member, req.userData, organization.role);
    organization.methodology = await checkMethodology(organization.methodology);
    organization.board = await checkBoard(organization.board);
  } catch (error) {
    return res.status(500).json({
      message: 'Unexpected error',
      error: error
    });
  }

  if (organization.member.length === 0) hasError.push('Organization need one member at least.');

  if (hasError.length > 0) {
    return res.status(400).json({
      message: hasError.join(' ')
    });
  }

  organization.validate(async (error) => {
    if (error) {
      return res.status(500).json({
        message: 'Model error',
        error: error.errors
      });
    }

    let createdOrga;

    try {
      createdOrga = await organization.save();
    } catch (error) {
      return res.status(500).json({
        message: 'Organization creation failed',
        error: error,
      });
    }

    res.status(201).json(createdOrga._id);
  });
};

exports.getById = async (req, res, next) => {

  let result;

  try {
    result = (await Organization.findById(req.params.id))._doc;
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot find the organization',
      error: error
    });
  }

  if (result === null) {
    return res.status(404).json({
      message: 'Organization not found'
    });
  }

  // Return members
  try {
    result.role = await findRoles(result.role);
    result.member = await findMembers(result.member, result.role);
    result.board = await findBoards(result.board);
    result.methodology = await findMethodologies(result.methodology);
  } catch (error) {
    return res.status(500).json({
      message: 'Unexpected error',
      error: error
    });
  }

  result = {
    ...result,
    countBoard: result.board.length,
    countMember: result.member.length,
    countRole: result.role.length
  };

  res.status(200).json(result);
};

exports.getAll = async (req, res, next) => {

  let result;

  try {
    result = await Organization.find({
      'member.userId': req.userData.userId
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot find the organization',
      error: error
    });
  }

  if (result === []) {
    return res.status(404).json({
      message: 'No organization found.'
    });
  }

  for (let i = 0; i < result.length; i++) {

    result[i] = result[i]._doc;

    try {
      result[i].role = await findRoles(result[i].role);
      result[i].member = await findMembers(result[i].member, result[i].role);
      result[i].methodology = await findMethodologies(result[i].methodology);
      result[i].board = await findBoards(result[i].board);
    } catch (error) {
      return res.status(500).json({
        message: 'Unexpected error',
        error: error
      });
    }

    result[i] = {
      ...result[i],
      countBoard: result[i].board.length,
      countMember: result[i].member.length,
      countRole: result[i].role.length
    };
  }

  res.status(200).json(result);
};

exports.updateOrganization = async (req, res) => {

  let result;
  req.body.member = formatMembers(req.body.member);

  try {
    result = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: 'Cannot update the organization',
      error: error.errors
    });
  }

  result = result._doc;

  try {
    result.role = await findRoles(result.role);
    result.member = await findMembers(result.member, result.role);
    result.board = await findBoards(result.board);
    result.methodology = await findMethodologies(result.methodology);
  } catch (error) {
    return res.status(500).json({
      message: 'Unexpected error',
      error: error
    });
  }

  res.status(200).json(result);
}

exports.deleteOrganization = async (req, res) => {
  
    let result;

    try {
        result = await Organization.deleteOne({_id: req.params.id});
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error',
            error: error
        });
    }
    
    if(result.deletedCount === 0) {
        return res.status(404).json({
            message: 'Not deleted'
        });
    }

    return res.status(200).json({
        message: 'Organization deleted'
    });

}

exports.checkOrganizationName = async (req, res) => {

  let result;

  try {
    result = await Organization.find({ name: req.body.name });
  } catch (e) {
    res.status(500).json({
      messsage: 'Cannot check the organization\'s name',
      e: e,
    });
  }

  if (result.length < 1) {
    res.status(200).json({});
  } else {
    res.status(409).json({});
  }
}

// Apply pipes
// à tester
// async function findElements(roles, members, boards, methodologies) {
//     let resRole, resMembers, resBoards, resMetho;
//     if (typeof roles === Array && roles.length > 0) {
//         resRole = await findRoles(result.role);
//     }
//     if (typeof members === Array && members.length > 0) {
//         resMembers = await findMembers(members, resRole);
//     }
//     if (typeof boards === Array && boards.length > 0) {
//         resBoards = await findBoards(boards);
//     }
//     if (typeof methodologies === Array && methodologies.length > 0) {
//         resMetho = await findMethodologies(methodologies);
//     }

//     return {
//         roles: resRole,
//         members: resMembers,
//         boards: resBoards,
//         methodologies: resMetho
//     }
// };
