var router = require('express').Router();
const trackingController = require('../controller/tracking');

router.get('/', trackingController.findAll);
router.post('/', trackingController.tracking);

module.exports = router;