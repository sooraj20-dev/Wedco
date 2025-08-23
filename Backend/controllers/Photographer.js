const Photographer = require('../models/Photographer');

exports.registerPhotographer = async (req, res, next) => {
  try {
    const {
      userId, // from frontend
      fullName,
      email,
      phone,
      country,
      state,
      city,
      bio,
      specialties,
      experience,
      pricing,
      availability,
    } = JSON.parse(req.body.data);

    if (!fullName || !email || !phone || !pricing) {
      return res.status(400).json({
        message: 'Missing required fields: fullName, email, phone, pricing',
      });
    }

    const portfolioImages = req.files?.portfolioImages
      ? req.files.portfolioImages.map((file) => file.path)
      : [];

    const profilePicture = req.files?.profilePicture?.[0]?.path || "";

    const photographer = new Photographer({
      user: userId, // ✅ use frontend userId
      fullName,
      email,
      phone,
      country,
      state,
      city,
      bio,
      specialties,
      experience,
      portfolioImages,
      pricing,
      availability,
      profilePicture,
    });

    await photographer.save();

    res.status(201).json({
      message: 'Photographer registered successfully!',
      photographer,
    });
  } catch (error) {
    console.error('Photographer Register Error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  }
};
