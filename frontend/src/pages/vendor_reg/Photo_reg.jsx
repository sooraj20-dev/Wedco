import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Calendar, DollarSign, CheckCircle, ChevronRight, ChevronLeft, X } from 'lucide-react';

export default function Photo_reg() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    specialties: [],
    experience: '',
    portfolioImages: [],
    country: '',
    state: '',
    city: '',
    pricing: 150,
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false },
    },
  });
  
  
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  
  const specialtyOptions = [
    'Wedding', 'Portrait', 'Fashion', 'Event', 'Family', 'Commercial', 'Landscape', 'Wildlife'
  ];
  
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const timeSlots = ['morning', 'afternoon', 'evening'];
  
  const handleNext = () => {
    const errors = {};

    if (currentStep === 1) {
      // Validate Step 1 fields
      if (!formData.fullName.trim()) errors.fullName = "Full Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!formData.phone.trim()) errors.phone = "Phone number is required";
      if (!formData.profileImage) {errors.profileImage = "Profile picture is required.";}
      if (!formData.country) errors.country = "Country is required";
      if (!formData.state) errors.state = "State is required";
      if (!formData.city) errors.city = "City is required";





    }

    if (currentStep === 2) {
      const errors = {};

      // Validate total uploaded images
      if (formData.portfolioImages.length > 10) {
        errors.portfolioImages = "You can upload a maximum of 10 images.";
      }

      setFormErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }


    if (currentStep === 3) {
      console.log("Validating Step 3...");
      const errors = {};

      if (!formData.pricing) {
        errors.pricing = 'Please provide your pricing.';
      }

      console.log("Errors:", errors);

      setFormErrors(errors);

      if (Object.keys(errors).length > 0) {
        console.log("Step 3 validation failed.");
        return;
      }
    }


    // Set errors (if any)
    setFormErrors(errors);

    // If there are errors, do not proceed to next step
    if (Object.keys(errors).length > 0) {
      return;
    }

    // No errors, proceed to next step (max step 4 assumed)
    if (currentStep < 4) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSpecialtyToggle = (specialty) => {
    setFormData(prev => {
      const specialties = [...prev.specialties];
      if (specialties.includes(specialty)) {
        return { ...prev, specialties: specialties.filter(s => s !== specialty) };
      } else {
        return { ...prev, specialties: [...specialties, specialty] };
      }
    });
  };
  
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // In a real app, these would be uploaded to a server
      // Here we'll just create object URLs for preview
      const newFiles = files.map(file => ({
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        url: URL.createObjectURL(file),
        file
      }));
      
      setFormData(prev => ({
        ...prev,
        portfolioImages: [...prev.portfolioImages, ...newFiles]
      }));
    }
  };
  
  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      portfolioImages: prev.portfolioImages.filter(img => img.id !== id)
    }));
  };
  
const toggleAvailability = (day, slot) => {
  setFormData(prev => ({
    ...prev,
    availability: {
      ...prev.availability,
      [day]: {
        ...prev.availability[day],
        [slot]: !prev.availability[day][slot]
      }
    }
  }));
};
  
const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append(
      'data',
      JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        bio: formData.bio,
        specialties: formData.specialties,
        experience: formData.experience,
        pricing: formData.pricing,
        availability: formData.availability,
      })
    );

    formData.portfolioImages.forEach((img) => {
      if (img.file || img) {
        data.append('portfolioImages', img.file || img);
      }
    });

    if (formData.profileImage && (formData.profileImage.file || formData.profileImage)) {
      data.append('profilePicture', formData.profileImage.file || formData.profileImage);
    }

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');

    const res = await axios.post(
      'http://localhost:5000/api/photographer/register',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (res.status === 200 || res.status === 201) {
      console.log('Registration successful ✅');
      setIsRegistered(true); // 🔥 Changed from setCurrentStep(4) to setIsRegistered(true)
    }

  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    setErrorMessage(
      error.response?.data?.message || 
      error.message || 
      'Registration failed. Please try again.'
    );
  }
};

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };
  
  // Custom animations for elements
  const floatingAnimation = {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut'
    }
  };

  // Progress steps
  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Portfolio' },
    { number: 3, title: 'Pricing' },
    { number: 4, title: 'Availability' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-500 rounded-full filter blur-3xl -ml-48 -mb-48"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-slate-600 rounded-full filter blur-3xl"></div>
      </div>

      
      {/* Registration Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl z-10 overflow-hidden border border-gray-100">
        {!isRegistered ? (
          <div className="flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 via-purple-700 to-indigo-900 p-6 text-white">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Photographer Registration</h1>
                <motion.div animate={floatingAnimation}>
                  <Camera size={36} strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="px-8 py-4 border-b border-gray-100">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex flex-col items-center">
                    <motion.div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 
                      ${currentStep === step.number ? 'bg-gradient-to-r from-purple-500 to-indigo-900 text-white' : 
                        currentStep > step.number ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}
                      animate={currentStep === step.number ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {currentStep > step.number ? (
                        <CheckCircle size={20} />
                      ) : (
                        step.number
                      )}
                    </motion.div>
                    <p className={`text-sm ${currentStep === step.number ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute h-0.5 bg-gray-200 w-12" 
                        style={{ 
                          left: `calc(${(index + 0.5) * (100 / steps.length)}%)`, 
                          width: `calc(${100 / steps.length}% - 50px)`,
                          top: '22px'
                        }}>
                        <motion.div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-900"
                          initial={{ width: "0%" }}
                          animate={{ width: currentStep > step.number ? "100%" : "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            
            {/* Form Steps */}
            <div className="p-8 relative overflow-hidden" style={{ minHeight: '500px' }}>
              <AnimatePresence mode="wait" custom={currentStep}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={1}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Tell us about yourself</motion.h2>
                    
                    <motion.div variants={itemVariants} className="space-y-4">

                      <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
  
                <div className="flex items-center gap-4">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage.url}
                      alt="Profile preview"
                      className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 text-[10px] text-center leading-tight">
                      No<br />image
                    </div>

                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setFormData(prev => ({
                          ...prev,
                          profileImage: {
                            file,
                            url: imageUrl,
                            name: file.name
                          }
                        }));
                      }
                    }}
                    className="text-sm text-gray-600"
                  />
                </div>

                {formErrors.profileImage && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.profileImage}</p>
                )}
              </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 ${
                              formErrors.fullName ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                            placeholder="Your full name"
                          />
                          {formErrors.fullName && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>
                          )}
                        </motion.div>

                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className={`w-full px-4 py-3 rounded-lg border ${
                                formErrors.email ? 'border-red-500' : 'border-gray-300'
                              } focus:ring-2 ${
                                formErrors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                              } focus:border-transparent transition-all`}
                              placeholder="Your email address"
                            />
                            {formErrors.email && (
                              <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                            )}
                          </motion.div>

                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className={`w-full px-4 py-3 rounded-lg border ${
                                formErrors.phone ? 'border-red-500' : 'border-gray-300'
                              } focus:ring-2 ${
                                formErrors.phone ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                              } focus:border-transparent transition-all`}
                              placeholder="Your phone number"
                            />
                            {formErrors.phone && (
                              <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>
                            )}
                          </motion.div>

                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.country ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 ${
                              formErrors.country ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                            placeholder="Country"
                          />
                          {formErrors.country && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.country}</p>
                          )}
                        </motion.div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.state ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 ${
                              formErrors.state ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                            placeholder="State"
                          />
                          {formErrors.state && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.state}</p>
                          )}
                        </motion.div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.city ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 ${
                              formErrors.city ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                            placeholder="City"
                          />
                          {formErrors.city && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.city}</p>
                          )}
                        </motion.div>
                      </div>

                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mb-4">
                          <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              formErrors.bio ? 'border-red-500' : 'border-gray-300'
                            } focus:ring-2 ${
                              formErrors.bio ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                            } focus:border-transparent transition-all`}
                            placeholder="Tell us about your photography experience..."
                          />
                          {formErrors.bio && (
                            <p className="text-sm text-red-500 mt-1">{formErrors.bio}</p>
                          )}
                        </motion.div>

                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Photography Specialties</label>
                        <div className="flex flex-wrap gap-2">
                          {specialtyOptions.map(specialty => (
                            <motion.button
                              key={specialty}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSpecialtyToggle(specialty)}
                              className={`px-4 py-2 rounded-full transition-all ${
                                formData.specialties.includes(specialty)
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {specialty}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      custom={2}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">
                        Upload Your Portfolio
                      </motion.h2>

                      <motion.div variants={itemVariants} className="space-y-4">
                        {/* ✅ Years of Experience Input */}
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Years of Experience
                          </label>
                          <input
                            type="number"
                            id="experience"
                            name="experience"
                            min="0"
                            value={formData.experience || ''}
                            onChange={(e) =>
                              setFormData({ ...formData, experience: Number(e.target.value) })
                            }
                            placeholder="e.g. 5"
                            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>

                        <p className="text-gray-600">
                          Showcase your best work. Upload up to 10 high-quality images.
                        </p>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-all"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <motion.div animate={floatingAnimation} className="flex flex-col items-center">
                          <Upload size={48} className="text-purple-500 mb-4" />
                          <p className="text-lg font-medium text-gray-700 mb-1">Drag photos here or click to upload</p>
                          <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 5MB each</p>
                        </motion.div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          required
                          multiple
                          accept="image/*"
                          className="hidden"
                        />
                      </motion.div>
                      
                      {formData.portfolioImages.length > 0 && (
                        <motion.div variants={itemVariants} className="mt-8">
                          <h3 className="text-lg font-medium text-gray-700 mb-3">Uploaded Images</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <AnimatePresence>
                              {formData.portfolioImages.map((image) => (
                                <motion.div
                                  key={image.id}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="relative group"
                                >
                                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                      src={image.url}
                                      alt={image.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeImage(image.id);
                                    }}
                                  >
                                    <X size={16} />
                                  </motion.button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={3}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">Set Your Pricing</motion.h2>
                    
                    <motion.div variants={itemVariants} className="space-y-8">
                      <p className="text-gray-600">
                        Set your pricing for photography services based on your expertise and local market standards.
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-gray-700">Hourly Rate</label>
                            <span className="text-lg font-bold text-purple-600">₹{formData.pricing}</span>
                          </div>
                          
                          <motion.div whileHover={{ scale: 1.01 }} className="relative">
                            <input
                              type="range"
                              min="1000"
                              max="10000"
                              step="500"
                              value={formData.pricing}
                              onChange={(e) => setFormData(prev => ({ ...prev, pricing: parseInt(e.target.value) }))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              style={{
                                backgroundImage: `linear-gradient(to right, #9333ea, #db2777, #d97706)`,
                                backgroundSize: `${((formData.pricing - 1000) / (10000 - 1000)) * 100}% 100%`,
                                backgroundRepeat: 'no-repeat'
                              }}
                            />
                            
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>₹1,000</span>
                              <span>₹10,000</span>
                            </div>
                          </motion.div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <motion.div
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            className="bg-gray-50 p-6 rounded-lg text-center border border-gray-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Basic</h3>
                            <p className="text-3xl font-bold text-purple-600 mb-4">₹{formData.pricing}</p>
                            <p className="text-gray-600 mb-4">Per hour</p>
                            <ul className="text-sm text-gray-600 mb-4 space-y-2">
                              <li>Basic editing</li>
                              <li>1 location in city</li> 
                              <li>Digital delivery (Google Drive/WhatsApp)</li>
                            </ul>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg text-center border border-purple-100 relative"
                          >
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                              MOST POPULAR
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Standard</h3>
                            <p className="text-3xl font-bold text-purple-600 mb-4">₹{Math.round(formData.pricing * 1.5)}</p>
                            <p className="text-gray-600 mb-4">Per hour</p>
                            <ul className="text-sm text-gray-600 mb-4 space-y-2">
                              <li>Advanced editing</li>
                              <li>Up to 2 locations (within district)</li> 
                              <li>Digital delivery + 15 printed 4R photos</li>
                              <li>Travel included (within 30 km)</li>
                            </ul>
                          </motion.div>
                          
                          <motion.div
                            whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                            className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-lg text-center border border-amber-100"
                          >
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Premium</h3>
                            <p className="text-3xl font-bold text-purple-600 mb-4">₹{Math.round(formData.pricing * 2)}</p>
                            <p className="text-gray-600 mb-4">Per hour</p>
                            <ul className="text-sm text-gray-600 mb-4 space-y-2">
                              <li>Professional retouching</li>
                              <li>Multiple locations (Kerala-wide)</li> 
                              <li>All digital files + 30 printed photos</li>
                              <li>Premium photo album (20 pages)</li>
                              <li>Travel & food covered</li>
                            </ul>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
                
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={4}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800">
                      Set Your Availability
                    </motion.h2>
                    
                    <motion.div variants={itemVariants} className="space-y-4">
                      <p className="text-gray-600">
                        Let us know when you're available for photography sessions.
                      </p>
                      
                      <div className="grid grid-cols-7 gap-2 md:gap-4 text-center">
                        {days.map((day) => (
                          <div key={day} className="text-sm font-medium text-gray-700">
                            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                          </div>
                        ))}
                      </div>
                      
                      {timeSlots.map((slot) => (
                        <div key={slot} className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-24 text-sm font-medium text-gray-700">
                              {slot.charAt(0).toUpperCase() + slot.slice(1)}
                            </div>
                            <div className="h-px flex-grow bg-gray-200"></div>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-2 md:gap-4">
                            {days.map((day) => (
                              <motion.div
                                key={`${day}-${slot}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`aspect-square rounded-lg cursor-pointer flex items-center justify-center ${
                                  formData.availability[day][slot]
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                }`}
                                onClick={() => toggleAvailability(day, slot)}
                              >
                                {formData.availability[day][slot] && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                  >
                                    <CheckCircle size={20} />
                                  </motion.div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-purple-500 via-indigo-700 to-indigo-900 text-white rounded-lg font-medium shadow-md flex items-center justify-center"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Processing...
                            </div>
                          ) : (
                            'Complete Registration'
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Navigation buttons */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  currentStep === 1
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ChevronLeft size={18} className="mr-1" />
                Previous
              </motion.button>
              
              {currentStep < 4 && (
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-900 text-white rounded-lg flex items-center shadow-lg hover:from-purple-700 hover:to-indigo-500 hover:shadow-xl focus:outline-none transition-all duration-300"
                
                  onClick={handleNext}
                >
                  Next
                  <ChevronRight size={18} className="ml-1" />
                </motion.button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-16 text-center"
          >
            <motion.div
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
              className="mx-auto mb-8 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle size={48} className="text-green-500" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Complete!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for registering as a photographer. We'll review your application and get back to you within 2 business days.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-900 text-white rounded-lg font-medium shadow-md"
              onClick={() => {
                setIsRegistered(false); // Changed from true to false
                setCurrentStep(1);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  country: '', // Added missing fields
                  state: '',   // Added missing fields
                  city: '',    // Added missing fields
                  bio: '',
                  specialties: [],
                  portfolioImages: [],
                  pricing: 150,
                  profileImage: null, // Added missing field
                  availability: {
                    monday: { morning: false, afternoon: false, evening: false },
                    tuesday: { morning: false, afternoon: false, evening: false },
                    wednesday: { morning: false, afternoon: false, evening: false },
                    thursday: { morning: false, afternoon: false, evening: false },
                    friday: { morning: false, afternoon: false, evening: false },
                    saturday: { morning: false, afternoon: false, evening: false },
                    sunday: { morning: false, afternoon: false, evening: false },
                  }
                });
              }}
            >
              Register Another Photographer
            </motion.button>
                        
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-500 mb-4">What's next?</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <Calendar size={20} className="text-purple-600" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Check Your Email</h3>
                  <p className="text-sm text-gray-600">We've sent a confirmation with next steps to your inbox.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                    <Camera size={20} className="text-pink-600" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Prepare Your Portfolio</h3>
                  <p className="text-sm text-gray-600">Have more samples ready for when we contact you.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <DollarSign size={20} className="text-amber-600" />
                  </div>
                  <h3 className="font-medium text-gray-800 mb-1">Review Pricing</h3>
                  <p className="text-sm text-gray-600">Consider your pricing strategy for different types of shoots.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}