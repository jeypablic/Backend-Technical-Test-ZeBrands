const UserModel = require('../models/user');

/**
 * @apiDefine Login Login
 *
 * API necesaria para gestionar login en la aplicación.
 */

/**
 * @api {post} /login Inicio de sesión en el sistema
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Login
 * @apiPermission none
 *
 * @apiDescription Se encarga de iniciar la sesión del usuario en el sistema
 * 
 * @apiParamExample {json} Request-Example:
 *   {
 *      "email" : "test@test.cl",
 *      "password": "test1234"
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "user": {
 *          "_id": "605eae55146c98003337153a",
 *          "rut": "18-0",
 *          "nombre": "Administrador",
 *          "aPaterno": "Zbrands",
 *          "aMaterno": "luuna",
 *          "perfil": 1,
 *          "email": "juanpablo.rodriguezyanez@gmail.com",
 *          "password": "$2a$08$DT2QK6OGoedYE/aXpAziu.I6R3xzZJRRnBs00zOz1ZNk2.IUCgmNm",
 *          "tokens": [{
 *               "_id": "605eae55146c98003337153b",
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MTc3NDl9.hYkhLG5N3DQAwU6dlx0XvFR7IjAYSRwauiJ3htI2Tdg"
 *           }, {
 *               "_id": "605ebe21256cc200349112f9",
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MjE3OTN9.7KNQTb4V0DKd-kS5e9w2LveNU1UCUZo1pv8uG6zEuUw"
 *           }],
 *           "__v": 2
 *         },
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MjE3OTN9.7KNQTb4V0DKd-kS5e9w2LveNU1UCUZo1pv8uG6zEuUw"
 * 
 **/
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findByCredentials(email, password)
        if (!user) {
           return res.status(401).json({error: 'Login failed!! Verify your credentials'});
        }
        const token = await user.generateAuthToken()
        res.json({ user, token });
     } catch (error) {
        res.status(400).json(error);
     }
}

/**
 * @api {post} /logout Cierre de sesion
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Login
 * @apiPermission none
 *
 * @apiDescription Se encarga de cerrar de la sesion del Usuario
 * 
 **/
exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.json();
    } catch (error) {
        res.status(500).json(error)
    }
}

/**
 * @api {post} /logout-all Cierre de todas las sesiones
 * @apiVersion 0.0.1
 * @apiName Login
 * @apiGroup Login
 * @apiPermission none
 *
 * @apiDescription Se encarga de cerrar todas las sesiones iniciadas
 * 
 * @apiParamExample {json} Request-Example:
 *   {
 *      "email" : "test@test.cl",
 *      "password": "test1234"
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "All sessions was deleted"
 *   } 
 * 
 **/
exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save();
        res.json({message : 'All sessions was deleted'})
    } catch (error) {
        res.status(500).json(error);
    }
}