const express = require('express');
const router = express.Router();
const { registerUser, loginUser, infoUser } = require('../controllers/userController');
const { check } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/info', check, infoUser);

module.exports = router;