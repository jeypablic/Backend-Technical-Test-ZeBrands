const {Router} = require('express');
const db = require('./../db/database');
const userController = require('./../controller/userController');
const productoController = require('./../controller/productoController');
const trackingController = require('./../controller/trackingController');
const auth = require('./../auth/auth');

const router = Router();

router.post('/usr/add', auth, userController.crear);
router.put('/usr/edit/:rut', auth, userController.editar);
router.delete('/usr/delete/:rut', auth, userController.eliminar);
router.get('/usr/find/:atr/:valor', auth, userController.findBy);
router.get('/usr/find-all', userController.findAll);

router.post('/login', userController.login);
router.post('/logout', auth ,userController.logout);
router.post('/logout-all', auth ,userController.logoutAll);

router.post('/tracking/add', trackingController.tracking);

router.post('/product/add', auth, productoController.crear);
router.put('/product/edit/:sku', auth, productoController.editar);
router.delete('/product/delete/:sku', auth, productoController.eliminar);
router.get('/product/find/:atr/:valor', auth, productoController.findBy);
router.get('/product/find-all', productoController.findAll);
module.exports = router;