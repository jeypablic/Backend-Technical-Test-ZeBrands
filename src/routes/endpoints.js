const {Router} = require('express');
const db = require('../db/database');
const userController = require('../controller/userController');
const productController = require('../controller/productController');
const trackingController = require('../controller/trackingController');
const auth = require('../auth/auth');

const router = Router();

router.post('/users', auth, userController.crear);
router.put('/users/:rut', auth, userController.editar);
router.delete('/users/:rut', auth, userController.eliminar);
router.get('/users/:atr/:valor', auth, userController.findBy);
router.get('/users', userController.findAll);

router.post('/login', userController.login);
router.post('/logout', auth ,userController.logout);
router.post('/logout-all', auth ,userController.logoutAll);

router.post('/tracking/add', trackingController.tracking);

router.post('/products', auth, productController.save);
router.put('/products/:sku', auth, productController.update);
router.delete('/products/:sku', auth, productController.delete);
router.get('/products/:atr/:valor', auth, productController.findBy);
router.get('/products', productController.findAll);
module.exports = router;