const mongoose = require('mongoose');

const catererSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  services: [{
    type: Number,
    required: true
  }],
  cuisines: [{
    type: Number
  }],
  capacity: {
    type: Number
  },
  pricing: {
    type: Number
  },
  bio: {
    type: String
  },
  profileImage: {
    type: String
  },
  menuImages: [{
    type: String
  }],
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for searchable fields
catererSchema.index({
  businessName: 'text',
  ownerName: 'text',
  bio: 'text'
});

module.exports = mongoose.model('Caterer', catererSchema);