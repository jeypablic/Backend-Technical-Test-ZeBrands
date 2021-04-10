const TrackingModel = require('../models/tracking');

/**
 * @apiDefine Tracking Tracking
 *
 * API necesaria para registrar eventos.
 */

/**
 * @api {post} /tracking Registrar un evento
 * @apiVersion 0.0.1
 * @apiName Tracking
 * @apiGroup Tracking
 * @apiPermission none
 *
 * @apiDescription Se encarga de registrar una accion ejecutada en el sistema.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "nombre" : "Consulta Producto",
 *      "codigo": 100,
 *      "sku" : 1
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Registro guardado correctamente"
 *   } 
 *
 */
 exports.tracking = (req, res) => {
    const tracking = new TrackingModel({ 
        nombre: req.body.nombre, 
        codigo:req.body.codigo, 
        sku: req.body.sku
    });

    tracking.save(function (err, item) {
        if (err) return console.error(err);
        res.send({menssage : 'Tracking successfully registered'});
    });
}

/**
 * @api {get} /findAll Lista los Registros de actividad
 * @apiVersion 0.0.1
 * @apiName Tracking
 * @apiGroup Trackings
 * @apiPermission none
 *
 * @apiDescription Se encarga de listar todos los registros de actividad
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
        const tracking = await TrackingModel.find({}).exec();
        res.send(tracking);
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}
