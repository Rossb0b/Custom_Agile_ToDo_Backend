const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (roles) => {
    if (roles.length === 0 ) return [];

    let formatedData = [];

    // try {
    //     for (let i = 0; i < roles.length; i++) {
    //         const result = await Prerogative.find({
    //             '_id': { $in: roles[i].prerogativeId}
    //         });
    //         formatedData.push({
    //             _id: roles[i]._id,
    //             name: roles[i].name,
    //             prerogative: result
    //         });
    //     }
    // } catch (error) {
    //     // console.log(error);
    //     return false;
    // }
    //
    // OU
    //
    for (let i = 0; i < roles.length; i++) {
        let result;
        try {
            result = await Prerogative.find({
                '_id': { $in: roles[i].prerogativeId}
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