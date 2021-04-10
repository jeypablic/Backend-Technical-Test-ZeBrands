const UserModel = require('../models/userModel');
const ProductModel = require('../models/productModel');
const TrackingModel = require('../models/trackingModel');

/**
 * @apiDefine Producto Producto
 *
 * API necesaria para gestionar los productos.
 */

/**
 * @api {post} /add Registrar un Producto
 * @apiPermission admin
 * @apiVersion v1
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
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        if(!await ProductModel.exists({sku : model.sku})){
            const product = new ProductModel(model);
            product.save().then(data => {
                res.status(201).send({
                    message : 'Product successfully registered'
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || 'Error trying to save the product'
                });
            });
        }else {
            res.send({
                message : 'Product is already registered'
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {put} /edit/1 Editar un Producto
 * @apiVersion v1
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

    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        delete model.sku;
        model['lastUserUpdate'] = req.user.email;
        await ProductModel.findOneAndUpdate({sku : req.params.sku}, model, {
            new: true
        });
        res.send({message : 'Product updated successfully'});
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {delete} /delete/1 Eliminar Producto
 * @apiVersion v1
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
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).send({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        const product = await ProductModel.findOneAndUpdate({sku : req.params.sku}, {
            lastUserUpdate : req.user.email, 
            deleted : true
        }, {
            new: true
        });
        res.send({message : `Product ${product.sku} was successfully removed`});
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

/**
 * @api {get} /findBy/sku/1 Busca un Producto
 * @apiVersion v1
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
    filtro[req.params.atr] = 'price' === req.params.atr ? parseInt(req.params.valor) : req.params.valor;
    
    try{
        const product = await ProductModel.findOne(filtro).exec();
        if(product){
            if(req.user.profile && req.user.profile !== 1){
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
                message: 'Prouct not found.'
            })
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e.message);
    }
}

/**
 * @api {get} /findAll Lista los Producto
 * @apiVersion v1
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
