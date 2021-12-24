const bcrypt = require('bcrypt');
const User  = require('../models/user');

const checkInformation =async (req, res, next) => {
    const user =await User.findOne({email: req.body.email});
    if(!user){
        const error = new Error ('error not found');
        error.statusCode = 404;
        return next(error)
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        const error = new Error ('error not found');
        error.statusCode = 401;
        return next(error);
    }
    req.user = user
    next();
}

module.exports = checkInformation;