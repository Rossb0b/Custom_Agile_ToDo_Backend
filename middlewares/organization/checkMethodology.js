const Methodology = require('../../models/user');

module.exports = (req, res, next) => {
    try {
        const metho = req.body.organization.methodology;
        let newArr = [];
        for (let i = 0; i < metho.length; i++) {
            const resMetho = await Methodology.findById(metho[i].methodologyId);
            // if response is valid
            if(resMetho) {
                newArr.push(metho[i]);
            }
        }
        req.body.organization.methodology = newArr;
        next();
    } catch (error) {
        return res.status(500).json({
            message: 'Unexpected error occured'
        });
    }
}