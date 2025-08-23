import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Camera, Star, MapPin, Calendar, Heart, Eye } from 'lucide-react';

const Photographers = () => {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    const fetchPhotographers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/photographer');
        const formatted = response.data.map((item) => ({
          id: item._id,
          name: item.fullName || 'Unnamed',
          email: item.email || '',
          phone: item.phone || '',
          specialties: item.specialties || [],
          experience: item.experience || '0',
          bio: item.bio || 'No bio provided.',
          price: item.pricing || 0,
          location: `${item.city || 'Unknown'}, ${item.state || ''}`,
          country: item.country || '',
          avatar: item.profilePicture
            ? `http://localhost:5000/${item.profilePicture.replace(/\\/g, '/')}`
            : '',
          portfolio: item.portfolioImages?.map((img) => `http://localhost:5000/${img.replace(/\\/g, '/')}`) || [],
          availability: item.availability?.dates || [],
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          rating: 4.5,
          reviews: 10,
          description: item.bio || 'Professional wedding photographer.'
        }));
        setPhotographers(formatted);
      } catch (error) {
        console.error("Error fetching photographers:", error.message);
        if (error.response) {
          console.error("Server Response:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPhotographers();
  }, []);

  const handleBookNow = (photographer) => {
    if (!selectedDate) {
      alert('Please select a wedding date first!');
      return;
    }

    const bookingData = {
      photographerId: photographer.id,
      photographerName: photographer.name,
      weddingDate: selectedDate,
      price: photographer.price,
      timestamp: new Date().toISOString()
    };

    console.log('Booking initiated:', bookingData);
    alert(`Booking request sent for ${photographer.name} on ${selectedDate}!`);
  };

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const PhotographerCard = ({ photographer }) => (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-purple-100 hover:border-purple-200 transform hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <div className="flex transition-transform duration-700 group-hover:translate-x-[-33.33%]">
          {(photographer.portfolio.length ? photographer.portfolio : [photographer.avatar]).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Portfolio ${idx + 1}`}
              className="w-full h-48 object-cover flex-shrink-0"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={() => toggleFavorite(photographer.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${favorites.has(photographer.id)
              ? 'fill-purple-500 text-purple-500'
              : 'text-gray-600'
              }`}
          />
        </button>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <Eye className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">View Portfolio</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={photographer.avatar}
              alt={photographer.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{photographer.name}</h3>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{photographer.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{photographer.rating}</span>
              <span className="text-sm text-gray-500">({photographer.reviews})</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">${photographer.price}</div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{photographer.description}</p>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {photographer.specialties.map((specialty, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Camera className="w-4 h-4" />
            <span>{photographer.experience} years experience</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{photographer.availability.length} dates available</span>
          </div>
        </div>

        <button
          onClick={() => handleBookNow(photographer)}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Book Now
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Finding your perfect photographers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Wedding <span className="text-purple-600">Photographers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capture your special moments with our carefully curated photographers
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <label htmlFor="wedding-date" className="text-gray-700 font-medium">
              Wedding Date:
            </label>
            <input
              id="wedding-date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{photographers.length}</span> photographers available
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photographers.map((photographer) => (
            <PhotographerCard key={photographer.id} photographer={photographer} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-100">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Need Help Choosing?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our wedding planning experts are here to help you find the perfect photographer for your special day.
            </p>
            <button className="bg-white text-rose-600 font-semibold py-3 px-8 rounded-xl border-2 border-rose-600 hover:bg-rose-600 hover:text-white transition-all duration-300">
              Get Personal Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photographers;
