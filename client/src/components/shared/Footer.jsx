import React from "react";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Nestora</h2>
          <p className="text-sm leading-relaxed">
            Find your dream home effortlessly. Explore verified properties and connect directly with landlords and agents.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-400 transition">About</a></li>
            <li><a href="/contact" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">For Users</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Login</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Sign Up</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Add Property</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-yellow-400 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Twitter size={20} /></a>
            <a href="#" className="hover:text-yellow-400 transition"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Nestora. All rights reserved.</p>
          <p>
            Built by{" "}
            <a href="https://github.com/Ishikaza-das" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition">
              Ritesh Das
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
