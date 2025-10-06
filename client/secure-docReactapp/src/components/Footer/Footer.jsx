import React from 'react'
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Secure Docs</h3>
          <p>
            Empowering trusted document verification for institutions and
            individuals.
          </p>
        </div>

        <div className="footer-column">
            <h4>Pages</h4>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/login">Login</a>
              </li>
            </ul>
          </div>
            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
              </ul>
            </div>
          <div className="footer-column">
            <h4>Address</h4>
            <p>
              Title 8, Ring Road
              <br />
              Addis Ababa, Ethiopia
            </p>
          </div>
        

        {/* Social Media Section with Icons */}
        <div className="footer-social">
          <h4>Social</h4>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram /> Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter /> Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
        </div>
      </div>

      <hr />
      <p className="footer-copy">© Secure Docs 2024. All rights reserved.</p>
    </footer>
  );
}
