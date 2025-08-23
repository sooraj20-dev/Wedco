const express = require('express'); 
const router = express.Router();
const photographerController = require('../controllers/Photographer');
const multer = require('multer');
const path = require('path');
const Photographer = require('../models/Photographer'); // ✅ Add this

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});

const upload = multer({ storage });

// 🟢 Public Route – NO auth middleware
router.post(
  '/register',
  upload.fields([
    { name: 'portfolioImages', maxCount: 10 },
    { name: 'profilePicture', maxCount: 1 },
  ]),
  photographerController.registerPhotographer
);

// ✅ New route to get all photographers
router.get('/', async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.json(photographers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
