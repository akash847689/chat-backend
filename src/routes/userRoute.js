const express = require('express')
const auth = require('../controllers/userController');
const  verifyToken  = require('../utils/verifyToken');
const upload = require('../middlewares/fileController')
const router = express.Router();



router.route('/register').post(auth.registerUser)
router.route('/login').post(auth.loginUser)
router.route('/update/:userId').patch(auth.updateUser)
router.route('/updatePic').post( upload(), auth.updatePic)
router.route('/profileData').post(auth.getProfileData)


module.exports= router;