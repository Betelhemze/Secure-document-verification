import React from "react";
import "./Serve.css";
import { motion } from "framer-motion";
import { FaFileUpload, FaLock, FaQrcode, FaSearch, FaHistory, FaUserShield, FaHandshake, FaBalanceScale, FaLightbulb } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Call from "../Call/Call";

const Service = () => {
  const services = [
    {
      icon: <FaFileUpload />,
      title: "Secure Document Upload",
      description:
        "Organizations can safely upload official files such as certificates, licenses, and contracts. Each document is encrypted and stored securely in the cloud.",
    },
    {
      icon: <FaLock />,
      title: "Digital Fingerprint (Hashing)",
      description:
        "Each document is assigned a unique cryptographic hash that ensures its integrity — if altered, the system detects the change immediately.",
    },
    {
      icon: <FaQrcode />,
      title: "QR Code & Verification ID",
      description:
        "Once uploaded, the system generates a unique QR or verification code that allows anyone to verify the authenticity of the document online.",
    },
    {
      icon: <FaSearch />,
      title: "Instant Document Verification",
      description:
        "Verifiers can simply scan the QR code or enter the verification ID to instantly confirm whether a document is genuine or has been revoked.",
    },
    {
      icon: <FaHistory />,
      title: "Audit Logs & Tracking",
      description:
        "Every action — upload, verification, or revocation — is recorded in detailed audit logs, ensuring full traceability and transparency.",
    },
    {
      icon: <FaUserShield />,
      title: "Role-Based Access Control",
      description:
        "Issuers, Verifiers, and Auditors each have defined permissions, ensuring documents are handled only by authorized personnel.",
    },
  ];

  const values = [
    {
      icon: <FaHandshake />,
      title: "Trust",
      description:
        "We prioritize building trust between organizations and their stakeholders by ensuring every verified document is 100% authentic and tamper-proof.",
    },
    {
      icon: <FaBalanceScale />,
      title: "Integrity",
      description:
        "Integrity drives our mission — we ensure documents remain unchanged, unaltered, and transparent throughout their lifecycle.",
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description:
        "We continually improve our technology to keep document verification modern, fast, and secure using the latest web and encryption standards.",
    },
  ];

  return (
    <>
        <Navbar />
    <section className="service-section">
      <div className="service-header">
        <h1 >Our Services</h1>
        <p>
          We provide end-to-end document security and authenticity solutions for organizations that value trust, integrity, and efficiency.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => (
          <motion.div
            className="service-card"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
      <br />
      <br />
      <div className="service-whocontainer">
        <h3 className="who-for-title">Who It's For</h3>
        <ul className="services-ul">
          <li>Universties</li>
          <li>Banks</li>
          <li>Employers</li>
          <li>Governmnet</li>
        </ul>
      </div>

      {/* Core Values Section */}
      <div className="values-section">
        <h2>Our Core Values</h2>
        <p className="values-subtext">
          The foundation of our platform lies in the values that guide every feature, interaction, and innovation we deliver.
        </p>

        <div className="values-grid">
          {values.map((value, index) => (
            <motion.div
              className="value-card"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              whileHover={{ scale: 1.07 }}
            >
              <div className="value-icon">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
        <Call />
    </section>
    <Footer />
    </>
  );
};

export default Service;
