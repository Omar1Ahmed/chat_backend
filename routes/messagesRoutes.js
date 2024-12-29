const express = require('express');
const { getAllmessages } = require('../controllers/messages');
const router = express.Router();
const {protect ,validateBody} = require('../middlewares/globalMiddlewares');


router.get('/getAllMessages',protect, validateBody(['selected_userId']),getAllmessages);
// router.post('/login', validateBody(['email','password']), login);

module.exports = router;
