const express = require('express');
const router = express.Router();
const { registerUser, loginUser, infoUser } = require('../controllers/userController');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/info', infoUser);

module.exports = router;