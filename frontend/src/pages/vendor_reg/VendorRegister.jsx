import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, UtensilsCrossed, Building } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function VendorRegistrationPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate(); // Moved inside component

  const vendorTypes = [
    {
      id: 'photographer',
      title: 'Photographer',
      description: 'Capture beautiful moments with your stunning photography',
      icon: <Camera size={40} strokeWidth={1.5} />,
      color: 'bg-purple-700',
      hoverColor: 'bg-gradient-to-br from-purple-600 to-indigo-800',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-700',
      path: '/photo_reg'
    },
    {
      id: 'caterer',
      title: 'Caterer',
      description: 'Provide exquisite dining experiences for special events',
      icon: <UtensilsCrossed size={40} strokeWidth={1.5} />,
      color: 'bg-green-600',
      hoverColor: 'bg-gradient-to-br from-green-500 to-emerald-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      path: '/caterer_reg'
    },
    {
      id: 'venue',
      title: 'Venue Provider',
      description: 'Offer unforgettable spaces for celebrations and gatherings',
      icon: <Building size={40} strokeWidth={1.5} />,
      color: 'bg-amber-600',
      hoverColor: 'bg-gradient-to-br from-amber-500 to-yellow-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      path: '/venue_reg'
    }
  ];

  const handleSelectVendor = (vendor) => {
    if (selectedVendor === vendor.id) {
      setIsRedirecting(true);

      // Particle effect
      const particles = Array.from({ length: 15 });
      particles.forEach((_, i) => {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 rounded-full';
        particle.style.backgroundColor = i % 3 === 0 ? '#9333ea' : i % 3 === 1 ? '#db2777' : '#d97706';
        particle.style.top = '50%';
        particle.style.left = '50%';
        particle.style.position = 'absolute';
        particle.style.zIndex = '30';
        document.getElementById(vendor.id)?.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.animate([
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`, opacity: 0 }
        ], {
          duration: 1000,
          easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });

        setTimeout(() => {
          particle.remove();
        }, 1000);
      });

      // Navigate after animation
      setTimeout(() => {
        navigate(vendor.path);
      }, 800);
    } else {
      setSelectedVendor(vendor.id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
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
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const cardVariants = {
    unselected: { scale: 1 },
    selected: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25
      }
    },
    confirming: {
      scale: [1.05, 1.1, 1.05],
      boxShadow: [
        '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        '0 25px 30px -10px rgba(0, 0, 0, 0.2)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      ],
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl -ml-32 -mb-32"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-amber-200 rounded-full filter blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 z-10"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          Become a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600">Vendor</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-xl mx-auto">
          Select your vendor type to begin the registration process
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isRedirecting ? "exit" : "visible"}
        exit="exit"
        className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl z-10"
      >
        {vendorTypes.map((vendor) => (
          <motion.div
            key={vendor.id}
            id={vendor.id}
            variants={cardVariants}
            whileHover={{
              y: -10,
              boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)"
            }}
            animate={selectedVendor === vendor.id ? (isRedirecting ? "confirming" : "selected") : "unselected"}
            className={`${selectedVendor === vendor.id ? vendor.hoverColor : 'bg-white'} rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 relative`}
            onClick={() => handleSelectVendor(vendor)}
          >
            <div className="h-full flex flex-col">
              {/* Icon */}
              <div className={`p-8 flex justify-center items-center ${
                selectedVendor === vendor.id ? 'text-white' : `${vendor.iconBg} ${vendor.iconColor}`
              }`}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className={`p-6 rounded-full ${selectedVendor === vendor.id ? 'bg-white/20' : 'bg-white'}`}
                >
                  {vendor.icon}
                </motion.div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className={`text-2xl font-bold ${selectedVendor === vendor.id ? 'text-white' : 'text-gray-800'} mb-3`}>
                    {vendor.title}
                  </h3>
                  <p className={`${selectedVendor === vendor.id ? 'text-white/90' : 'text-gray-600'} text-lg`}>
                    {vendor.description}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: selectedVendor === vendor.id ? 1 : 0,
                    y: selectedVendor === vendor.id ? 0 : 10
                  }}
                  className="mt-8"
                >
                  {selectedVendor === vendor.id && (
                    <button
                      onClick={() => navigate(vendor.path)}
                      className="w-full py-3 px-6 bg-white text-gray-800 font-medium rounded-xl hover:bg-gray-50 transition-colors shadow-md flex items-center justify-center"
                    >
                      {isRedirecting ?
                        'Redirecting...' :
                        <span className="flex items-center">
                          Select & Continue
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </span>
                      }
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
