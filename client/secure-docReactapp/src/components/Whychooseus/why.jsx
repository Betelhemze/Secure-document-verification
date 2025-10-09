import React from "react";
import "./why.css";
import { ShieldCheck, Lock, QrCode, Clock, Award, Users } from "lucide-react";

const Why = () => {
  const reasons = [
    {
      icon: <ShieldCheck size={42} />,
      title: "Tamper-Proof Verification",
      text: "Every document is digitally signed and hashed, ensuring no one can alter or forge your data once uploaded.",
    },
    {
      icon: <QrCode size={42} />,
      title: "Instant QR Verification",
      text: "Scan a simple QR code or enter a document ID to confirm authenticity in seconds — no technical skills needed.",
    },
    {
      icon: <Lock size={42} />,
      title: "Advanced Data Encryption",
      text: "Our platform protects every file using state-of-the-art encryption and secure storage, keeping your data safe at all times.",
    },
    {
      icon: <Clock size={42} />,
      title: "Fast & Reliable Access",
      text: "Designed for speed — you can upload, verify, and share documents without delay, anytime, anywhere.",
    },
    {
      icon: <Award size={42} />,
      title: "Trusted by Institutions",
      text: "From universities to government offices, our system ensures transparency and builds trust with every verification.",
    },
    {
      icon: <Users size={42} />,
      title: "User-Friendly Interface",
      text: "No technical jargon — our simple design helps anyone verify or issue documents with ease and confidence.",
    },
  ];

  return (
    <div className="why-container">
      <div className="why-header">
        <h1>Why Choose <span>SecureDocs</span>?</h1>
        <p>
          SecureDocs isn’t just a verification tool — it’s your digital shield for authenticity.  
          Whether you’re an institution or an individual, we ensure your documents stay verified, protected, and trusted worldwide.
        </p>
      </div>

      <div className="reasons-grid">
        {reasons.map((item, index) => (
          <div key={index} className="reason-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <div className="final-section">
        <h2>Secure.   Verified.    Trusted.</h2>
        <p>
          Our mission is simple! <br />To make document verification effortless, transparent, and future-ready.
        </p>
      </div>
    </div>
  );
};

export default Why;
