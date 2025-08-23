import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Heart, Users, Camera, Music, Utensils, Gift, DollarSign, Check, ChevronRight, ChevronLeft, Download, Palette } from 'lucide-react';

// Main colors from the requirements
const COLORS = {
  purple: '#8B5FBF',
  pink: '#FF9EB5',
  gold: '#D4AF37',
  lightPurple: '#A67FD3',
  lightPink: '#FFBECF',
  white: '#FFFFFF',
  black: '#333333',
  lightGray: '#F5F5F5',
  gray: '#DDDDDD'
};

const WeddingPlanner = () => {
  const [userName, setUserName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Form data
  const [weddingData, setWeddingData] = useState({
    // Page 1: Wedding Basics
    date: '',
    venue: '',
    
    // Page 2: Theme & Colors
    theme: '',
    colorPalette: '',
    
    // Page 3: Guest Preferences
    guestCount: 50,
    seatingArrangement: 'round',
    
    // Page 4: Ceremony & Reception
    ceremonyType: '',
    receptionFormat: '',
    
    // Page 5: Vendors
    photographer: '',
    caterer: '',
    florist: '',
    music: '',
    
    // Page 6: Personal Touches
    traditions: '',
    specialElements: [],
    
    // Page 7: Budget
    budget: 20000,
    priorities: []
  });

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setLoggedIn(true);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  // Update progress bar based on filled fields
  useEffect(() => {
    if (loggedIn) {
      // Count filled fields (simplified logic)
      const totalFields = Object.keys(weddingData).length;
      const filledFields = Object.values(weddingData).filter(value => 
        (typeof value === 'string' && value !== '') || 
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'number')
      ).length;
      
      const calculatedProgress = Math.min(Math.round((filledFields / totalFields) * 100), 100);
      setProgress(calculatedProgress);
    }
  }, [weddingData, loggedIn]);

  // Update any field in the wedding data
  const updateField = (field, value) => {
    setWeddingData({
      ...weddingData,
      [field]: value
    });
  };

  // AI recommendations based on selections
  const getAIRecommendations = () => {
    const recommendations = {
      photographer: ['Elegant Moments Photography', 'Timeless Captures', 'Dream Day Photos'],
      caterer: ['Gourmet Delights', 'Festive Feasts', 'Culinary Celebrations'],
      florist: ['Blooming Beauty', 'Floral Fantasy', 'Petal Perfect'],
      music: ['Harmony DJs', 'Melodic Moments', 'Rhythm Makers'],
      venues: ['Grand Ballroom', 'Garden Gazebo', 'Beachside Resort', 'Historic Mansion'],
    };

    // Custom recommendation logic based on theme
    if (weddingData.theme === 'Boho') {
      recommendations.venues = ['Garden Gazebo', 'Forest Retreat', 'Rustic Barn'];
      recommendations.florist = ['Wild Blooms', 'Nature\'s Touch', 'Bohemian Petals'];
    } else if (weddingData.theme === 'Royal') {
      recommendations.venues = ['Grand Ballroom', 'Historic Mansion', 'Castle Estate'];
      recommendations.caterer = ['Royal Feast', 'Elegant Dining', 'Luxe Catering'];
    }

    return recommendations;
  };

  // Generate exportable wedding plan
  const generateWeddingPlan = () => {
    // This would typically generate a PDF or formatted text
    // For this demo, we'll just prepare the content structure
    alert(`Wedding Plan for ${userName} exported! You can now share your plan with vendors and family members.`);
  };

  // Page transition variants for Framer Motion
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  // Confetti component
  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              top: -20,
              left: `${Math.random() * 100}%`,
              backgroundColor: [COLORS.purple, COLORS.pink, COLORS.gold][Math.floor(Math.random() * 3)],
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              borderRadius: '50%'
            }}
            animate={{
              top: '100vh',
              rotate: 360,
              opacity: [1, 1, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    );
  };

  // Pages array with content for each step
  const pages = [
    // Login Page
    {
      title: "Start Planning Your Dream Wedding",
      content: (
        <div className="flex flex-col items-center justify-center space-y-6">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-6xl mb-6"
          >
            💍
          </motion.div>
          <h1 className="text-3xl font-bold text-center" style={{ color: COLORS.purple }}>
            Start Planning Now
          </h1>
          <p className="text-lg text-center max-w-md">
            Your personalized wedding journey begins here. Let us help you create the wedding of your dreams!
          </p>
          <form onSubmit={handleLogin} className="w-full max-w-sm mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: COLORS.pink, focusRing: COLORS.purple }}
                placeholder="Enter your name"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 rounded-lg text-white font-medium"
              style={{ backgroundColor: COLORS.purple }}
              type="submit"
            >
              Begin Your Wedding Journey
            </motion.button>
          </form>
        </div>
      )
    },
    
    // Page 1: Wedding Basics
    {
      title: "Wedding Basics",
      icon: <Calendar size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Wedding Date</label>
            <input
              type="date"
              value={weddingData.date}
              onChange={(e) => updateField('date', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: COLORS.pink }}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Venue Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Beach', 'Garden', 'Auditorium', 'Culture'].map(venue => (
                <motion.div
                  key={venue}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-lg cursor-pointer border-2 flex flex-col items-center justify-center text-center`}
                  style={{ 
                    borderColor: weddingData.venue === venue ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.venue === venue ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => updateField('venue', venue)}
                >
                  <div className="text-3xl mb-2">
                    {venue === 'Beach' && '🏖️'}
                    {venue === 'Garden' && '🌷'}
                    {venue === 'Auditorium' && '🏬'}
                    {venue === 'Culture' && '⛪️'}
                  </div>
                  <span>{venue}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> {weddingData.venue ? 
                `${weddingData.venue} venues are most popular during ${
                  weddingData.venue === 'Beach' ? 'summer months' : 
                  weddingData.venue === 'Garden' ? 'spring and early fall' : 
                  weddingData.venue === 'Ballroom' ? 'winter and holiday season' : 
                  'fall months'
                }. Consider your date carefully!` : 
                'Select a venue type to get personalized recommendations!'}
            </p>
          </div>
        </div>
      )
    },
    
    // Page 2: Wedding Theme & Colors
    {
      title: "Theme & Colors",
      icon: <Palette size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Wedding Theme</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Modern', 'Classic', 'Boho', 'Rustic', 'Royal'].map(theme => (
                <motion.div
                  key={theme}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="overflow-hidden rounded-lg cursor-pointer border-2"
                  style={{ 
                    borderColor: weddingData.theme === theme ? COLORS.purple : COLORS.gray
                  }}
                  onClick={() => updateField('theme', theme)}
                >
                  <div className="h-32 bg-gray-200 flex items-center justify-center">
                    {/* Theme preview images would go here in a real app */}
                    <span className="text-4xl">
                      {theme === 'Modern' && '🏙️'}
                      {theme === 'Classic' && '✨'}
                      {theme === 'Boho' && '🌿'}
                      {theme === 'Rustic' && '🌾'}
                      {theme === 'Royal' && '👑'}
                    </span>
                  </div>
                  <div className="p-2 text-center">
                    <span className="font-medium">{theme}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Color Palette</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Purple & Gold', colors: [COLORS.purple, COLORS.gold] },
                { name: 'Pink & Gold', colors: [COLORS.pink, COLORS.gold] },
                { name: 'Purple & Pink', colors: [COLORS.purple, COLORS.pink] }
              ].map(palette => (
                <motion.div
                  key={palette.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="overflow-hidden rounded-lg cursor-pointer border-2"
                  style={{ 
                    borderColor: weddingData.colorPalette === palette.name ? COLORS.purple : COLORS.gray
                  }}
                  onClick={() => updateField('colorPalette', palette.name)}
                >
                  <div className="h-16 flex">
                    {palette.colors.map((color, i) => (
                      <div key={i} className="flex-1" style={{ backgroundColor: color }}></div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <span className="font-medium">{palette.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> {weddingData.theme && weddingData.colorPalette ? 
                `The ${weddingData.theme} theme pairs beautifully with your ${weddingData.colorPalette} palette! Consider ${
                  weddingData.theme === 'Boho' ? 'macramé decorations and wildflowers' : 
                  weddingData.theme === 'Modern' ? 'geometric centerpieces and minimalist stationery' : 
                  weddingData.theme === 'Classic' ? 'traditional roses and elegant calligraphy' : 
                  weddingData.theme === 'Rustic' ? 'wooden accents and mason jar decorations' :
                  'rich velvet fabrics and ornate gold details'
                }.` : 
                'Select a theme and color palette to see how they can work together!'}
            </p>
          </div>
        </div>
      )
    },
    
    // Page 3: Guest Preferences
    {
      title: "Guest List",
      icon: <Users size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Estimated Guest Count</label>
            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.lightGray }}
                onClick={() => updateField('guestCount', Math.max(10, weddingData.guestCount - 10))}
              >
                -
              </motion.button>
              
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold" style={{ color: COLORS.purple }}>
                  {weddingData.guestCount}
                </div>
                <div className="text-sm text-gray-500">guests</div>
              </div>
              
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: COLORS.lightGray }}
                onClick={() => updateField('guestCount', Math.min(300, weddingData.guestCount + 10))}
              >
                +
              </motion.button>
            </div>
            
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  backgroundColor: COLORS.pink,
                  width: `${Math.min(100, (weddingData.guestCount / 300) * 100)}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Intimate (10)</span>
              <span>Large (300+)</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Seating Arrangement</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'round', name: 'Round Tables', icon: '⭕' },
                { id: 'long', name: 'Long Tables', icon: '📏' },
                { id: 'mixed', name: 'Mixed Style', icon: '🔄' },
                { id: 'casual', name: 'Casual/Cocktail', icon: '🍸' }
              ].map(option => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-lg cursor-pointer border-2 flex items-center space-x-3"
                  style={{ 
                    borderColor: weddingData.seatingArrangement === option.id ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.seatingArrangement === option.id ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => updateField('seatingArrangement', option.id)}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span>{option.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> With {weddingData.guestCount} guests, you'll need approximately {Math.ceil(weddingData.guestCount / (weddingData.seatingArrangement === 'round' ? 8 : weddingData.seatingArrangement === 'long' ? 12 : 10))} {weddingData.seatingArrangement === 'round' ? 'round tables' : weddingData.seatingArrangement === 'long' ? 'long tables' : 'tables'}. {
                weddingData.guestCount > 150 ? 'Consider having a digital seating chart to help guests find their seats easily.' : 
                'Place cards with guest names will add a personal touch to your seating arrangement.'
              }
            </p>
          </div>
        </div>
      )
    },
    
    // Page 4: Ceremony & Reception
    {
      title: "Ceremony & Reception",
      icon: <Heart size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Ceremony Type</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'indoor', name: 'Indoor', icon: '🏛️' },
                { id: 'outdoor', name: 'Outdoor', icon: '🌳' },
                { id: 'religious', name: 'Religious', icon: '⛪' },
                { id: 'civil', name: 'Civil', icon: '📜' },
                { id: 'beach', name: 'Beach', icon: '🏖️' },
                { id: 'destination', name: 'Destination', icon: '✈️' }
              ].map(option => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-lg cursor-pointer border-2 flex items-center space-x-3"
                  style={{ 
                    borderColor: weddingData.ceremonyType === option.id ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.ceremonyType === option.id ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => updateField('ceremonyType', option.id)}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span>{option.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Reception Format</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'buffet', name: 'Buffet Style', icon: '🍽️' },
                { id: 'plated', name: 'Formal Sit-down', icon: '🍴' },
                { id: 'cocktail', name: 'Cocktail Style', icon: '🥂' },
                { id: 'stations', name: 'Food Stations', icon: '🧁' }
              ].map(option => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-lg cursor-pointer border-2 flex items-center space-x-3"
                  style={{ 
                    borderColor: weddingData.receptionFormat === option.id ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.receptionFormat === option.id ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => updateField('receptionFormat', option.id)}
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span>{option.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> {
                weddingData.ceremonyType && weddingData.receptionFormat ? 
                `${weddingData.ceremonyType === 'outdoor' ? 'For outdoor ceremonies, always have a backup plan in case of weather changes. ' : ''}${
                  weddingData.receptionFormat === 'buffet' ? 'Buffet style is great for encouraging guest mingling and works well with your guest count of ' + weddingData.guestCount + '.' :
                  weddingData.receptionFormat === 'plated' ? 'Formal sit-down dinners create an elegant atmosphere but require more staff. Budget approximately $20-30 more per person than buffet service.' :
                  weddingData.receptionFormat === 'cocktail' ? 'Cocktail receptions are perfect for a social atmosphere. Make sure to provide enough high-top tables and some seating options.' :
                  'Food stations allow guests to customize their dining experience and create natural flow throughout your venue.'
                }` : 
                'Select your ceremony type and reception format to get personalized advice!'
              }
            </p>
          </div>
        </div>
      )
    },
    
    // Page 5: Vendors & Services
    {
      title: "Vendors & Services",
      icon: <Camera size={24} />,
      content: (
        <div className="space-y-6">
          <p className="text-sm mb-4">Based on your choices so far, here are some AI-recommended vendors:</p>
          
          {[
            { id: 'photographer', name: 'Photographer', icon: <Camera size={20} /> },
            { id: 'caterer', name: 'Caterer', icon: <Utensils size={20} /> },
            { id: 'florist', name: 'Florist', icon: '🌸' },
            { id: 'music', name: 'Music/DJ', icon: <Music size={20} /> }
          ].map(vendor => {
            const recommendations = getAIRecommendations()[vendor.id] || [];
            
            return (
              <div key={vendor.id} className="mb-6">
                <label className="flex items-center space-x-2 font-medium mb-2">
                  <span>{typeof vendor.icon === 'string' ? vendor.icon : vendor.icon}</span>
                  <span>{vendor.name}</span>
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 rounded-lg cursor-pointer border text-center"
                      style={{ 
                        borderColor: weddingData[vendor.id] === rec ? COLORS.purple : COLORS.gray,
                        backgroundColor: weddingData[vendor.id] === rec ? COLORS.lightPurple + '20' : 'white' 
                      }}
                      onClick={() => updateField(vendor.id, rec)}
                    >
                      {rec}
                      {weddingData[vendor.id] === rec && (
                        <div className="mt-1 flex justify-center">
                          <Check size={16} style={{ color: COLORS.purple }} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 rounded-lg cursor-pointer border text-center"
                    style={{ 
                      borderColor: 
                        weddingData[vendor.id] && 
                        !recommendations.includes(weddingData[vendor.id]) ? 
                        COLORS.purple : COLORS.gray,
                      backgroundColor: 
                        weddingData[vendor.id] && 
                        !recommendations.includes(weddingData[vendor.id]) ? 
                        COLORS.lightPurple + '20' : 'white' 
                    }}
                    onClick={() => {
                      const custom = prompt(`Enter a custom ${vendor.name.toLowerCase()}:`);
                      if (custom) updateField(vendor.id, custom);
                    }}
                  >
                    Custom / Other
                  </motion.div>
                </div>
              </div>
            );
          })}
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> Book your photographer 9-12 months in advance, especially if your wedding is during peak season. {
                weddingData.theme ? 
                `For your ${weddingData.theme} theme, look for photographers who specialize in ${
                  weddingData.theme === 'Modern' ? 'editorial style with clean compositions' : 
                  weddingData.theme === 'Classic' ? 'timeless portraiture' : 
                  weddingData.theme === 'Boho' ? 'natural light and candid moments' : 
                  weddingData.theme === 'Rustic' ? 'documentary style with warm tones' :
                  'dramatic lighting and formal portraits'
                }.` : ''
              }
            </p>
          </div>
        </div>
      )
    },
    
    // Page 6: Personal Touches
    {
      title: "Personal Touches",
      icon: <Gift size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Special Traditions or Rituals</label>
            <textarea
              value={weddingData.traditions}
              onChange={(e) => updateField('traditions', e.target.value)}
              placeholder="Describe any special traditions, cultural elements, or unique rituals you'd like to include..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 h-24"
              style={{ borderColor: COLORS.pink }}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Personal Elements</label>
            <p className="text-sm text-gray-600 mb-3">Drag and drop to organize your priorities:</p>
            
            <div className="space-y-2">
              {[
                { id: 'custom-vows', name: 'Custom Wedding Vows', icon: '📝' },
                { id: 'unity-ceremony', name: 'Unity Ceremony', icon: '🕯️' },
                { id: 'memorial-tribute', name: 'Memorial Tribute', icon: '🕊️' },
                { id: 'cultural-elements', name: 'Cultural Elements', icon: '🌍' },
                { id: 'special-dance', name: 'Special Dance Performance', icon: '💃' },
                { id: 'custom-cocktail', name: 'Signature Cocktail', icon: '🍹' }
              ].map(element => (
                <motion.div
                  key={element.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-lg cursor-pointer border flex items-center"
                  style={{ 
                    borderColor: weddingData.specialElements.includes(element.id) ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.specialElements.includes(element.id) ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => {
                    if (weddingData.specialElements.includes(element.id)) {
                      updateField(
                        'specialElements', 
                        weddingData.specialElements.filter(id => id !== element.id)
                      );
                    } else {
                      updateField(
                        'specialElements',
                        [...weddingData.specialElements, element.id]
                      );
                    }
                  }}
                >
                  <span className="text-xl mr-3">{element.icon}</span>
                  <span>{element.name}</span>
                  {weddingData.specialElements.includes(element.id) && (
                    <Check size={16} style={{ color: COLORS.purple }} className="ml-auto" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="italic">
              <strong>AI Tip:</strong> Personal touches make your wedding memorable! {
                weddingData.specialElements.length > 0 ? 
                `Your selection of ${weddingData.specialElements.length} special elements will create meaningful moments. Consider preparing any readings or vows at least 1-2 months in advance to reduce stress.` : 
                'Select the elements that feel most meaningful to you and your partner.'
              }
            </p>
          </div>
        </div>
      )
    },
    
    // Page 7: Budget & Prioritization
    {
      title: "Budget & Priorities",
      icon: <DollarSign size={24} />,
      content: (
        <div className="space-y-8">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Total Wedding Budget</label>
            <div className="flex items-center space-x-4">
              <span className="text-xl">$</span>
              <input
                type="range"
                min={5000}
                max={100000}
                step={1000}
                value={weddingData.budget}
                onChange={(e) => updateField('budget', parseInt(e.target.value))}
                className="flex-1"
                style={{ accentColor: COLORS.purple }}
              />
              <span className="text-xl font-bold" style={{ color: COLORS.purple }}>
                ${weddingData.budget.toLocaleString()}
              </span>
            </div>
            
            <div className="grid grid-cols-3 text-center text-xs mt-1">
              <span>$5,000</span>
              <span>$50,000</span>
              <span>$100,000+</span>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Budget Allocation Priorities</label>
            <p className="text-sm text-gray-600 mb-3">Select what matters most (this helps with budget recommendations):</p>
            
            <div className="space-y-2">
              {[
                { id: 'venue', name: 'Dream Venue & Location', percentage: 40 },
                { id: 'food', name: 'Food & Beverage Quality', percentage: 25 },
                { id: 'photography', name: 'Photography & Videography', percentage: 15 },
                { id: 'attire', name: 'Wedding Attire', percentage: 10 },
                { id: 'decor', name: 'Flowers & Décor', percentage: 10 },
                { id: 'entertainment', name: 'Entertainment & Music', percentage: 10 },
                { id: 'stationary', name: 'Invitations & Stationery', percentage: 5 },
                { id: 'favors', name: 'Guest Favors & Gifts', percentage: 3 }
              ].map(item => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-lg cursor-pointer border flex items-center"
                  style={{ 
                    borderColor: weddingData.priorities.includes(item.id) ? COLORS.purple : COLORS.gray,
                    backgroundColor: weddingData.priorities.includes(item.id) ? COLORS.lightPurple + '20' : 'white' 
                  }}
                  onClick={() => {
                    if (weddingData.priorities.includes(item.id)) {
                      updateField(
                        'priorities', 
                        weddingData.priorities.filter(id => id !== item.id)
                      );
                    } else {
                      // Limit to top 3 priorities
                      if (weddingData.priorities.length < 3) {
                        updateField(
                          'priorities',
                          [...weddingData.priorities, item.id]
                        );
                      } else {
                        alert("Please select up to 3 top priorities");
                      }
                    }
                  }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">Typically ~{item.percentage}% of budget</div>
                  </div>
                  
                  {weddingData.priorities.includes(item.id) && (
                    <div className="ml-2 flex items-center justify-center h-6 w-6 rounded-full" style={{ backgroundColor: COLORS.purple }}>
                      <Check size={16} color="white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          {weddingData.priorities.length > 0 && (
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="font-medium mb-2">Recommended Budget Breakdown:</p>
              
              <div className="space-y-2">
                {weddingData.priorities.map(priority => {
                  const item = [
                    { id: 'venue', name: 'Venue & Location', percentage: 40 },
                    { id: 'food', name: 'Food & Beverage', percentage: 25 },
                    { id: 'photography', name: 'Photography & Video', percentage: 15 },
                    { id: 'attire', name: 'Wedding Attire', percentage: 10 },
                    { id: 'decor', name: 'Flowers & Décor', percentage: 10 },
                    { id: 'entertainment', name: 'Entertainment', percentage: 10 },
                    { id: 'stationary', name: 'Invitations', percentage: 5 },
                    { id: 'favors', name: 'Favors & Gifts', percentage: 3 }
                  ].find(i => i.id === priority);
                  
                  // Increase percentage for priorities
                  const boostPercentage = item.percentage * 1.25;
                  const amount = Math.round((weddingData.budget * boostPercentage) / 100);
                  
                  return (
                    <div key={priority} className="flex items-center">
                      <div className="flex-1">{item.name}</div>
                      <div className="font-medium">${amount.toLocaleString()}</div>
                    </div>
                  );
                })}
                
                <div className="border-t pt-2 mt-2 flex items-center font-medium">
                  <div className="flex-1">Remaining Budget</div>
                  <div>${Math.max(0, weddingData.budget - weddingData.priorities.reduce((sum, priority) => {
                    const item = [
                      { id: 'venue', name: 'Venue & Location', percentage: 40 },
                      { id: 'food', name: 'Food & Beverage', percentage: 25 },
                      { id: 'photography', name: 'Photography & Video', percentage: 15 },
                      { id: 'attire', name: 'Wedding Attire', percentage: 10 },
                      { id: 'decor', name: 'Flowers & Décor', percentage: 10 },
                      { id: 'entertainment', name: 'Entertainment', percentage: 10 },
                      { id: 'stationary', name: 'Invitations', percentage: 5 },
                      { id: 'favors', name: 'Favors & Gifts', percentage: 3 }
                    ].find(i => i.id === priority);
                    
                    // Increase percentage for priorities
                    const boostPercentage = item.percentage * 1.25;
                    const amount = Math.round((weddingData.budget * boostPercentage) / 100);
                    
                    return sum + amount;
                  }, 0)).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    },
    
    // Page 8: Final Summary
    {
      title: "Wedding Plan Summary",
      icon: <Check size={24} />,
      content: (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <div className="inline-block p-3 rounded-full mb-4" style={{ backgroundColor: COLORS.lightPurple }}>
                <Check size={32} color="white" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: COLORS.purple }}>
                Your Wedding Plan is Ready!
              </h2>
              <p className="text-gray-600 mt-2">
                Here's a summary of all your selections.
              </p>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Wedding Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">The Basics</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Calendar size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{weddingData.date ? new Date(weddingData.date).toLocaleDateString() : 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2" style={{ color: COLORS.purple }}>🏠</span>
                      <span className="font-medium">Venue:</span>
                      <span className="ml-2">{weddingData.venue || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <Users size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Guests:</span>
                      <span className="ml-2">{weddingData.guestCount} people</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Style & Theme</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2" style={{ color: COLORS.purple }}>✨</span>
                      <span className="font-medium">Theme:</span>
                      <span className="ml-2">{weddingData.theme || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <Palette size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Colors:</span>
                      <span className="ml-2">{weddingData.colorPalette || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <Heart size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Ceremony:</span>
                      <span className="ml-2">{weddingData.ceremonyType ? weddingData.ceremonyType.charAt(0).toUpperCase() + weddingData.ceremonyType.slice(1) : 'Not selected'}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Vendors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Camera size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Photographer:</span>
                      <span className="ml-2">{weddingData.photographer || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <Utensils size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Caterer:</span>
                      <span className="ml-2">{weddingData.caterer || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2" style={{ color: COLORS.purple }}>🌸</span>
                      <span className="font-medium">Florist:</span>
                      <span className="ml-2">{weddingData.florist || 'Not selected'}</span>
                    </li>
                    <li className="flex items-center">
                      <Music size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Music:</span>
                      <span className="ml-2">{weddingData.music || 'Not selected'}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Budget</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <DollarSign size={16} className="mr-2" style={{ color: COLORS.purple }} />
                      <span className="font-medium">Total Budget:</span>
                      <span className="ml-2">${weddingData.budget.toLocaleString()}</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1" style={{ color: COLORS.purple }}>🎯</span>
                      <div>
                        <span className="font-medium">Top Priorities:</span>
                        <div className="ml-2">
                          {weddingData.priorities.length > 0 ? 
                            weddingData.priorities.map(p => {
                              const priorities = {
                                'venue': 'Venue & Location',
                                'food': 'Food & Beverage',
                                'photography': 'Photography',
                                'attire': 'Wedding Attire',
                                'decor': 'Flowers & Décor',
                                'entertainment': 'Entertainment',
                                'stationary': 'Invitations',
                                'favors': 'Favors & Gifts'
                              };
                              return <div key={p}>{priorities[p]}</div>;
                            }) : 
                            'None selected'
                          }
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center"
                style={{ backgroundColor: COLORS.purple }}
                onClick={generateWeddingPlan}
              >
                <Download size={18} className="mr-2" />
                Export Wedding Plan
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                style={{ backgroundColor: COLORS.lightGray, color: COLORS.black }}
                onClick={() => setCurrentPage(0)}
              >
                Start Over
              </motion.button>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  // Render the main application
  return (
    <div className="pt-10">
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.white }}>

      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            {pages[currentPage].content}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation buttons */}
        {loggedIn && (
          <div className="mt-12 flex justify-between max-w-3xl mx-auto">
            {currentPage > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 rounded-lg flex items-center"
                style={{ color: COLORS.purple }}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft size={18} className="mr-1" />
                Previous
              </motion.button>
            )}
            
            {currentPage < pages.length - 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto py-2 px-4 rounded-lg text-white font-medium flex items-center"
                style={{ backgroundColor: COLORS.purple }}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                {currentPage === 0 ? 'Start Planning' : 'Next'}
                <ChevronRight size={18} className="ml-1" />
              </motion.button>
            )}
          </div>
        )}
      </main>
      
      {/* Confetti effect on login */}
      {confetti && <Confetti />}
    </div>
    </div>
  );
};

export default WeddingPlanner;