const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const chatCtrl = require('../controllers/chat');
const bodyParser = require('body-parser');
const app = require('../app');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', chatCtrl.index);/*page d'accueil*/
router.get('/chat', auth, chatCtrl.chat);/*page de chat*/
router.post('/login', urlencodedParser, chatCtrl.login);/*gestion login*/
router.get('/inscr',  chatCtrl.vueInscr);/*page inscription*/
router.post('/', urlencodedParser, chatCtrl.inscr);/*gestion inscription*/

module.exports = router;