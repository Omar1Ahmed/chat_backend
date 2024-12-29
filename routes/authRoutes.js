const express = require('express');
const { register, login } = require('../controllers/Auth');
const router = express.Router();
const {protect ,validateBody} = require('../middlewares/globalMiddlewares');


router.post('/register', validateBody(['email','password','first_name','last_name']),register);
router.post('/login', validateBody(['email','password']), login);

module.exports = router;
