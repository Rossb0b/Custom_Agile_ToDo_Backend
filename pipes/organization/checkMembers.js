const User = require('../../models/user');
const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (members, userData, role) => {
    try {
        let newArr = [];

        // Add admin by default
        if (userData != undefined) {
            const resRoleId = (await Prerogative.find({name: 'ADMIN'}));
            if (resRoleId.length < 1 || resRoleId.length > 1) return [];
            newArr.push({
                userId: userData.userId,
                roleId: resRoleId._id,
                hasCustomRole: false
            });
        } else {
            return [];
        }

        // Check members list
        for (let i = 0; i < members.length; i++) {
            const resUser = await User.findById(members[i].userId);
            let resRole;
            if (!members[i].hasCustomRole) {
                resRole = await Prerogative.findById(members[i].roleId);
            } else {
                resRole = role.filter(x => x._id === members[i].roleId)[0];
            }

            // if both responses are valid
            if (resUser !== null) {
                if(typeof resRole === Array) {
                    if (resRole.length === 1) newArr.push(members[i]);
                } else if (resRole !== null)  newArr.push(members[i]);
            }
        }
        return newArr;
    } catch (error) {
        // console.log(error);
        return [];
    }
}