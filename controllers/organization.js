const Organization = require('../models/organization');

/**
* Async method to create Organization
*
@returns {json{ message<string>, organization<Organization>}}
*
*/
exports.createOrganization = async (data) => {

    const organization = new Organization(data);

    organization.validate(async (error) => {
        if (error) {
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