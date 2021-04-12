const UserModel = require('../models/user');
const ProductModel = require('../models/product');
const TrackingModel = require('../models/tracking');

/**
 * @apiDefine Products Products
 *
 * API required to manage the products.
 */

/**
 * @api {post} /add Register a Product
 * @apiPermission admin
 * @apiVersion v1
 * @apiName Products
 * @apiGroup Products 
 *
 * @apiDescription It is responsible for registering a product of the system.
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
 *      "message" : "Product successfully registered"
 *   } 
 *
 */
exports.save = async (req, res) => {

    const model = req.body;
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        if(!await ProductModel.exists({sku : model.sku})){
            model['lastUserUpdate'] = req.user.email;
            const product = new ProductModel(model);
            product.save().then(data => {
                res.status(201).json({
                    message : 'Product successfully registered'
                });
            }).catch(err => {
                res.status(500).json({
                    message: err.message || 'Error trying to save the product'
                });
            });
        }else {
            res.json({
                message : 'Product is already registered'
            });
        }
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {put} /1 Edit a Product
 * @apiVersion v1
 * @apiName Products
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiDescription In charge of editing a system product.
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
 *      "message" : "Product updated successfully"
 *   } 
 *
 */
 exports.update = async (req, res) => {

    const model = req.body;

    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        delete model.sku;
        model['lastUserUpdate'] = req.user.email;
        await ProductModel.findOneAndUpdate({sku : req.params.sku}, model, {
            new: true
        });
        res.json({message : 'Product updated successfully'});
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {delete} /1 Delete Product
 * @apiVersion v1
 * @apiName Products
 * @apiGroup Products
 * @apiPermission admin
 *
 * @apiDescription It is responsible for removing a product from the system.
 *
 * @apiQuery {String} sku SKU of product
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *      "message" : "Product SKU 1 was successfully removed"
 *   } 
 *
 */
 exports.delete = async (req, res) => {
    
    if(req.user.profile && req.user.profile !== 1){
        res.status(401).json({ message: 'You are not authorized to execute the action'});    
    }
    
    try{
        const product = await ProductModel.findOneAndUpdate({sku : req.params.sku}, {
            lastUserUpdate : req.user.email, 
            deleted : true
        }, {
            new: true
        });
        res.json({message : `Product SKU ${product.sku} was successfully removed`});
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {get} /sku/1 Find a Product
 * @apiVersion v1
 * @apiName Products
 * @apiGroup Products
 * @apiPermission none
 *
 * @apiDescription It is in charge of looking for a product by some indicated parameter
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "605e9d2dd0eaaa0033c68b41",
 *        "sku": "2",
 *        "name": "dos",
 *        "brand": "marca Dos",
 *        "price": 2000,
 *        "__v": 0
 *     }
 *
 */
exports.findBy = async (req, res) => {
    
    let filter = {};
    filter[req.params.atr] = 'price' === req.params.atr ? parseInt(req.params.value) : req.params.value;
    
    try{
        const product = await ProductModel.findOne(filter).exec();
        if(product){
            if(req.user.profile && req.user.profile !== 1){
                const tracking = new TrackingModel({ 
                    name: 'Consulta Produto', 
                    code: 100, 
                    sku: product.sku
                });
                tracking.save();
            }
            
            res.json(product);
        }else {
            res.status(500).json({
                message: 'Prouct not found.'
            });
        }
    }catch(e){
        res.status(500).json({message : e.message});
    }
}

/**
 * @api {get} / Product List
 * @apiVersion v1
 * @apiName Products
 * @apiGroup Products
 * @apiPermission none
 *
 * @apiDescription It is in charge of listing all the products
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *           "_id": "605e9d2dd0eaaa0033c68b41",
 *           "sku": "2",
 *           "name": "dos",
 *           "brand": "marca Dos",
 *           "price": 2000,
 *           "__v": 0
 *       }, {
 *           "_id": "605ea5a35bd2140033baa82c",
 *           "sku": "1",
 *           "name": "uno",
 *           "brand": "marca uno",
 *           "price": 1000,
 *           "__v": 0
 *       }]
 *
 */
exports.findAll = async (req, res) => {
    try{
        let filter = {};
        if(req.user.profile && req.user.profile !== 1){
            filter = {
                delete: false
            };
        }
        const products = await ProductModel.find(filter).exec();
        res.json(products);
    }catch(e){
        res.status(500).json({message : e.message});
    }
}
