const Organization = require('../models/organization');

const CheckMembers = require('../pipes/organization/checkMembers');
const CheckMethodology = require('../pipes/organization/checkMethodology');
const CheckBoard = require('../pipes/organization/checkBoards');

/**
* Async method to create Organization
*
@returns {json{ message<string>, organization<Organization>}}
*
*/
exports.createOrganization = async (req, res, next) => {

    try {
        let hasError = [];

        req.body.organization.member = await CheckMembers(req.body.organization.member, req.userData);
        req.body.organization.methodology = await CheckMethodology(req.body.organization.methodology);
        req.body.organization.board = await CheckBoard(req.body.organization.board);

        if (req.body.organization.member.length === 0) hasError.push('Organization need one member at least.');

        if(hasError.length > 0) throw hasError;
    } catch (error) {
        // console.log(error);
        return res.status(400).json({
            message: error.join(' ')
        });
    }

    const organization = new Organization(req.body.organization);
    organization.validate(async (error) => {
        if (error) {
            // console.log(error);
            return res.status(500).json({
                message: 'Not valid organization'
            });
        } else {
            try {
                const createdOrga = await organization.save();
                // console.log(createdOrga);
                return res.status(201).json({
                    message: 'Organization created',
                    organization: createdOrga
                });
            } catch (error) {
                // console.log(error);
                return res.status(500).json({
                    message: 'Unknown error'
                });
            }
        }
    });
};