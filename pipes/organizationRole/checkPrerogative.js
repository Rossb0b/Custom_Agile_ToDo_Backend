const OrgaPrerogative = require('../../models/organizationPrerogative');

module.exports = async (id) => {
    try {
        const res = await OrgaPrerogative.findById(id);
        if (res === null) return false; // à vérifier
        return true;
    } catch (error) {
        return false;
    }
};