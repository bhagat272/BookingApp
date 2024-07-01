const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const protect = require('../middleware/protect'); // Import protect middleware
const upload = require('../middleware/multerConfig'); // Import Multer config

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/allusers', protect,userController.getUsers);
router.get('/profile', protect,userController.fetchUserProfile); // GET endpoint to fetch user profile
router.put('/profile', protect, userController.updateProfile); // PUT endpoint to update user profile
router.post('/profile/photo', protect, upload.single('profilePhoto'), userController.updateProfilePhoto); // POST endpoint to upload profile photo

module.exports = router;
