const Organization = require('../models/organization');

const checkMembers = require('../pipes/organization/checkMembers');
const checkMethodology = require('../pipes/organization/checkMethodology');
const checkBoard = require('../pipes/organization/checkBoards');
const findMembers = require('../pipes/organization/findMembers');
const findRoles = require('../pipes/organization/findRoles');
const findBoards = require('../pipes/organization/findBoards');
const findMethodologies = require('../pipes/organization/findMethodology');

/**
* Async method to create Organization
*
@returns {json{ message<string>, organization<Organization>}}
*
*/
exports.createOrganization = async (req, res, next) => {
    const organization = new Organization(req.body);
    let hasError = []; 
    try {
        organization.member = await checkMembers(organization.member, req.userData, organization.role);
        organization.methodology = await checkMethodology(organization.methodology);
        organization.board = await checkBoard(organization.board);
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Unexpected error',
            error: error
        });
    }
    if (organization.member.length === 0) hasError.push('Organization need one member at least.');
    if(hasError.length > 0) {
        return res.status(400).json({
            message: hasError.join(' ')
        });
    }

    organization.validate(async (error) => {
        if (error) {
            // console.log(error.errors);
            return res.status(500).json({
                message: 'Model error',
                error: error.errors
            });
        } 
        
        let createdOrga;
        try {
            createdOrga = await organization.save();
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                message: 'Organization creation failed',
                error: error,
            });
        }

        res.status(201).json({
            message: 'Orga found',
            orgaizationId: createdOrga._id
        });
    });
};

exports.getById = async (req, res, next) => {
    let result;
    try {
        result = (await Organization.findById(req.params.id))._doc;
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error',
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
        // console.log(error);
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

    res.status(200).json({
        message: 'Organization fetched with success',
        organization: result
    });
};

exports.getAll = async (req, res, next) => {
    let resultOrga;
    try {
        resultOrga = await Organization.find({
            'member.userId': req.userData.userId
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Unexpected error',
            error: error
        });
    }
    
    if (resultOrga === []) {
        return res.status(404).json({
            message: 'No organization found.'
        });
    }

    let formatedData = [];

    for(let i = 0; i < resultOrga.length; i++) {
        let resRole, resMember, resMetho, resBoard;
        try {
            resRole = await findRoles(resultOrga[i].role);
            resMember = await findMembers(resultOrga[i].member, resRole);
            resMetho = await findMethodologies(resultOrga[i].methodology);
            resBoard = await findBoards(resultOrga[i].board);
        } catch (error) {
            // console.log(error);
            return res.status(500).json({
                message: 'Unexpected error',
                error: error
            });
        }
        formatedData.push({
            _id: resultOrga[i]._id,
            name: resultOrga[i].name,
            role: resRole,
            member: resMember,
            board: resBoard,
            methodology: resMetho,
            lastActivity: resultOrga[i].lastActivity,
            countBoard: resBoard.length,
            countMember: resMember.length,
            countRole: resRole.length
        });
    }

    res.status(200).json({
        message: 'Fetched successfully',
        organizations: formatedData
    });
};

exports.checkOrganizationName = async (req, res) => {
    try {
        const result = await Organization.find({ name: req.body.name });

        if (result.length < 1) {
            res.status(200).json({});
        } else {
            res.status(409).json({});
        }
    } catch (e) {
        res.status(500).json({
            messsage: 'Unknow error',
            e: e,
        });
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
