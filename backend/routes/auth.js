const express = require('express');
const router = express.Router();


const {
  signup,
  login,
  CheckAuth,
  logout,
//   verifyEmail,
//   forgotPassword,
//   resetPassword,
//   updateProfile
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
// router.get('/verify-email/:token', verifyEmail);
// router.post('/forgot-password', forgotPassword);
// router.put('/reset-password/:token', resetPassword);

router.get('/me', protect, CheckAuth);
// router.put('/update-profile', protect, updateProfile);

module.exports = router; 