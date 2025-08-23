import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp, LogOut , UserCircle2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    invitations: false,
    vendors: false
  });
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = (key) => {
    setDropdownOpen({
      ...dropdownOpen,
      [key]: !dropdownOpen[key]
    });
  };

  // LogOut and profile icon 

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setUserName(user.name);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserName(""); // 👈 Clear local state so UI updates
    navigate("/auth");
  };


  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-400 bg-clip-text text-transparent">
                Wedco
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Home
            </a>
            <a href="/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Dashboard
            </a>
            
            {/* Invitations Link */}
            <a 
              href="/invitations" 
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Invitations
            </a>
            
            {/* Vendors Dropdown */}
            <div className="relative">
              <button 
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                onClick={() => toggleDropdown('vendors')}
                aria-expanded={dropdownOpen.vendors}
              >
                Vendors
                {dropdownOpen.vendors ? 
                  <ChevronUp className="ml-1 w-4 h-4" /> : 
                  <ChevronDown className="ml-1 w-4 h-4" />
                }
              </button>
              
              {dropdownOpen.vendors && (
                <div 
                  className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-lg z-10 border border-gray-100"
                  aria-label="Vendors submenu"
                >
                  <a href="/vendors/photographers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    Photographers
                  </a>
                  <a href="/vendors/venues" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    Venues
                  </a>
                  <a href="/vendors/caterers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                    Caterers
                  </a>
                </div>
              )}
            </div>
            
            <a href="/about" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              About
            </a>
          </div>

          {/* Authentication Buttons */}
          {userName ? (
            <div className="flex items-center space-x-3">
              <UserCircle2 className="text-purple-600" size={28} />
              <span className="text-sm font-medium">{userName}</span>
              <button onClick={handleLogout} className="flex items-center">
                <LogOut size={18} color="black" />
              </button>
            </div>
          ) : (
            <a
              href="/auth"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500 rounded-md transition-colors duration-200 shadow-sm"
            >
              Login
            </a>
          )}



          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-purple-600 p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? 'block' : 'hidden'
        } bg-white shadow-lg absolute w-full overflow-hidden transition-all duration-300`}
        style={{ maxHeight: isOpen ? '100vh' : '0px' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">
            Home
          </a>
          <a href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">
            Dashboard
          </a>
          
          {/* Mobile Invitations dropdown */}
          <div>
            <button
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => toggleDropdown('invitations')}
              aria-expanded={dropdownOpen.invitations}
            >
              <span>Invitations</span>
              {dropdownOpen.invitations ? 
                <ChevronUp className="ml-1 w-4 h-4" /> : 
                <ChevronDown className="ml-1 w-4 h-4" />
              }
            </button>
            
            {dropdownOpen.invitations && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-purple-50">
                <a href="/invitations/create" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Create Invitation
                </a>
                <a href="/invitations/templates" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Templates
                </a>
                <a href="/invitations/manage" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Manage Invitations
                </a>
              </div>
            )}
          </div>
          
          {/* Mobile Vendors dropdown */}
          <div>
            <button
              className="w-full text-left flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              onClick={() => toggleDropdown('vendors')}
              aria-expanded={dropdownOpen.vendors}
            >
              <span>Vendors</span>
              {dropdownOpen.vendors ? 
                <ChevronUp className="ml-1 w-4 h-4" /> : 
                <ChevronDown className="ml-1 w-4 h-4" />
              }
            </button>
            
            {dropdownOpen.vendors && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-purple-50">
                <a href="/vendors/photographers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Photographers
                </a>
                <a href="/vendors/venues" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Venues
                </a>
                <a href="/vendors/caterers" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  Caterers
                </a>
                <a href="/vendors/all" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600">
                  All Vendors
                </a>
              </div>
            )}
          </div>
          
          <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">
            About
          </a>
          
          <div className="pt-4 pb-2 border-t border-gray-200 space-y-2">
            <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-800">
              Login
            </a>
            <a href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-400 hover:from-purple-700 hover:to-pink-500">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;