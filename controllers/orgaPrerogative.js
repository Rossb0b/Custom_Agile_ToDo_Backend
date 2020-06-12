const OrgaPrerogative = require('../models/organizationPrerogative');

/**
 * Async method to create organization prerogative.
 * 
 * @return { json{ message<string>, prerogative<organizationPrerogative> }}
 */
exports.createPrerogative = async (req, res, next) => {
    const prerogative = new OrgaPrerogative(req.body.prerogative);

    try {
        prerogative.validate(async (error) => {
            if (error) {
                // console.log(error);
                return res.status(500).json({
                    message: 'Not valid prerogative'
                });
            } else {
                try {
                    const createdPrerogative = await prerogative.save();
                    // console.log(createdPrerogative);
                    return res.status(201).json({
                        message: 'Prerogative created',
                        prerogative: createdPrerogative
                    });
                } catch (error) {
                    // console.log(error);
                    return res.status(500).json({
                        message: 'Unknown error'
                    });
                }
            }
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: 'Unknown error'
        });
    }
};