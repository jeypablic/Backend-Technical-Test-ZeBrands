const {Router} = require('express');
//const db = require('../db/database');


const loginController = require('../controller/auth');
const auth = require('../middlewares/authenticated');

const router = Router();

router.post('/login', loginController.login);
router.post('/logout', auth ,loginController.logout);
router.post('/logout-all', auth ,loginController.logoutAll);

module.exports = router;