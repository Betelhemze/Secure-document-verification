import React, {useState,useEffect}from 'react'
import axios from "../../../Axios/axiosInstance";
import { Link } from 'react-router-dom';
import "./upload.css";
const UploadDocx = () => {
  const [formData, setFormData] = useState({
    title: "",
    documentType: "",
    dateOfIssue: "",
    issuerReference: "",
    ownerName: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Token:", localStorage.getItem("token"));
    console.log("Submitting:", formData);

    try{

      const response = await axios.post("/document", formData);

      alert("Document uploaded successfully!");
      console.log("Uploaded document:", response.data.document);

      if (response.data.document.qrCode) {
        console.log("QR Code available!");
      }

      setFormData({
         title: "",
        documentType: "",
        dateOfIssue: "",
        issuerReference: "",
        ownerName: "",
      });
    }catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Failed to upload document.");
    }
  }
    useEffect(() => {
         const btn = document.getElementById("btn");
         const sidebar = document.querySelector(".sidebar");
    
         const handleToggle = () => {
           sidebar.classList.toggle("collapsed");
         };
    
         if (btn && sidebar) {
           btn.addEventListener("click", handleToggle);
         }
    
         return () => {
           if (btn) {
             btn.removeEventListener("click", handleToggle);
           }
         };
       }, []);
       const userName = localStorage.getItem("name");
  return (
    <div className="upload-container">
      <aside className="sidebar">
        <h2 className="logo">Secure verification</h2>
        <i class="bx bx-menu" id="btn"></i>
        <nav>
          <ul className="dash">
            <li>
              <Link to="/issuer">
                <i class="bx  bx-dashboard-alt"></i>
                <span className="nav-item">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/UploadDocx" className="actives">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Uploaded Document</span>
              </Link>
            </li>
            <li>
              <Link to="/listDocs">
                <i class="bx  bx-checklist"></i>
                <span className="nav-item">List of documents</span>
              </Link>
            </li>
            <li>
              <Link to="/issuerAnalytics">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">Analytics</span>
              </Link>
            </li>
            <li>
              <a href="#" className="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span className="logout-text">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h3>Welcome,{userName || "issuer"}</h3>
          <div className="icons">
            <span>🔍</span>
            <span>👤</span>
            <span>🔔</span>
          </div>
        </header>
        <h1 className="dashboard-title">UPLOAD DOCUMENT</h1>
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-left">
            <label>Document Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g Transcript"
            />

            <label>Document Type</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Certificate">Certificate</option>
              <option value="Transcript">Transcript</option>
              <option value="License">License</option>
            </select>
          </div>

          <div className="form-right">
            <label>Date of Issue</label>
            <input
              type="date"
              name="dateOfIssue"
              value={formData.dateOfIssue}
              onChange={handleChange}
            />

            <label>Issuer Reference</label>
            <input
              type="text"
              name="issuerReference"
              value={formData.issuerReference}
              onChange={handleChange}
              placeholder="enter refernce"
            />

            <label>Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Full name"
            />
            <button type="submit" className="submit-btn">
              submit
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UploadDocx
