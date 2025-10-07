import React, {useState} from 'react'
import './Hero.css'
import pc from '../../assets/person.png'
import { Link } from 'react-router-dom';
const Hero = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="home-container">
      {/* Navbar */}
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Secure Document Verification System</h1>
          <p>
            A trusted platform for universities, employers, and government
            offices to issue and verify digital documents.
          </p>
          <div className="hero-buttons">
           <Link to="/verify">
            <button className="verify-btn">Verify Document</button>
            </Link>
            <Link to="/register">
            <button className="get-started-btn">Get Started</button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={pc} alt="Laptop with verified document" />
        </div>
      </section>
      </div>
  );
}

export default Hero
