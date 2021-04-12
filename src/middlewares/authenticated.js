const jwt = require('jsonwebtoken')
const UserModel = require('../models/user');
/**
 * Method that is responsible for user authentication in the system
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const auth = async(req, res, next) => {
    if(req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, process.env.JWT_KEY);
        try {
            const user = await UserModel.findOne({ _id: data._id, 'tokens.token': token });
            if (!user) {
                throw new Error();
            }
            req.user = user;
            req.token = token;
            next()
        } catch (error) {
            res.status(401).json({ message: 'You are not authorized to execute the action' })
        }
    }else{
        res.status(401).json({message: 'You must log in'});
    }
}
module.exports = auth;