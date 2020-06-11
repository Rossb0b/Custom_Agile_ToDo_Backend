const User = require('../../models/user');
const Role = require('../../models/organizationRole');

module.exports = async (req, res, next) => {
    try {
        const organization = req.body.organization.member;
        let newArr = [];

        // A admin by default
        const reqOwner = req.userData;
        if (reqOwner.userId) {
            newArr.push({
                userId: reqOwner.userId,
                roleId: (await Role.find({name: 'ADMIN'}))._id
            });
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

        // if valid members array is empty
        if (newArr.length === 0) {
            return res.status(400).json({
                message: 'Error with members'
            });
        }

        req.body.organization.member = newArr;
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error occured'
        });
    }
}