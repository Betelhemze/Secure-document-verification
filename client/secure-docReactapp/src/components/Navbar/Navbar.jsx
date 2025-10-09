import React,{useState} from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
   const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/">
        <span className="logo">SecureDocs</span>
        </a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`nav-right ${isOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/verify">Verify</a>
        <a href="/about">About</a>
        <a href="/contact">Contact Us</a>
        <a href="/auth">Login</a>
        <a href="/service">Services</a>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
}

export default Navbar
