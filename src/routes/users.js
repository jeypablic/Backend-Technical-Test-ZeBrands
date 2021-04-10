var router = require('express').Router();
const userController = require('../controller/user');
const auth = require('../middlewares/authenticated');

router.post('/', auth, userController.save);
router.put('/:rut', auth, userController.update);
router.delete('/:rut', auth, userController.delete);
router.get('/by/:atr/:valor', auth, userController.findBy);
router.get('/', userController.findAll);

module.exports = router;