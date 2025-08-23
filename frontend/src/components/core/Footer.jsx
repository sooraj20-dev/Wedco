import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-purple-700 mb-4 font-playfair">WedCo</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-purple-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-purple-600 transition">About</a></li>
            <li><a href="/contact" className="hover:text-purple-600 transition">Contact</a></li>
            <li><a href="/privacy" className="hover:text-purple-600 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <address className="not-italic space-y-2">
            <p>123 Wedding Lane</p>
            <p>New York, NY 10001</p>
            <p>hello@wedco.com</p>
            <p>(123) 456-7890</p>
          </address>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="mb-4">Subscribe for wedding tips and offers</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-purple-500 flex-grow"
            />
            <button 
              type="submit" 
              className="bg-purple-600 text-white px-3 py-2 rounded-r-md hover:bg-purple-700 transition"
            >
              <Mail size={18} />
            </button>
          </form>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-purple-600 hover:text-purple-800 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800 transition">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} WedCo. All rights reserved.</p>
      </div>
    </footer>
  );
}