import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar } from 'phosphor-react';

export default function Caterer_reg() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('forward');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Enhanced form data structure
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    experience: '',
    services: [],
    cuisines: [],
    capacity: '',
    pricing: '',
    bio: '',
    profileImage: null,
    menuImages: []
  });

  // Available options
  const [availableServices] = useState([
    { id: 1, name: 'Kerala Sadhya Catering', icon: '🍛' },
    { id: 2, name: 'South Indian Wedding Catering', icon: '💍' },
    { id: 3, name: 'North Indian Wedding Catering', icon: '🍲' },
    { id: 4, name: 'Corporate Events Catering', icon: '💼' },
    { id: 5, name: 'Birthday & Family Functions', icon: '🎂' },
    { id: 6, name: 'Seafood Specialties', icon: '🦐' },
  ]);

  const availableCuisines = [
    { id: 1, name: 'Kerala Cuisine' },
    { id: 2, name: 'North Indian' },
    { id: 3, name: 'South Indian' },
    { id: 4, name: 'Continental' },
    { id: 5, name: 'Chinese' },
    { id: 6, name: 'Arabic' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (field, id) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter(item => item !== id)
        : [...prev[field], id]
    }));
  };

  const handleImageUpload = (e, field) => {
    const files = Array.from(e.target.files)
    
    if (files.length > 0) {
      if (field === 'profileImage') {
        setFormData(prev => ({ ...prev, [field]: files[0] }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: [...(prev[field] || []), ...files]
        }));
      }
    }
  };

  const removeImage = (field, index) => {
    setFormData(prev => {
      if (field === 'profileImage') {
        return { ...prev, [field]: null };
      } else {
        const updatedImages = [...(prev[field] || [])];
        updatedImages.splice(index, 1);
        return { ...prev, [field]: updatedImages };
      }
    });
  };

  const validateStep = (step) => {
    console.log(`Validating step ${step} with data:`, formData);
    switch (step) {
      case 0:
        const step0Valid = formData.businessName.trim() && formData.ownerName.trim();
        console.log('Step 0 validation:', step0Valid);
        return step0Valid;
      case 1:
        const step1Valid = formData.experience && formData.services.length > 0;
        console.log('Step 1 validation:', step1Valid);
        return step1Valid;
      case 2:
        return true; // All fields optional
      default:
        return true;
    }
  };

  const steps = [
    {
      title: 'Business Info',
      content: (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Business Name*</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
            required
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Owner Name*</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
            required
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      ),
    },
    {
      title: 'Services & Cuisine',
      content: (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Experience (Years)*</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Select Services*</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {availableServices.map(service => (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleSelection('services', service.id)}
                className={`px-3 py-2 rounded border flex items-center ${
                  formData.services.includes(service.id)
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                <span className="mr-2">{service.icon}</span>
                <span className="text-left">{service.name}</span>
              </button>
            ))}
          </div>

          <label className="block mb-2 text-sm font-medium text-gray-700">Cuisine Specialties</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {availableCuisines.map(cuisine => (
              <button
                key={cuisine.id}
                type="button"
                onClick={() => toggleSelection('cuisines', cuisine.id)}
                className={`px-3 py-2 rounded border ${
                  formData.cuisines.includes(cuisine.id)
                    ? 'bg-green-100 border-green-500'
                    : 'bg-white border-gray-300'
                }`}
              >
                {cuisine.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Capacity (People)</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Starting Price (₹)</label>
              <input
                type="number"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Additional Info',
      content: (
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mb-4"
            rows={4}
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => handleImageUpload(e, 'profileImage')} 
            className="mb-2 w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100" 
          />
          {formData.profileImage && (
            <div className="relative inline-block mb-4">
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage('profileImage')}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}

          <label className="block mb-2 text-sm font-medium text-gray-700">Menu Images</label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={(e) => handleImageUpload(e, 'menuImages')} 
            className="mb-2 w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-green-50 file:text-green-700
              hover:file:bg-green-100" 
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.menuImages.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img}
                  alt={`Menu ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage('menuImages', index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const nextStep = (e) => {
    if (e) e.preventDefault();
    
    if (isTransitioning || isAnimating) return;
    
    if (!validateStep(currentStep)) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsTransitioning(true);
    setError(null);
    
    if (currentStep < steps.length - 1) {
      setDirection('forward');
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
        setIsTransitioning(false);
      }, 300);
    } else {
      setIsTransitioning(false);
    }
  };

  const prevStep = () => {
    setDirection('backward');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const submissionData = new FormData();
      // ... (your existing FormData setup)

      const response = await fetch('/api/caterers/register', {
        method: 'POST',
        body: submissionData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: await response.text() || 'Submission failed' };
        }
        throw new Error(errorData.message);
      }

      const result = await response.json();
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      experience: '',
      services: [],
      cuisines: [],
      capacity: '',
      pricing: '',
      bio: '',
      profileImage: null,
      menuImages: []
    });
    setIsSubmitted(false);
    setCurrentStep(0);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="p-4 md:p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2">Caterer Registration</h1>
                <p className="text-green-600 text-sm md:text-base">Join our network of professional caterers</p>
              </div>

              <div className="flex items-center justify-between mb-6 md:mb-8 relative">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        currentStep === index
                          ? 'bg-green-500 border-green-600 text-white'
                          : currentStep > index
                          ? 'bg-green-600 border-green-700 text-white'
                          : 'bg-white border-green-300 text-green-700'
                      }`}
                    >
                      {currentStep > index ? (
                        <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs md:text-sm ${
                        currentStep === index ? 'text-green-700 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                ))}
                <div className="absolute top-4 md:top-5 left-0 h-0.5 bg-green-200 w-full -z-10"></div>
                <div
                  className="absolute top-4 md:top-5 left-0 h-0.5 bg-green-600 transition-all duration-500 -z-5"
                  style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={currentStep === steps.length - 1 ? handleSubmit : nextStep}>
                <div className="relative overflow-hidden">
                  <div
                    className={`transition-all duration-300 transform ${
                      isAnimating
                        ? direction === 'forward'
                          ? '-translate-x-full opacity-0'
                          : 'translate-x-full opacity-0'
                        : 'translate-x-0 opacity-100'
                    }`}
                  >
                    {steps[currentStep].content}
                  </div>
                </div>

                <div className="flex justify-between mt-6 md:mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`px-4 py-1 md:px-6 md:py-2 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 transition-colors duration-300 text-sm md:text-base ${
                      currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Back
                  </button>
                  <button
                    type={currentStep === steps.length - 1 ? "submit" : "button"}
                    onClick={currentStep === steps.length - 1 ? undefined : (e) => {
                      e.preventDefault();
                      nextStep();
                    }}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center min-w-24"
                  >
                    {/* button content remains the same */}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 md:p-8 text-center"
            >
              <motion.div
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                className="mx-auto mb-6 md:mb-8 w-16 h-16 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle size={32} className="text-green-600" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-3 md:mb-4">Registration Complete!</h2>
              <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8">
                Thank you for registering as a caterer. We'll review your application and get back to you within 2 business days.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg font-medium shadow-md text-sm md:text-base"
              >
                Register Another Caterer
              </motion.button>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
                <p className="text-gray-500 mb-3 md:mb-4 text-sm md:text-base">What's next?</p>
                <div className="grid grid-cols-1 gap-3 md:gap-4 text-left">
                  <motion.div whileHover={{ y: -5 }} className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 md:mb-3">
                      <Calendar size={16} className="text-green-600" />
                    </div>
                    <h3 className="font-medium text-green-800 mb-1 text-sm md:text-base">Check Your Email</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      You'll receive a confirmation and further instructions.
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}