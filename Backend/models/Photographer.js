const mongoose = require('mongoose');

const PhotographerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  bio: { type: String },
  specialties: [{ type: String }],
  experience: { type: String },
  portfolioImages: [{ type: String }],
  pricing: { type: Number, required: true },
  availability: { type: Object },

  // 👇 Add this line
  profilePicture: { type: String }, // Store URL or file path

}, { timestamps: true });


module.exports = mongoose.model('Photographer', PhotographerSchema);
