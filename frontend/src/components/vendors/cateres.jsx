import React, { useState, useEffect } from 'react';
import { Search, Star, Users, DollarSign, Clock, Check, X, ChevronLeft, ChevronRight, Phone, Mail, Calendar } from 'lucide-react';

const Caterer = () => {
  const [caterers, setCaterers] = useState([]);
  const [filteredCaterers, setFilteredCaterers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock data - replace with actual API call
  const mockCaterers = [
    {
      id: 1,
      businessName: "Gourmet Delights",
      ownerName: "Sarah Johnson",
      email: "sarah@gourmetdelights.com",
      phone: "+1-555-0123",
      experience: "8 years",
      bio: "Specializing in farm-to-table cuisine with organic ingredients. We create memorable dining experiences for weddings, corporate events, and private parties.",
      services: ["Wedding Catering", "Corporate Events", "Private Parties", "Meal Prep"],
      cuisines: ["Italian", "Mediterranean", "American", "Vegetarian"],
      capacity: "50-500 guests",
      pricing: "$25-45 per person",
      availability: "Available weekends, 2-week advance booking",
      isApproved: true,
      profileImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
      menuImages: [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 2,
      businessName: "Spice Route Catering",
      ownerName: "Raj Patel",
      email: "raj@spiceroute.com",
      phone: "+1-555-0456",
      experience: "12 years",
      bio: "Authentic Indian and Asian fusion cuisine with traditional spices and modern presentation. Perfect for cultural celebrations and corporate diversity events.",
      services: ["Cultural Events", "Corporate Catering", "Festival Catering", "Buffet Service"],
      cuisines: ["Indian", "Thai", "Chinese", "Fusion"],
      capacity: "20-300 guests",
      pricing: "$18-35 per person",
      availability: "Available daily, 1-week advance booking",
      isApproved: true,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      menuImages: [
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1574653853027-5d5eb7042399?w=600&h=400&fit=crop"
      ]
    },
    {
      id: 3,
      businessName: "Coastal Bites",
      ownerName: "Maria Garcia",
      email: "maria@coastalbites.com",
      phone: "+1-555-0789",
      experience: "5 years",
      bio: "Fresh seafood and coastal cuisine with sustainable sourcing. We bring the ocean's finest flavors to your special events with creative presentation.",
      services: ["Beach Weddings", "Seafood Buffets", "Corporate Lunch", "Private Dining"],
      cuisines: ["Seafood", "Mediterranean", "Coastal", "Latin"],
      capacity: "30-200 guests",
      pricing: "$30-55 per person",
      availability: "Weekends only, 3-week advance booking",
      isApproved: false,
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
      menuImages: [
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1559737558-2f5a35cd3b9a?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
      ]
    }
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchCaterers = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCaterers(mockCaterers);
      setFilteredCaterers(mockCaterers);
      setLoading(false);
    };

    fetchCaterers();
  }, []);

  // Search functionality
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCaterers(caterers);
    } else {
      const filtered = caterers.filter(caterer =>
        caterer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caterer.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caterer.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCaterers(filtered);
    }
  }, [searchTerm, caterers]);

  const openImageModal = (images, index = 0) => {
    setSelectedImage(images);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedImage.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedImage.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading caterers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Caterers</h1>
            <p className="text-gray-600">Discover exceptional catering services for your events</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by business name, owner, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Caterers Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredCaterers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No caterers found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCaterers.map((caterer) => (
              <div key={caterer.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Profile Section */}
                <div className="relative">
                  <img
                    src={caterer.profileImage}
                    alt={caterer.businessName}
                    className="w-full h-48 object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openImageModal([caterer.profileImage], 0)}
                  />
                  <div className="absolute top-4 right-4">
                    {caterer.isApproved ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Check className="w-4 h-4 mr-1" />
                        Approved
                      </span>
                    ) : (
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  {/* Business Info */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{caterer.businessName}</h3>
                    <p className="text-gray-600 flex items-center mb-2">
                      <span className="font-medium">Owner:</span> {caterer.ownerName}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>{caterer.experience} experience</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      <a href={`mailto:${caterer.email}`} className="hover:text-blue-600 transition-colors">
                        {caterer.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-green-500" />
                      <a href={`tel:${caterer.phone}`} className="hover:text-green-600 transition-colors">
                        {caterer.phone}
                      </a>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{caterer.bio}</p>

                  {/* Services & Cuisines */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Services:</h4>
                    <div className="flex flex-wrap gap-1">
                      {caterer.services.slice(0, 3).map((service, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {caterer.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          +{caterer.services.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Cuisines:</h4>
                    <div className="flex flex-wrap gap-1">
                      {caterer.cuisines.map((cuisine, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                          {cuisine}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Capacity & Pricing */}
                  <div className="grid grid-cols-1 gap-3 mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{caterer.capacity}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{caterer.pricing}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{caterer.availability}</span>
                    </div>
                  </div>

                  {/* Menu Images */}
                  {caterer.menuImages && caterer.menuImages.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Menu Gallery:</h4>
                      <div className="flex gap-2 overflow-x-auto">
                        {caterer.menuImages.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Menu ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
                            onClick={() => openImageModal(caterer.menuImages, idx)}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium">
                    Contact Caterer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeImageModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              <img
                src={selectedImage[currentImageIndex]}
                alt="Gallery"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              {selectedImage.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {selectedImage.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caterer;