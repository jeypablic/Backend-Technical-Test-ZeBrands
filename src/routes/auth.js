const {Router} = require('express');
const loginController = require('../controller/auth');
const auth = require('../middlewares/authenticated');
const router = Router();

router.post('/login', loginController.login);
router.post('/logout', auth ,loginController.logout);
router.post('/logout-all', auth ,loginController.logoutAll);

module.exports = router;