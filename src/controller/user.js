const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');

/**
 * @apiDefine Usuario Usuario
 *
 * API required to manage users.
 */

/**
 * @api {post} / Register a User
 * @apiPermission admin
 * @apiVersion 0.0.1
 * @apiName Users
 * @apiGroup Users 
 *
 * @apiDescription It is responsible for registering a user of the system.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "rut" : "18-0",
 *      "name" : "Administrador",
 *      "lastName" : "Zbrands",
 *      "profile" : 1,
 *      "email" : "jtest@gmail.com",
 *      "password" : "adm1234"
 *   }
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "User successfully registered"
 *   } 
 *
 */
exports.save = async (req, res) => {
    const model = req.body;
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        let user = await UserModel.findOne({rut : model.rut}).exec();
        if(!user){
            user = new UserModel(model);

            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).json({
                message : 'User successfully registered'
            });
        }else {
            res.status(500).json({message: 'User is already registered'});
        }
        
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

/**
 * @api {put} /1 Edit a User
 * @apiVersion 0.0.1
 * @apiName Users
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiDescription It is in charge of editing a system user.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "rut" : "18-0",
 *      "name" : "Administrador",
 *      "lastName" : "Zbrands",
 *      "profile" : 1,
 *      "email" : "jtest@gmail.com",
 *      "password" : "adm1234"
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "User updated successfully"
 *   } 
 *
 */
 exports.update = async (req, res) => {

    const model = req.body;
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        delete model.rut;
        model['lastUserUpdate'] = req.user.email;
        const user = await UserModel.findOneAndUpdate({rut : req.params.rut}, model, {
            new: true
        });
        if(user){
            res.json({message : 'User updated successfully'});
        }else{
            res.status(500).json({message: 'User not found'});
        }
        
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {delete} /1 Delete User
 * @apiVersion 0.0.1
 * @apiName Users
 * @apiGroup Users
 * @apiPermission admin
 *
 * @apiDescription It is responsible for removing a user from the system.
 *
 * @apiQuery {String} rut User's RUT
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "User 1-9 was successfully removed"
 *   } 
 *
 */
 exports.delete = async (req, res) => {
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    try{
        const user = await UserModel.findOneAndUpdate({rut : req.params.rut}, {
            lastUserUpdate : req.user.email, 
            deleted : true
        }, {
            new: true
        });
        if(user){
            res.json({message : `User ${user.rut} was successfully removed`});
        }else{
            res.status(500).json({message: 'User not found'});
        }
        
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {get} /nombre/Administrador Search for a user
 * @apiVersion 0.0.1
 * @apiName Users
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiDescription It is in charge of searching for a user by any indicated parameter
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "605e9d2dd0eaaa0033c68b41",
 *        "rut" : "18-0",
 *        "name" : "Administrador",
 *        "lastName" : "Zbrands",
 
 *        "profile" : 1,
 *        "email" : "jtest@gmail.com",
 *        "password" : "adm1234",
 *        "__v": 0
 *     }
 *
 */
exports.findBy = async (req, res) => {
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    let filtro = {};
    
    filtro[req.params.atr] = 'perfil' === req.params.atr ? parseInt(req.params.value) : req.params.value;
    
    try{
        const user = await UserModel.findOne(filtro).exec();
        if(user){
            res.json(user);
        }else {
            res.status(500).json({
                message: 'User not found.'
            });
        }
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {post} / List Users
 * @apiVersion 0.0.1
 * @apiName Users
 * @apiGroup Users
 * @apiPermission none
 *
 * @apiDescription It is in charge of listing all the Users
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "_id": "605e9d2dd0eaaa0033c68b41",
 *           "rut" : "18-0",
 *           "name" : "Administrador",
 *           "lastName" : "Zbrands",
 *  
 *           "profile" : 1,
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
 *           "name" : "Administrador",
 *           "lastName" : "Zbrands",
 *  
 *           "profile" : 1,
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
        res.json(users);
    }catch(e){
        res.status(500).json({message : e.message});
    }
}
