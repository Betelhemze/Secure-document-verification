import React,{useState} from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
   const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">SecureDocs</span>
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
        <a href="/#contact-us">Contact Us</a>
        <a href="/login">Login</a>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
}

export default Navbar
