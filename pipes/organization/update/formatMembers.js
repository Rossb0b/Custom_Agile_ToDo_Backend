module.exports = (members) => {
    return members.map(member => {
        return {
            _id: member.user._id,
            userId: member.user._id,
            roleId: member.role._id,
            hasCustomRole: member.role.hasCustomRole
        };
    });
}