const Caterer = require('../models/Caterer');
const User = require('../models/User');
const { uploadToCloudinary } = require('../utils/cloudinary'); // Assuming you have cloudinary setup

// Register a new caterer
exports.registerCaterer = async (req, res, next) => {
  try {
    const { 
      businessName, 
      ownerName, 
      email, 
      phone, 
      experience, 
      services, 
      cuisines, 
      capacity, 
      pricing, 
      bio 
    } = req.body;

    // Handle file paths
    const profileImage = req.files?.profileImage?.[0]?.path;
    const menuImages = req.files?.menuImages?.map(file => file.path) || [];

    const caterer = new Caterer({
      user: req.user.id,
      businessName,
      ownerName,
      email,
      phone,
      experience,
      services: JSON.parse(services),
      cuisines: cuisines ? JSON.parse(cuisines) : [],
      capacity: capacity ? Number(capacity) : null,
      pricing: pricing ? Number(pricing) : null,
      bio,
      profileImage,
      menuImages
    });

    await caterer.save();

    res.status(201).json({
      success: true,
      data: caterer
    });
  } catch (err) {
    next(err);
  }
};