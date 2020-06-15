const User = require('../../models/user');
const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (members, roles) => {
    let formatedData = [];
    for (let i = 0; i < members.length; i++) {
        // Search user
        let resUser;
        try {
            resUser = await User.findById(members[i].userId);
        } catch (error) {
            // console.log(error);
            return false;
        }
        if (resUser === null) return false;

        const {password, organization, ...formatedUser} = resUser._doc;
        
        // Search role
        let role;
        if (members[i].hasCustomRole) {
            role = (roles.filter(x => x._id === members[i].roleId))[0];
            role = { ...role, hasCustomRole: true };
            
        } else {
            let resRole;
            try {
                resRole = (await Prerogative.findById(members[i].roleId))._doc;
            } catch (error) {
                return false;
            }
            if (resRole === null) return false;
            role = { ...resRole, hasCustomRole: false };
        }

        formatedData.push({
            user: formatedUser,
            role: role
        });
    }
    
    return formatedData;
};