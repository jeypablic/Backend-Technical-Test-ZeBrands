const TrackingModel = require('./../models/trackingModel');

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
        res.send({menssage : 'Registro guardado correctamente'});
    });
}
