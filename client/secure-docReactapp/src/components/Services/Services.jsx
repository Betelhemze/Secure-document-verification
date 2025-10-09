import React from "react";
import audit from '../../assets/audit.jpg'
import docAuth from '../../assets/doc auth.jpg'
import qrCode from '../../assets/qr code.jpg'
import roleBased from '../../assets/role based.jpeg'

import "./Services.css";

const services = [
  {
    title: "Document Authenticity",
    description:
      "Every uploaded document is securely saved with cryptographic hashing to ensure it cannot be altered or forged.",
    image: docAuth,
  },
  {
    title: "QR / Unique ID Verification",
    description:
      "Each document is assigned a unique ID and scannable QR code, enabling users to verify it by entering the code.",
    image: qrCode,
  },
  {
    title: "Role-Based Secure Access",
    description:
      "Strict access control allows only authorized users to open documents. Access is granted based on roles and permissions.",
    image: roleBased,
  },
  {
    title: "Audit Logs & Transparency",
    description:
      "All activities are recorded in audit logs, ensuring accountability and transparency for every document interaction.",
    image: audit,
  },
];

export default function ServicesSection() {
  return (
    <div className="wrapper">
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="services-card" key={index}>
            <div className="services-icon"><img src={service.image} alt={service.title}/></div>
            <h3 className="services-title">{service.title}</h3>
            <p className="services-description">{service.description}</p>
            <a href="/service" className="cta-button">Learn More </a>
          </div>
        ))}
      </div>
      
    </section>
    <div className="who">
        <h3 className="who-for-title">Who It's For</h3>
        <ul className="services-ul">
          <li>Universties</li>
          <li>Banks</li>
          <li>Employers</li>
          <li>Governmnet</li>
        </ul>
      </div>
    
    </div>
  );
}
