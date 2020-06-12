const OrganizationRole = require('../models/organizationRole');
const checkPrerogativeId = require('../pipes/organizationRole/checkPrerogative');

/**
 * Async method to create organization role.
 * 
 * @return { json{ message<string>, role<OrganizationRole> }}
 */
exports.createRole = async (req, res, next) => {
    const role = new OrganizationRole(req.body.role);

    try {
        const prerogativeExists = await checkPrerogativeId(role.prerogativeId);
        if (!prerogativeExists) throw 'Prerogative not found';
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }

    role.validate(async (error) => {
        if (error) {
            // console.log(error);
            return res.status(500).json({
                message: 'Not valid role'
            });
        } else {
            try {
                const createdRole = await role.save();
                console.log(createdRole);
                return res.status(201).json({
                    message: 'Role created',
                    role: createdRole
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