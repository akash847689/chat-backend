const express = require('express');
const { addChat, getChat } = require('../controllers/chatController');
const router = express.Router();

router.route('/addChat').post(addChat)
router.route('/getChat').post(getChat)

module.exports= router;