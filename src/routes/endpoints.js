const {Router} = require('express');
const db = require('../db/database');
const userController = require('../controller/userController');
const productController = require('../controller/productController');
const trackingController = require('../controller/trackingController');
const auth = require('../auth/auth');

const router = Router();

router.post('/api/user/add', auth, userController.crear);
router.put('/api/user/edit/:rut', auth, userController.editar);
router.delete('/api/user/delete/:rut', auth, userController.eliminar);
router.get('/api/user/find/:atr/:valor', auth, userController.findBy);
router.get('/api/user/find-all', userController.findAll);

router.post('/api/login', userController.login);
router.post('/api/logout', auth ,userController.logout);
router.post('/api/logout-all', auth ,userController.logoutAll);

router.post('/api/tracking/add', trackingController.tracking);

router.post('/api/product/add', auth, productController.save);
router.put('/api/product/update/:sku', auth, productController.update);
router.delete('/api/product/delete/:sku', auth, productController.delete);
router.get('/api/product/find/:atr/:valor', auth, productController.findBy);
router.get('/api/product/find-all', productController.findAll);
module.exports = router;