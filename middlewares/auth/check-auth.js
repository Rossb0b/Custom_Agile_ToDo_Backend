const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, "rS)Td:>08Z}E?>6_x(}sX|DpdJms/Wf6Aw#lI0$^gH`$p,*h#p:vjjfSq,pDd]h");
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({message: 'You are not authenticated'});
    }
};