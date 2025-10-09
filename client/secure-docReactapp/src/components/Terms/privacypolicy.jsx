// File: SecureDocsPolicy.jsx
import React, { useState } from "react";
import "./privacy.css";
import Navbar from "../Navbar/Navbar";

export default function SecureDocsPolicy() {
  const [tab, setTab] = useState("privacy");

  return (
    <>
    <Navbar></Navbar>
    <div className="policy-root">
        
      <header className="policy-header">
        <br />
        <h1>Secure Document Verification — Policies</h1>
        <p className="policy-sub">Privacy Policy & Terms of Service </p>
        <div className="policy-tabs">
          <button
            className={`tab-btn ${tab === "privacy" ? "active" : ""}`}
            onClick={() => setTab("privacy")}
          >
            Privacy Policy
          </button>
          <button
            className={`tab-btn ${tab === "terms" ? "active" : ""}`}
            onClick={() => setTab("terms")}
          >
            Terms of Service
          </button>
        </div>
      </header>

      <main className="policy-body">
        {tab === "privacy" ? (
          <article className="policy-section">
            <h2>Privacy Policy</h2>
            <p className="muted">Effective Date: <em>October 7,2025 G.C</em></p>

            <h4>1. Introduction</h4>
            <p>
              Welcome to <strong>Secure Document Verification System</strong> ("we", "our", or "the
              Platform"). We respect your privacy and are committed to protecting the personal and
              organizational information you share with us. This Privacy Policy explains how we
              collect, use, store, and safeguard your data when you use our services. By accessing
              or using the platform, you agree to this Privacy Policy.
            </p>

            <h4>2. Information We Collect</h4>
            <h4>a. Information You Provide Directly</h4>
            <ul>
              <li>Account information: name, organization, email, and role (Issuer, Verifier, Auditor).</li>
              <li>Uploaded documents: certificates, licenses, contracts and other official files.</li>
              <li>Audit data: records of who uploaded, verified, or revoked documents, and timestamps.</li>
            </ul>

            <h4>b. Automatically Collected Information</h4>
            <p>
              We collect device/browser details, IP address (approximate location), and usage logs
              (pages visited, actions taken) to maintain and secure the service.
            </p>

            <h4>c. Cookies</h4>
            <p>Cookies are used to remember login sessions, improve UX, and analyze usage. You may
              disable cookies via your browser settings (note that some features may stop working).</p>

            <h4>3. How We Use the Information</h4>
            <p>We use data to register/manage accounts, securely store & verify documents, generate
              hashes and verification codes, log activity for security, and communicate service
              updates. We do not sell, rent, or trade personal or organizational data.</p>

            <h4>4. How We Protect Your Information</h4>
            <p>
              Uploaded documents are encrypted at rest and in transit. Verification metadata and
              hashes are stored in MongoDB with access controls. Access to sensitive data is limited
              to authorized personnel and recorded in audit logs.
            </p>

            <h4>5. Data Sharing and Disclosure</h4>
            <p>We only disclose data when required by law, to prevent fraud or misuse, or to maintain
              platform security and integrity. We never share data for marketing without consent.</p>

            <h4>6. Data Retention</h4>
            <p>
              Documents and logs are retained while accounts are active or as required by your
              organization’s policy. Users may request data deletion by contacting the system
              administrator (see contact section).
            </p>

            <h4>7. Your Rights</h4>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or delete your
              data, and to withdraw consent for certain processing activities. Contact the
              administrator to exercise these rights.
            </p>

            <h4>8. Third-Party Services</h4>
            <p>
              When we use third-party services (cloud storage, email providers), those services have
              their own policies. We choose partners that meet strong security and compliance
              standards.
            </p>

            <h4>9. Changes to This Policy</h4>
            <p>We may update this policy periodically. Significant changes will be communicated by
              email or in-platform notices.</p>

            <h4>10. Contact Us</h4>
            <p>
              Questions or requests? Email <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
              or visit your organization’s admin contact page.
            </p>
          </article>
        ) : (
          <article className="policy-section">
            <h2>Terms of Service</h2>
            <p className="muted">Effective Date: <em>October 7,2025 G.C</em></p>

            <h4>1. Agreement to Terms</h4>
            <p>By registering for or using the <strong>Secure Document Verification System</strong>, you
              agree to be bound by these Terms of Service. If you do not agree, do not use the
              platform.
            </p>

            <h4>2. Description of Service</h4>
            <p>
              Our platform allows authorized organizations to upload, store, verify, and manage
              official documents. Each uploaded document receives a unique digital fingerprint
              (hash) and a QR/verification code to confirm authenticity.
            </p>

            <h4>3. Roles and Responsibilities</h4>
            <h4>a. Issuer Admin</h4>
            <ul>
              <li>Upload and register documents.</li>
              <li>Manage organization users and permissions.</li>
              <li>Revoke or update documents as required.</li>
              <li>Ensure documents uploaded are authentic.</li>
            </ul>

            <h4>b. Verifier</h4>
            <ul>
              <li>Verify documents by scanning QR codes or entering verification IDs.</li>
              <li>Use the system solely for legitimate verification purposes.</li>
            </ul>

            <h4>c. System Auditor</h4>
            <ul>
              <li>Review activity logs and reports.</li>
              <li>Monitor compliance and revoke access for misuse.</li>
            </ul>

            <h4>4. User Obligations</h4>
            <p>
              Users must provide accurate information, keep credentials secure, and not upload fake
              or altered documents. Misuse may lead to account suspension or legal action.
            </p>

            <h4>5. Data Ownership</h4>
            <p>Uploaded documents remain the property of the issuing organization. The platform is a
              secure custodian and verifier and does not claim ownership of your content.
            </p>

            <h4>6. Security</h4>
            <p>
              We implement reasonable security measures (encryption, logging, access control). No
              online service is risk-free; users should handle sensitive data responsibly.
            </p>

            <h4>7. Limitation of Liability</h4>
            <p>
              The platform is provided "as is." We are not liable for losses due to misuse,
              incorrect uploads, or circumstances beyond our control. Our liability is limited to
              the extent permitted by law.
            </p>

            <h4>8. Termination</h4>
            <p>
              We may suspend or terminate accounts for violations of these Terms or for security
              reasons. You may close your account by contacting your administrator — data removal
              follows the Data Retention policy.
            </p>

            <h4>9. Governing Law</h4>
            <p>
              These Terms are governed by the laws applicable to the organization operating the
              Platform. Resolve disputes via the organization’s designated process or local courts.
            </p>

            <h4>10. Contact</h4>
            <p>
              For legal or policy questions, contact <a href="mailto:support@yourdomain.com">support@securedocs.com</a>.
            </p>
          </article>
        )}
      </main>

      <footer className="policy-footer">
        <small>You can contact us using our email.Thank you</small>
      </footer>
    </div>
    </>
  );
}



