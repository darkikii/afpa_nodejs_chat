const express = require('express');
const router = express.Router();
/*const auth = require('../middleware/auth');*/
const chatCtrl = require('../controllers/chat');
const bodyParser = require('body-parser');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', chatCtrl.index);
router.get('/chat', chatCtrl.chat);
router.post('/inscr', chatCtrl.inscr);

module.exports = router;