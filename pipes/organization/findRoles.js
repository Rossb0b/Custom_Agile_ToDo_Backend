const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (roles) => {
    if (roles.length === 0 ) return [];

    let formatedData = [];
    for (let i = 0; i < roles.length; i++) {
        let result;
        try {
            result = await Prerogative.find({
                '_id': roles[i].prerogativeId
            });
        } catch (error) {
            // console.log(error);
            return false;
        }
        formatedData.push({
            _id: roles[i]._id,
            name: roles[i].name,
            prerogative: result
        });
    }

    return formatedData;
};
