const Methodology = require('../../models/user');

module.exports = async (data) => {
    console.log('CHECK METHO');

    try {
        const metho = data;
        let newArr = [];
        for (let i = 0; i < metho.length; i++) {
            const resMetho = await Methodology.findById(metho[i].methodologyId);
            // if response is valid
            if(resMetho) {
                newArr.push(metho[i]);
            }
        }
        return newArr;
    } catch (error) {
        console.log(error);
        return false;
    }
}