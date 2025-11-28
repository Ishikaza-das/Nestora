import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center h-20 relative z-50 max-w-2xl md:max-w-5xl lg:max-w-7xl ml-auto mr-auto pl-5 pr-5">
      <div>
          <h1 className="font-bold text-2xl text-gray-900 hover:text-yellow-500 transition-all duration-300">Nestora</h1>
      </div>

      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link to="/home" className="hover:text-yellow-500 transition-all duration-300 cursor-pointer">
          Home
        </Link>
        <Link to="" className="hover:text-yellow-500 transition-all duration-300 cursor-pointer">
          About
        </Link>
        <Link to="" className="hover:text-yellow-500 transition-all duration-300 cursor-pointer">
          Contact
        </Link>
      </ul>

      <div className="hidden md:flex items-center gap-4">
        <Button className="bg-yellow-400/40 hover:bg-yellow-300 text-black px-6 py-2 rounded-none hover:scale-105 transition-transform duration-300"onClick={() => navigate("/login")}>
          Log In
        </Button>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-none hover:scale-105 transition-transform duration-300" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <ul
        className={`absolute top-20 left-0 w-full bg-white flex flex-col items-start gap-6 py-6 text-gray-700 font-medium transition-all duration-300 md:hidden z-50 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <li
          className="hover:text-yellow-500 transition-all duration-300 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Home
        </li>
        <li
          className="hover:text-yellow-500 transition-all duration-300 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          About
        </li>
        <li
          className="hover:text-yellow-500 transition-all duration-300 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </li>
        <div className="flex flex-col gap-4 mt-4">
          <Button className="bg-yellow-400/40 hover:bg-yellow-300 text-black rounded-none" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-none" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
