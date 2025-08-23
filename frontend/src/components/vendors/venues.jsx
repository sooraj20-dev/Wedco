import React from 'react';

const Venues = () => {
  // Mock data for venues
  const venues = [
    { id: 1, name: "Grand Ballroom", capacity: 200, location: "Downtown", price: "$3000" },
    { id: 2, name: "Beachside Resort", capacity: 150, location: "Coastal", price: "$4500" },
    { id: 3, name: "Rooftop Garden", capacity: 100, location: "City Center", price: "$2500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Venues</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div key={venue.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{venue.name}</h2>
            <p className="text-gray-600">Capacity: {venue.capacity} guests</p>
            <p className="text-gray-600">Location: {venue.location}</p>
            <p className="text-green-600 font-medium">Price: {venue.price}</p>
            <button className="p-3 bg-gradient-to-r from-purple-600 to-pink-400 text-white">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;