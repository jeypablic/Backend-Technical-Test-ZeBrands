var router = require('express').Router();
const productController = require('../controller/product');
const auth = require('../middlewares/authenticated');

router.post('/', auth, productController.save);
router.put('/:sku', auth, productController.update);
router.delete('/:sku', auth, productController.delete);
router.get('/:atr/:value', auth, productController.findBy);
router.get('/', auth, productController.findAll);

module.exports = router;