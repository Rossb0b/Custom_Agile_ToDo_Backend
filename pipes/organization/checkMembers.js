const User = require('../../models/user');
const Role = require('../../models/organizationRole');

module.exports = async (organization, userData) => {
    try {
        let newArr = [];

        // Add admin by default
        if (userData != undefined) {
            newArr.push({
                userId: reqOwner.userId,
                roleId: (await Role.find({name: 'ADMIN'}))._id
            });
        } else {
            return [];
        }

        // Check members list
        for (let i = 0; i < organization.length; i++) {
            const resUser = await User.findById(organization[i].userId);
            const resRole = await Role.findById(organization[i].roleId);

            // if both responses are valid
            if(resUser && resRole) {
                newArr.push(organization[i]);
            }
        }

        return newArr;
    } catch (error) {
        // console.log(error);
        return [];
    }
}