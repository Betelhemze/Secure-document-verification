import React from "react";
import "./process.css";

const Process = [
  {
    number: "1",
    title: "Upload Document",
    description:
      "The issuer uploads the document so that the system can generate a QR Code/unique ID.",
  },
  {
    number: "2",
    title: "QR/Code Generated",
    description:
      "The system creates a unique digital fingerprint (hash) of the document. It cannot be altered without detection.",
  },
  {
    number: "3",
    title: "Verify Instantly",
    description:
      "The verifier scans the QR Code or enters the verification ID on the website to check authenticity.",
  },
];

export default function WorkingProcess() {
  return (
    <section className="process-section">
      <h2 className="process-title">Working Process</h2>
      <h3>How does it work</h3>
      <div className="process-steps">
        {Process.map((step, index) => (
          <div className="process-card" key={index}>
            <div className="step-circle">{step.number}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
