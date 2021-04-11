const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * @apiDefine Usuario Usuario
 *
 * API necesaria para gestionar los usuarios.
 */

/**
 * @api {post} /add Registrar un Usuario
 * @apiPermission admin
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario 
 *
 * @apiDescription Se encarga de registrar un usuario del sistema.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "rut" : "18-0",
 *      "nombre" : "Administrador",
 *      "aPaterno" : "Zbrands",
 *      "aMaterno" : "luuna",
 *      "perfil" : 1,
 *      "email" : "jtest@gmail.com",
 *      "password" : "adm1234"
 *   }
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Usuario registrado correctamente"
 *   } 
 *
 */
exports.save = async (req, res) => {
    const model = req.body;
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        let user = await UserModel.findOne({rut : model.rut}).exec();
        if(!user){
            user = new UserModel(model);

            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({
                message : 'User successfully registered',
                user,
                token
            });
        }else {
            res.status(500).send('User is already registered');
        }
        
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {put} /edit/1 Editar un Usuario
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
 * @apiPermission admin
 *
 * @apiDescription Se encarga de editar un usuario del sistema.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "rut" : "18-0",
 *      "nombre" : "Administrador",
 *      "aPaterno" : "Zbrands",
 *      "aMaterno" : "luuna",
 *      "perfil" : 1,
 *      "email" : "jtest@gmail.com",
 *      "password" : "adm1234"
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Usuario editado correctamente"
 *   } 
 *
 */
 exports.update = async (req, res) => {

    const model = req.body;
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        delete model.rut;
        model['lastUserUpdate'] = req.user.email;
        const user = await UserModel.findOneAndUpdate({rut : req.params.rut}, model, {
            new: true
        });
        res.send({message : 'User updated successfully'});
    }catch(e){
        res.status(500).send(e);
    }
}

/**
 * @api {delete} /delete/1 Eliminar Usuario
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
 * @apiPermission admin
 *
 * @apiDescription Se encarga de eliminar un usuario del sistema.
 *
 * @apiQuery {String} rut RUT del Usuario
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Usuario eliminado correctamente"
 *   } 
 *
 */
 exports.delete = async (req, res) => {
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    try{
        const user = await UserModel.findOneAndUpdate({rut : req.params.rut}, {
            lastUserUpdate : req.user.email, 
            deleted : true
        }, {
            new: true
        });
        res.send({message : `User ${user.rut} was successfully removed`});
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @api {get} /findBy/nombre/Administrador Busca un usuario
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
 * @apiPermission none
 *
 * @apiDescription Se encarga de buscar un usuario por algun parametro indicado
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "605e9d2dd0eaaa0033c68b41",
 *        "rut" : "18-0",
 *        "nombre" : "Administrador",
 *        "aPaterno" : "Zbrands",
 *        "aMaterno" : "luuna",
 *        "perfil" : 1,
 *        "email" : "jtest@gmail.com",
 *        "password" : "adm1234",
 *        "__v": 0
 *     }
 *
 */
exports.findBy = async (req, res) => {
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    let filtro = {};
    
    filtro[req.params.atr] = 'perfil' === req.params.atr ? parseInt(req.params.valor) : req.params.valor;
    
    try{
        const user = await UserModel.findOne(filtro).exec();
        if(user){
            res.send(user);
        }else {
            res.status(500).send({
                message: 'User not found.'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @api {post} /findAll Lista los Usuarios
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
 * @apiPermission none
 *
 * @apiDescription Se encarga de listar todos los Usuario
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "_id": "605e9d2dd0eaaa0033c68b41",
 *           "rut" : "18-0",
 *           "nombre" : "Administrador",
 *           "aPaterno" : "Zbrands",
 *           "aMaterno" : "luuna",
 *           "perfil" : 1,
 *           "email" : "jtest@gmail.com",
 *           "password": "$2a$08$tnPC5JA0rGYie8OqoWsiLuujczZKlvjH.JLbYOVsYf/43HSt8x.SC",
 *           "tokens": [{
 *               "_id": "605e6761033ee200339f3ef1",
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlNjc2MTAzM2VlMjAwMzM5ZjNlZjAiLCJpYXQiOjE2MTY3OTk1ODV9.Z6guh8_stfwPZH7eiEPjIveHyA9uEo_Z3aLcmZsnlnU"
*            }],
 *           "__v": 0
 *       }, {
 *           "_id": "605e89e500c6cc003359fcf0",
 *           "rut" : "15-0",
 *           "nombre" : "Administrador",
 *           "aPaterno" : "Zbrands",
 *           "aMaterno" : "luuna",
 *           "perfil" : 1,
 *           "email" : "anonym@test.cl",
 *           "password": "$2a$08$rFIXdn3s1M9A5IiMmh7FHeqPR1Gpo150E6Rui3hMI0Yk3KlQ7imCq",
 *           "tokens": [{
 *               "_id": "605e89e500c6cc003359fcf1",
 *               "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlODllNTAwYzZjYzAwMzM1OWZjZjAiLCJpYXQiOjE2MTY4MDg0MjF9.6StI8XugSxzChTejYu_8P6YvPczO9_Ya3srK107lYKQ"
*            }],
 *      }]
 *
 */
exports.findAll = async (req, res) => {
    try{
        const users = await UserModel.find({}).exec();
        res.send(users);
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}
