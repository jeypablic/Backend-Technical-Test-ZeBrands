const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');
const TrackingModel = require('../models/trackingModel');

//const Notificacion = require('../utils/notification');

/**
 * @apiDefine Producto Producto
 *
 * API necesaria para gestionar los productos.
 */

/**
 * @api {post} /add Registrar un Producto
 * @apiPermission admin
 * @apiVersion 0.0.1
 * @apiName Producto
 * @apiGroup Producto 
 *
 * @apiDescription Se encarga de registrar un producto del sistema.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "sku" : "1",
 *      "name": "uno",
 *      "brand" : "marca uno",
 *      "price" : 1000
 *   }
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Producto registrado correctamente"
 *   } 
 *
 */
exports.save = async (req, res) => {

    const model = req.body;
    
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    try{
        //const docs = await ProductModel.exists({sku : model.sku});

        if(!await ProductModel.exists({sku : model.sku})){
            const product = new ProductModel(model);
            product.save().then(data => {
                res.send({
                    message : 'Producto registrado correctamente'
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Error al intentar guardar el producto'
                });
            });
        }else {
            res.send({
                message : 'Producto ya se encuentra registrado'
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {put} /edit/1 Editar un Producto
 * @apiVersion 0.0.1
 * @apiName Producto
 * @apiGroup Producto
 * @apiPermission admin
 *
 * @apiDescription Se encarga de editar un producto del sistema.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *      "sku" : "1",
 *      "nombre": "uno",
 *      "marca" : "marca uno",
 *      "precio" : 1000
 *   }
 * 
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Producto editado correctamente"
 *   } 
 *
 */
 exports.update = async (req, res) => {

    const model = req.body;

    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    try{
        delete model.sku;
        model['lastUserUpdate'] = req.user.email;
        await ProductModel.findOneAndUpdate({sku : req.params.sku}, model, {
            new: true
        });
        res.send({message : 'Producto editado correctamente'});
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {delete} /delete/1 Eliminar Producto
 * @apiVersion 0.0.1
 * @apiName Producto
 * @apiGroup Producto
 * @apiPermission admin
 *
 * @apiDescription Se encarga de eliminar un producto del sistema.
 *
 * @apiQuery {String} sku SKU del producto
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Producto eliminado correctamente"
 *   } 
 *
 */
 exports.delete = async (req, res) => {
    
    if(req.user.perfil && req.user.perfil !== 1){
        res.status(401).send({ message: 'No tiene autorización para ejecutar la acción'});    
    }
    
    try{
        const product = await ProductModel.findOneAndUpdate({sku : req.params.sku}, {
            lastUserUpdate : req.user.email, 
            deleted : true
        }, {
            new: true
        });
        res.send(`Producto ${product.sku} fue eliminado`);
        /*ProductModel.findOneAndRemove({sku : req.params.sku})
            .then(prod => res.send(prod.sku + ' Eliminado correctamente'))
            .catch(err => res.json(err));*/
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @api {get} /findBy/sku/1 Busca un Producto
 * @apiVersion 0.0.1
 * @apiName Producto
 * @apiGroup Producto
 * @apiPermission none
 *
 * @apiDescription Se encarga de buscar un producto por algun parametro indicado
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "605e9d2dd0eaaa0033c68b41",
 *        "sku": "2",
 *        "nombre": "dos",
 *        "marca": "marca Dos",
 *        "precio": 2000,
 *        "__v": 0
 *     }
 *
 */
exports.findBy = async (req, res) => {
    
    let filtro = {};
    filtro[req.params.atr] = 'precio' === req.params.atr ? parseInt(req.params.valor) : req.params.valor;
    
    try{
        const product = await ProductModel.findOne(filtro).exec();
        if(product){
            if(req.user.perfil && req.user.perfil !== 1){
                const tracking = new TrackingModel({ 
                    name: 'Consulta Produto', 
                    code: 100, 
                    sku: product.sku
                });
                tracking.save();
            }
            
            res.send(product);
        }else {
            res.status(500).send({
                message: 'Proucto no encontrado.'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {post} /findAll Lista los Producto
 * @apiVersion 0.0.1
 * @apiName Producto
 * @apiGroup Producto
 * @apiPermission none
 *
 * @apiDescription Se encarga de listar todos los producto
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "_id": "605e9d2dd0eaaa0033c68b41",
 *           "sku": "2",
 *           "nombre": "dos",
 *           "marca": "marca Dos",
 *           "precio": 2000,
 *           "__v": 0
 *       }, {
 *           "_id": "605ea5a35bd2140033baa82c",
 *           "sku": "1",
 *           "nombre": "uno",
 *           "marca": "marca uno",
 *           "precio": 1000,
 *           "__v": 0
 *       }]
 *
 */
exports.findAll = async (req, res) => {
    try{
        const products = await ProductModel.find({}).exec();
        res.send(products);
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}
