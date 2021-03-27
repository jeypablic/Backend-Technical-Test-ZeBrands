const jwt = require('jsonwebtoken')
const UserModel = require('./../models/userModel');
/**
 * Metodo que se encarga de la autenticación del usuario en el sistema
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
            res.status(401).send({ error: 'No tiene autorización para esta consulta' })
        }
    }else{
        res.status(401).send({message: 'Debe iniciar Sesión'});
    }
}
module.exports = auth;