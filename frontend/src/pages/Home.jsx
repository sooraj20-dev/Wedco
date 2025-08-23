import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { Heart, Mail,UtensilsCrossed, Calendar,MapPin, DollarSign, CameraIcon, Users, Star, ChevronRight } from 'lucide-react';

// Main Home Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroSection />
      <FeatureCards />
      <TestimonialSection />
      <LiveCountdown />
      <TrendingThemes />
      <NewsletterSignup />
    </div>
  );
}

// Floating Heart Animation for Hero Section
function FloatingHearts() {
  const hearts = Array(20).fill(0);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((_, index) => {
        const size = Math.random() * 30 + 20;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        const initialX = Math.random() * 100;
        const initialY = Math.random() * 20 + 100;
        
        return (
          <motion.div
            key={index}
            className="absolute opacity-40"
            initial={{ 
              x: `${initialX}vw`, 
              y: `${initialY}vh`, 
              scale: 0 
            }}
            animate={{ 
              y: '0vh', 
              scale: 1,
              opacity: [0, 0.8, 0] 
            }}
            transition={{ 
              duration, 
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart 
              size={size} 
              color={Math.random() > 1.5 ? "#8B5FBF" : "#FF9EB5"} 
              fill={Math.random() > 1.5 ? "#8B5FBF" : "#FF9EB5"} 
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Hero Section with CTA
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100" />
      <FloatingHearts />
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Your Dream Wedding <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400">Starts Here</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl mb-10 text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Plan your perfect day with our all-in-one wedding platform designed to make your special moment unforgettable.
        </motion.p>
        
        <motion.button
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          "0px 0px 0px rgba(139, 95, 191, 0.4)",
          "0px 0px 20px rgba(139, 95, 191, 0.7)",
          "0px 0px 0px rgba(139, 95, 191, 0.4)"
        ]
      }}
      transition={{
        boxShadow: { repeat: Infinity, duration: 2 },
        type: "spring",
        stiffness: 500
      }}
    >
              <a href="/weddingplanner" className="hh">
              Start Planning Now
            </a>
    </motion.button>
      </div>
    </section>
  );
}

// Feature Cards
function FeatureCards() {
  const features = [
    {
        title: "Event Management",
        description: "Plan and organize every detail of your wedding seamlessly with expert coordination.",
        icon: <Calendar size={32} />,
        color: "from-blue-300 to-blue-600"
    },
    {
        title: "Digital Invitations",
        description: "Create stunning digital invitations with RSVP tracking and guest management.",
        icon: <Mail size={32} />,
        color: "from-violet-300 to-violet-600"
    },
    {
        title: "Budget Tracker",
        description: "Keep track of expenses, payments, and stay within your wedding budget.",
        icon: <DollarSign size={32} />,
        color: "from-indigo-300 to-indigo-600"
    },
    {
      title: "Photographers",
      description: "Capture your love story with stunning wedding photography that lasts a lifetime!",
      icon: <CameraIcon size={32} />,
      color: "from-pink-300 to-pink-600",
      path: "/photographers"
    },
    {
        title: "Venue Finder",
        description: "Discover and book the perfect venue for your special day with ease!",
        icon: <MapPin size={32} />,
        color: "from-orange-300 to-orange-600",
        path: "/venue"
    },
    {
        title: "Food",
        description: "Savor every moment with delicious cuisine tailored to your wedding theme.",
        icon: <UtensilsCrossed size={32} />,
        color: "from-green-300 to-green-600",
        path: "/cateres"
    }
    
    
  


  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Everything You Need
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Section
function TestimonialSection() {
  const testimonials = [
    {
      name: "Jessica & Michael",
      text: "This platform made planning our wedding so much easier. The budget tracker saved us from overspending!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Sarah & Thomas",
      text: "The digital invitations were beautiful and saved us so much time tracking RSVPs. Our guests loved them!",
      rating: 5,
      image: "/api/placeholder/60/60"
    },
    {
      name: "Emily & James",
      text: "We found our dream photographer through the vendor finder. The whole process was seamless.",
      rating: 4,
      image: "/api/placeholder/60/60"
    }
  ];

  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Couples Say
        </motion.h2>
        
        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 flex flex-col items-center justify-center text-center bg-white rounded-xl shadow-md p-8"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={testimonials[current].image} 
                alt={testimonials[current].name} 
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <p className="italic text-gray-600 mb-4">"{testimonials[current].text}"</p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}
                  />
                ))}
              </div>
              <p className="font-medium">{testimonials[current].name}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${index === current ? 'bg-purple-500' : 'bg-gray-300'}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Live Countdown
function LiveCountdown() {
  // Get the next wedding date (for demonstration, using next June 15)
  const calculateTimeLeft = () => {
    // Create a date for June 15 of next year
    const today = new Date();
    const nextYear = today.getMonth() > 5 ? today.getFullYear() + 1 : today.getFullYear();
    const targetDate = new Date(nextYear, 5, 15); // June 15
    const difference = targetDate - today;
    
    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
    
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [flip, setFlip] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      // Determine which values changed for flip animation
      const newFlip = {};
      Object.keys(newTimeLeft).forEach(key => {
        if (newTimeLeft[key] !== timeLeft[key]) {
          newFlip[key] = true;
        }
      });
      
      setFlip(newFlip);
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Function to create a flip card for each time unit
  const FlipCard = ({ label, value }) => {
    return (
      <div className="flex flex-col items-center mx-2 md:mx-4">
        <div className="relative h-20 w-16 md:h-24 md:w-20">
          <motion.div 
            className="absolute inset-0 bg-white rounded-lg shadow-md flex items-center justify-center text-2xl md:text-3xl font-bold"
            animate={{ rotateX: flip[label] ? [0, 90, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.div>
        </div>
        <p className="mt-2 text-sm uppercase text-gray-500">{label}</p>
      </div>
    );
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Popular Wedding Season Approaching
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Next popular wedding date: June 15th
        </motion.p>
        
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FlipCard label="days" value={timeLeft.days} />
          <FlipCard label="hours" value={timeLeft.hours} />
          <FlipCard label="minutes" value={timeLeft.minutes} />
          <FlipCard label="seconds" value={timeLeft.seconds} />
        </motion.div>
      </div>
    </section>
  );
}

// Trending Themes
function TrendingThemes() {
  const themes = [
    {
      title: "Rustic Elegance",
      image: "/api/placeholder/300/200",
      description: "Wooden accents with sophisticated florals"
    },
    {
      title: "Modern Minimalist",
      image: "/api/placeholder/300/200",
      description: "Clean lines and monochromatic palettes"
    },
    {
      title: "Bohemian Dream",
      image: "/api/placeholder/300/200",
      description: "Free-spirited with earthy elements"
    },
    {
      title: "Classic Romance",
      image: "/api/placeholder/300/200",
      description: "Timeless whites, pinks, and elegant details"
    },
    {
      title: "Garden Party",
      image: "/api/placeholder/300/200",
      description: "Lush greenery and vibrant floral arrangements"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Trending Themes</h2>
          <button className="flex items-center text-purple-600 font-medium hover:text-purple-800 transition-colors">
            View all <ChevronRight size={20} />
          </button>
        </motion.div>
        
        <div className="relative overflow-x-auto pb-6">
          <motion.div 
            className="flex space-x-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {themes.map((theme, index) => (
              <motion.div 
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-xl shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={theme.image} alt={theme.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{theme.title}</h3>
                  <p className="text-sm text-gray-600">{theme.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateEmail(email)) {
      // Submit form (would connect to an API in a real application)
      setIsSubmitted(true);
    } else {
      setIsValid(false);
    }
  };
  const navigate = useNavigate();

  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-100 to-pink-100">
      <div className="max-w-2xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Wedding Planning Tips
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Sign up to receive weekly planning tips, inspiration, and exclusive offers.
        </motion.p>
        
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-green-800"
          >
            <h3 className="font-semibold text-lg mb-2">Thank you for subscribing!</h3>
            <p>We'll be sending you the best wedding planning tips soon.</p>
          </motion.div>

          

          
        ) : (
          <motion.form 
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative">
              <motion.input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(true);
                }}
                className={`w-full px-6 py-4 rounded-full shadow-md border ${!isValid ? 'border-red-500' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                whileFocus={{ boxShadow: "0 0 0 3px rgba(139, 95, 191, 0.3)" }}
                animate={!isValid ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                transition={!isValid ? { duration: 0.4 } : {}}
              />
            <motion.button
              type="submit"
              className="absolute right-1 top-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-500 hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>

            </div>
            {!isValid && (
              <motion.p 
                className="text-red-500 mt-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Please enter a valid email address
              </motion.p>
            )}
          </motion.form>
        )}
         <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
        <motion.button
          onClick={() => navigate("/vendorregister")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:from-purple-700 hover:to-pink-500 hover:shadow-xl focus:outline-none transition-all duration-300"
        >
          Register as Vendor
        </motion.button>


        </motion.div>
      </div>
    </section>
  );
}