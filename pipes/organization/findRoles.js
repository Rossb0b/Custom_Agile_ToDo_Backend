const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (roles) => {
    try {        
        let formatedData = [];
        if (roles.length > 0) {
            for (let i = 0; i < roles.length; i++) {
                let arrPrero= []
                for(let y = 0; y < roles[i].prerogativeId.length; i++) {
                    const result = await Prerogative.findById(roles[i].prerogativeId[y]);
                    if (result !== null) {
                        arrPrero.push({
                            description: result._doc.description,
                            index: result._doc.index
                        });
                    }
                }
                formatedData.push({
                    _id: roles[i]._id,
                    name: roles[i].name,
                    prerogative: arrPrero
                });
            }
        }
        return formatedData;
    } catch (error) {
        // console.log('error findRole: ', error);
        return false;
    }
};