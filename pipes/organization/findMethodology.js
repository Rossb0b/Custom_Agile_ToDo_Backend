const Methodology = require('../../models/methodology');

module.exports = async (methodologyIds) => {
    try {
        let formatedData =  [];
        if (methodologyIds.length > 0) {
            for (let i = 0; i < methodologyIds.length; i++) {
                const result = await Methodology.findById(methodologyIds[i]);
                if (result !== null) {
                    formatedData.push(result);
                }
            }
        }
        return formatedData;
    } catch (error) {
        // console.log('error findMethodology: ', error);
        return false;
    }
};
