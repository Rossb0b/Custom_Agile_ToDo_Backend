const Methodology = require('../../models/user');

module.exports = async (metho) => {
    try {
        let newArr = [];
        for (let i = 0; i < metho.length; i++) {
            const resMetho = await Methodology.findById(metho[i]._id);
            // if response is valid
            if(resMetho !== null) {
                newArr.push(metho[i]);
            }
        }
        return newArr;
    } catch (error) {
        // console.log('METHODOLOGY: ', error);
        return [];
    }
}