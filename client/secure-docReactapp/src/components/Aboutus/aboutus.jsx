import React from 'react';
import './about.css';
import teamSVG from '../../assets/team-svgrepo-com.svg';
import missionSVG from '../../assets/dart-mission-goal-success-svgrepo-com.svg';
import visionSVG from '../../assets/mission-adventure-tunnel-team-svgrepo-com.svg';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <>
    <Navbar></Navbar>
    <div className="about-container">
        
      <header className="about-header">
        
        <h1>About SecureDocs</h1>
        <p>
          SecureDocs is a trusted digital verification platform built to help
          universities, government institutions, and businesses securely issue
          and verify official documents such as certificates, licenses, and
          contracts.
        </p>
      </header>

      <section className="about-mission-vision">
        <div className="mission">
          <img src={missionSVG} alt="Mission Illustration" />
          <div>
            <h2>Our Mission</h2>
            <p>
              Our mission is to strengthen trust in document exchange by using
              modern cryptographic technologies. We ensure that every document
              issued through our platform is authentic, tamper-proof, and easily
              verifiable anywhere, anytime.
            </p>
          </div>
        </div>

        <div className="vision">
          <img src={visionSVG} alt="Vision Illustration" />
          <div>
            <h2>Our Vision</h2>
            <p>
              We envision a world where fake certificates and document fraud are
              completely eliminated. Through transparency, traceability, and
              security, SecureDocs empowers organizations to safeguard their
              integrity while building digital trust.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2>Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Integrity</h3>
            <p>
              We believe in maintaining honesty and trust in all our operations
              and technologies.
            </p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>
              We use cutting-edge technologies like blockchain-inspired hashing
              and QR verification to ensure reliability.
            </p>
          </div>
          <div className="value-card">
            <h3>Transparency</h3>
            <p>
              Every document interaction is recorded and auditable to ensure
              accountability at all levels.
            </p>
          </div>
          <div className="value-card">
            <h3>Accessibility</h3>
            <p>
              We make verification simple and accessible for anyone with an
              internet connection.
            </p>
          </div>
        </div>
      </section>

      <section className="about-team">
        <img src={teamSVG} alt="Team Collaboration" />
        <div>
          <h2>Our Team</h2>
          <p>
            Our dedicated team of developers, designers, and cybersecurity
            experts work tirelessly to create a reliable system that protects
            the integrity of documents worldwide. We collaborate with
            organizations to customize verification solutions that suit their
            specific needs.
          </p>
        </div>
      </section>

      <section className="testimony">
  <h2 className="testimony-title">What People Say About Us</h2>
  <p className="testimony-sub">
    Hear from our users who trust SecureDocs for document authenticity and verification.
  </p>

  <div className="testimony-wrapper">
    <div className="testimony-card">
      <img src="https://randomuser.me/api/portraits/women/79.jpg" alt="Hana" />
      <h3>Hana Bekele</h3>
      <span>Software Engineer</span>
      <p>
        “The verification process was seamless! I confirmed my certificates in seconds. SecureDocs truly makes verification stress-free.”
      </p>
      <div className="stars">★★★★★</div>
    </div>

    <div className="testimony-card">
      <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Samuel" />
      <h3>Samuel Tadesse</h3>
      <span>University Registrar</span>
      <p>
        “Our institution has adopted this system to validate academic records securely. It’s efficient, accurate, and reliable.”
      </p>
      <div className="stars">★★★★☆</div>
    </div>

    <div className="testimony-card">
      <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Mahi" />
      <h3>Mahi Alemu</h3>
      <span>Business Owner</span>
      <p>
        “I use SecureDocs to verify contracts before signing. It gives me peace of mind knowing everything is authentic.”
      </p>
      <div className="stars">★★★★★</div>
    </div>
  </div>

  <div className="slider-dots">
    <span className="dot "></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>
</section>

      
      <footer className="about-footer">
       <Footer></Footer>
      </footer>
    </div>
    </>
  );
}
