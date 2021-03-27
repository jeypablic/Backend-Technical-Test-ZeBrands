const UserModel = require('./../models/userModel');

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
exports.crear = async (req, res) => {
    const model = req.body;
    
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    try{
        let user = await UserModel.findOne({rut : model.rut}).exec();
        if(!user){
            user = new UserModel(model);
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        }else {
            res.status(500).send('Usuario ya se encuentra registrado.');
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
 exports.editar = async (req, res) => {

    const model = req.body;
    
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    try{
        delete model.rut;
        const user = await UserModel.findOneAndUpdate({rut : req.params.rut}, model, {
            new: true
        });
        res.send({message : 'Usuario editado correctamente'});
    }catch(e){
        console.log(e);
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
 exports.eliminar = (req, res) => {
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    try{
        UserModel.findOneAndRemove({rut : req.params.rut})
            .then(usr => res.send(usr.rut + ' Eliminado correctamente'))
            .catch(err => res.json(err));
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
    
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    let filtro = {};
    
    filtro[req.params.atr] = 'perfil' === req.params.atr ? parseInt(req.params.valor) : req.params.valor;
    
    try{
        const docs = await UserModel.findOne(filtro).exec();
        if(docs){
            res.send(docs);
        }else {
            res.status(500).send({
                message: 'Usuario no encontrado.'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @api {post} /login Inicio de sesión en el sistema
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
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
    console.log('login');
    try {
        const { email, password } = req.body
        const user = await UserModel.findByCredentials(email, password)
        if (!user) {
           return res.status(401).send({error: 'Error Login!! Verifica tus credenciales'});
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
     } catch (error) {
        res.status(400).send(error)
     }
}

/**
 * @api {post} /logout Cierre de sesion
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
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
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}

/**
 * @api {post} /logout-all Cierre de todas las sesiones
 * @apiVersion 0.0.1
 * @apiName Usuario
 * @apiGroup Usuario
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
 *      "message" : "Todas las sesiones fueron eliminadas"
 *   } 
 * 
 **/
exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send({message : 'Todas las sesiones fueron eliminadas'})
     } catch (error) {
        res.status(500).send(error)
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
        const usuarios = await UserModel.find({}).exec();
        res.send(usuarios);
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}
