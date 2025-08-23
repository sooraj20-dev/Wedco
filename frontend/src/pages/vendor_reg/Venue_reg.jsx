import React, { useState } from 'react';
import { Check, MapPin, Users, Tag, Camera, ArrowLeft, ArrowRight } from 'lucide-react';

const Venue_reg = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    venueName: '',
    venueType: '',
    district: '',
    address: '',
    city: '',
    pinCode: '',
    capacity: '',
    amenities: [],
    images: [],
    pricingModel: '',
    hourlyRate: '',
    fullDayRate: '',
    specialServices: [],
    localCuisine: false,
    traditionalArt: false,
    contactName: '',
    contactPhone: '',
    contactEmail: '',
  });

  // Kerala districts
  const keralaDistricts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 
    'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 
    'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 
    'Kannur', 'Kasaragod'
  ];

  // Common venue types in Kerala
  const venueTypes = [
    'Traditional Illam', 'Heritage Property', 'Backwater Resort',
    'Beach Property', 'Banquet Hall', 'Convention Center',
    'Auditorium', 'Hotel', 'Plantation Estate', 'Houseboat'
  ];

  // Common amenities
  const amenityOptions = [
    'Parking', 'WiFi', 'Air Conditioning', 'Catering', 
    'Sound System', 'Stage', 'Power Backup', 'Decoration',
    'Kerala Traditional Welcome', 'Boating Facility'
  ];

  // Special services
  const specialServiceOptions = [
    'Kerala Sadhya', 'Traditional Music', 'Kathakali Performance',
    'Mohiniyattam', 'Chenda Melam', 'Boat Race Display',
    'Ayurvedic Spa', 'Photography'
  ];

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleMultiSelect = (item, category) => {
    setFormData((prevData) => {
      const currentItems = prevData[category] || [];
      if (currentItems.includes(item)) {
        return {
          ...prevData,
          [category]: currentItems.filter(i => i !== item)
        };
      } else {
        return {
          ...prevData,
          [category]: [...currentItems, item]
        };
      }
    });
  };

  const handleSubmit = () => {
    console.log('Submitted:', formData);
    setStep(5); // Move to success step
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${index + 1 === step ? 'bg-orange-600 text-white' : 
                  index + 1 < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'} 
                  font-bold text-sm transition-all duration-300`}
            >
              {index + 1 < step ? <Check size={16} /> : index + 1}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-yellow-400 h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Basic Info</span>
          <span>Location</span>
          <span>Features</span>
          <span>Pricing</span>
          <span>Complete</span>
        </div>
      </div>
    );
  };

  const renderStepTitle = () => {
    switch(step) {
      case 1: return "Basic Information";
      case 2: return "Location Details";
      case 3: return "Venue Features";
      case 4: return "Pricing & Special Services";
      case 5: return "Registration Complete";
      default: return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="group relative">
              <input 
                type="text" 
                name="venueName" 
                value={formData.venueName} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all group-hover:border-orange-300"
                placeholder=" "
              />
              <label className={`absolute left-4 transition-all duration-200 ${formData.venueName ? 'text-xs text-orange-600 -top-2.5 bg-white px-1' : 'text-gray-500 top-3'}`}>
                Venue Name
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue Type</label>
              <div className="grid grid-cols-2 gap-3">
                {venueTypes.map((type) => (
                  <div 
                    key={type}
                    onClick={() => setFormData({...formData, venueType: type})}
                    className={`cursor-pointer border-2 rounded-lg p-3 transition-all hover:shadow-md ${formData.venueType === type ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                  >
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-2 border ${formData.venueType === type ? 'border-orange-500 bg-orange-500' : 'border-gray-400'}`}></div>
                      <span className="text-sm">{type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Contact Information</label>
              <input 
                type="text" 
                name="contactName" 
                placeholder="Contact Person Name" 
                value={formData.contactName} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              />
              <input 
                type="tel" 
                name="contactPhone" 
                placeholder="Contact Phone (include WhatsApp)" 
                value={formData.contactPhone} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              />
              <input 
                type="email" 
                name="contactEmail" 
                placeholder="Email Address" 
                value={formData.contactEmail} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
              />
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select 
                name="district" 
                value={formData.district} 
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none bg-white"
              >
                <option value="">Select District</option>
                {keralaDistricts.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="group relative">
              <textarea 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                rows="3"
                placeholder=" "
              ></textarea>
              <label className={`absolute left-4 transition-all duration-200 ${formData.address ? 'text-xs text-orange-600 -top-2.5 bg-white px-1' : 'text-gray-500 top-3'}`}>
                Complete Address
              </label>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1 group relative">
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-200 ${formData.city ? 'text-xs text-orange-600 -top-2.5 bg-white px-1' : 'text-gray-500 top-3'}`}>
                  City/Town
                </label>
              </div>
              
              <div className="flex-1 group relative">
                <input 
                  type="text" 
                  name="pinCode" 
                  value={formData.pinCode} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-200 ${formData.pinCode ? 'text-xs text-orange-600 -top-2.5 bg-white px-1' : 'text-gray-500 top-3'}`}>
                  PIN Code
                </label>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 flex items-start gap-3">
              <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-700">Your exact venue location helps guests find you easily. For heritage properties and rural venues, consider adding nearby landmarks.</p>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1 group relative">
                <input 
                  type="number" 
                  name="capacity" 
                  value={formData.capacity} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none transition-all"
                  placeholder=" "
                />
                <label className={`absolute left-4 transition-all duration-200 ${formData.capacity ? 'text-xs text-orange-600 -top-2.5 bg-white px-1' : 'text-gray-500 top-3'}`}>
                  Maximum Capacity
                </label>
              </div>
              <Users className="text-orange-500" size={24} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {amenityOptions.map((amenity) => (
                  <div 
                    key={amenity}
                    onClick={() => handleMultiSelect(amenity, 'amenities')}
                    className={`cursor-pointer border p-3 rounded-md flex items-center gap-2 transition-all
                      ${formData.amenities.includes(amenity) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                  >
                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${formData.amenities.includes(amenity) ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                      {formData.amenities.includes(amenity) && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Venue Images</label>
              <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50 hover:bg-orange-100 transition cursor-pointer">
                <Camera className="mx-auto text-orange-500 mb-2" size={32} />
                <p className="text-sm text-gray-600">Click to upload venue images (max 5 photos)</p>
                <p className="text-xs text-gray-500 mt-1">Include photos of main hall, entrance and special features</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">Kerala Special Features</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="localCuisine"
                  name="localCuisine"
                  checked={formData.localCuisine}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                />
                <label htmlFor="localCuisine" className="text-sm">
                  Kerala Traditional Cuisine Available
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="traditionalArt"
                  name="traditionalArt"
                  checked={formData.traditionalArt}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
                />
                <label htmlFor="traditionalArt" className="text-sm">
                  Traditional Art Performance Space
                </label>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Model</label>
              <div className="grid grid-cols-1 gap-3">
                {['Hourly Rate', 'Full Day Package', 'Custom Packages'].map((model) => (
                  <div 
                    key={model}
                    onClick={() => setFormData({...formData, pricingModel: model})}
                    className={`cursor-pointer border-2 rounded-lg p-3 transition-all flex items-center hover:shadow-md ${formData.pricingModel === model ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
                  >
                    <div className={`w-4 h-4 rounded-full mr-3 border ${formData.pricingModel === model ? 'border-orange-500 bg-orange-500' : 'border-gray-400'}`}></div>
                    <span>{model}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {(formData.pricingModel === 'Hourly Rate' || formData.pricingModel === 'Full Day Package') && (
              <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 space-y-4">
                {formData.pricingModel === 'Hourly Rate' && (
                  <div className="group relative">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 rounded-l-md border-y border-l border-gray-300">₹</span>
                      <input 
                        type="number" 
                        name="hourlyRate" 
                        value={formData.hourlyRate} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                        placeholder="Hourly Rate"
                      />
                    </div>
                  </div>
                )}
                
                {formData.pricingModel === 'Full Day Package' && (
                  <div className="group relative">
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 rounded-l-md border-y border-l border-gray-300">₹</span>
                      <input 
                        type="number" 
                        name="fullDayRate" 
                        value={formData.fullDayRate} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-orange-300 focus:border-orange-400 outline-none"
                        placeholder="Full Day Rate"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Services Available</label>
              <div className="grid grid-cols-2 gap-2">
                {specialServiceOptions.map((service) => (
                  <div 
                    key={service}
                    onClick={() => handleMultiSelect(service, 'specialServices')}
                    className={`cursor-pointer border p-3 rounded-md flex items-center gap-2 transition-all
                      ${formData.specialServices.includes(service) ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}
                  >
                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${formData.specialServices.includes(service) ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                      {formData.specialServices.includes(service) && <Check size={12} className="text-white" />}
                    </div>
                    <span className="text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50 flex items-start gap-3">
              <Tag className="text-orange-500 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm">Special cultural services can enhance your venue's appeal to visitors looking for authentic Kerala experiences.</p>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <Check className="text-green-500" size={36} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-orange-800">Registration Successful!</h2>
              <p className="text-gray-600 mt-2">Your venue has been successfully registered.</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 text-left mx-auto max-w-md">
              <h3 className="font-medium text-orange-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 flex-shrink-0 mt-0.5">1</div>
                  <span>Our team will verify your venue details within 48 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 flex-shrink-0 mt-0.5">2</div>
                  <span>You'll receive a confirmation via SMS and email</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center text-orange-700 flex-shrink-0 mt-0.5">3</div>
                  <span>Your venue will be live on our platform!</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  venueName: '',
                  venueType: '',
                  district: '',
                  address: '',
                  city: '',
                  pinCode: '',
                  capacity: '',
                  amenities: [],
                  images: [],
                  pricingModel: '',
                  hourlyRate: '',
                  fullDayRate: '',
                  specialServices: [],
                  localCuisine: false,
                  traditionalArt: false,
                  contactName: '',
                  contactPhone: '',
                  contactEmail: '',
                });
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-3 rounded-md hover:from-orange-600 hover:to-yellow-500 transition shadow-md mt-4"
            >
              Register Another Venue
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 border border-orange-100">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
          <MapPin className="text-white" size={24} />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold text-orange-800">Kerala Venue Registration</h1>
          <p className="text-sm text-gray-500">List your venue for events, weddings, and gatherings</p>
        </div>
      </div>

      {step < 5 && renderProgressBar()}

      <div className="mb-4">
        <h2 className="text-xl font-medium text-orange-700">{renderStepTitle()}</h2>
      </div>

      {renderStepContent()}

      {step < 5 && (
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-1 bg-white text-orange-600 border border-orange-300 px-4 py-2 rounded-md hover:bg-orange-50 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-6 py-2 rounded-md hover:from-orange-600 hover:to-yellow-500 transition shadow-md"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : step === 4 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1 bg-gradient-to-r from-orange-600 to-yellow-500 text-white px-6 py-2 rounded-md hover:from-orange-700 hover:to-yellow-600 transition shadow-md"
            >
              Submit
              <Check size={16} />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Venue_reg;