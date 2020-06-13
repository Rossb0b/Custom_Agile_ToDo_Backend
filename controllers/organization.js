const Organization = require('../models/organization');

const checkMembers = require('../pipes/organization/checkMembers');
const checkMethodology = require('../pipes/organization/checkMethodology');
const checkBoard = require('../pipes/organization/checkBoards');
const findMembers = require('../pipes/organization/findMembers');
const findRoles = require('../pipes/organization/findRoles');
const findBoards = require('../pipes/organization/findBoards');


/**
* Async method to create Organization
*
@returns {json{ message<string>, organization<Organization>}}
*
*/
exports.createOrganization = async (req, res, next) => {
    const organization = new Organization(req.body);
    try {
        let hasError = [];

        organization.member = await checkMembers(organization.member, req.userData, organization.role);
        organization.methodology = await checkMethodology(organization.methodology);
        organization.board = await checkBoard(organization.board);

        if (organization.member.length === 0) hasError.push('Organization need one member at least.');

        if(hasError.length > 0) throw hasError;
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: error.join(' ')
        });
    }

    organization.validate(async (error) => {
        if (error) {
            // console.log(error.errors);
            return res.status(500).json({
                message: 'Unknown error',
                error: error.errors
            });
        } else {
            try {
                const createdOrga = await organization.save();
                // console.log(createdOrga);
                return res.status(201).json({
                    message: 'Organization created',
                    organizationId: createdOrga._id
                });
            } catch (error) {
                // console.log(error);
                return res.status(500).json({
                    message: 'Organization creation failed',
                    error: error,
                });
            }
        }
    });
};

exports.getById = async (req, res, next) => {
    try {
        let result = (await Organization.findById(req.params.id))._doc;
        if (result === null) {
            return res.status(404).json({
                message: 'Organization not found'
            });
        } else {
            // // Return members
            result.role = await findRoles(result.role);
            result.member = await findMembers(result.member, result.role);
            result.board = await findBoards(result.board);
            
            return res.status(200).json({
                message: 'Organization fetched with success',
                organization: result
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Unexpected error',
            error: error
        });
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const result = await Organization.find({
            member: {
                userId: {
                    "$in": [req.userData.userId]
                }
            }
        });

        if (result=== []) {
            return res.status(404).json({
                message: 'No organization found.'
            })
        } else {
            for(let i = 0; i < result.length; i++) {
                result.role[i] = await findRoles(result.role);
                result.member[i] = await findMembers(result.member, result.role);
            }
            return res.status(200).json({
                message: 'Organization fetched successfully.',
                organizations: result
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error',
            error: error
        });
    }
};
