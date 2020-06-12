const User = require('../../models/user');
const Prerogative = require('../../models/organizationPrerogative');

module.exports = async (members, userData, role) => {
    try {
        let newArr = [];

        // Add admin by default
        if (userData != undefined) {
            newArr.push({
                userId: reqOwner.userId,
                roleId: (await Prerogative.find({name: 'ADMIN'}))._id
            });
        } else {
            return [];
        }

        // Check members list
        for (let i = 0; i < members.length; i++) {
            const resUser = await User.findById(members[i].userId);
            let resRole;
            if (!members[i].hasCustomRole) {
                // console.log('Has not custom role');
                resRole = await Prerogative.findById(members[i].roleId);
            } else {
                // console.log('Has custom role');
                resRole = role.filter(x => x._id === members[i].roleId)[0];
            }
            // console.log(resUser, resRole);

            // if both responses are valid
            if (resUser !== null) {
                if(typeof resRole === Array) {
                    if (resRole.length === 1) newArr.push(members[i]);
                } else if (resRole !== null)  newArr.push(members[i]);
            } else {
                console.log('ISSUE RES ROLE');
                console.log(resUser, resRole);
            }
        }
        // console.log(newArr);
        return newArr;
    } catch (error) {
        // console.log(error);
        return [];
    }
}