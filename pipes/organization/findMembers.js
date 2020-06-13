const User = require('../../models/user');
const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (members, roles) => {
    try {
        let formatedData = [];
        for (let i = 0; i < members.length; i++) {
            // Search user
            const resUser = await User.findById(members[i].userId);
            if (resUser === null) return false;
            const {password, ...formatedUser} = resUser._doc;
            
            
            // Search role
            let role;
            if (members[i].hasCustomRole) {
                role = (roles.filter(x => x._id === members[i].roleId))[0];
                role = { role, hasCustomRole: true };
                
            } else {
                const resRole = await Prerogative.findById(members[i].roleId);
                if (resRole === null) return false;
                role = { resRole, hasCustomRole: false };
            }

            formatedData.push({
                user: formatedUser,
                role: role
            });
        }
        return formatedData;
    } catch (error) {
        // console;log('error: ', error);
        return false;
    }
};