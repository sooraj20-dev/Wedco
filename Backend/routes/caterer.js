const express = require('express');
const router = express.Router();
const catererController = require('../controllers/Caterer');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post(
  '/register',
  protect,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'menuImages', maxCount: 10 }
  ]),
  catererController.registerCaterer
);

module.exports = router;