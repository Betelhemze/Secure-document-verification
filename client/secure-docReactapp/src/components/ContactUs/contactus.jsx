import React from "react";
import "./ContactUs.css";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";  

export default function ContactUs() {
  return (
    <><Navbar/>
    <div className="contact-page">
        
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          Whether you're a university, government office, or business, we're here to help you
          streamline document verification. Reach out with questions, feedback, or partnership inquiries.
        </p>
      </header>

      <section className="contact-content">
        {/* 📞 Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Email: <a href="mailto:support@securedocs.com">support@securedocs.com</a></p>
          <p>Phone: <a href="tel:+251912345678">+251 912 345 678</a></p>
          <p>Location: Addis Ababa, Ethiopia</p>
        </div>

        {/* 📝 Contact Form */}
        <form className="contact-form">
          <h2>Send Us a Message</h2>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </section>
      <br />
      <hr />
    </div>
    <footer>
       <Footer></Footer>
       </footer>
    </>
  );
}
