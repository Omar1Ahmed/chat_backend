const express = require('express');
const { getAllmessages, sendMessage } = require('../controllers/messages');
const router = express.Router();
const {protect ,validateBody} = require('../middlewares/globalMiddlewares');


router.get('/getAllMessages',protect, validateBody(['selected_userId']),getAllmessages);
router.post('/sendMessage',protect, validateBody(['content','chat_id']), sendMessage);

module.exports = router;    
