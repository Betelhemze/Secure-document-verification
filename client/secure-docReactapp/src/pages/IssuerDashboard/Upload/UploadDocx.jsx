import React, {useEffect}from 'react'
import "./upload.css";
const UploadDocx = () => {
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
  return (
    <div className="upload-container">
      <aside className="sidebar">
        <h2 className="logo">Secure verification</h2>
        <i class="bx bx-menu" id="btn"></i>
        <nav>
          <ul className="dash">
            <li>
              <a href="#">
                <i class="bx  bx-dashboard-alt"></i>
                <span className="nav-item">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="actives">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Uploaded Document</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bx  bx-checklist"></i>
                <span className="nav-item">List of documents</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">Analytics</span>
              </a>
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
          <h3>Welcome,Issuer</h3>
          <div className="icons">
            <span>🔍</span>
            <span>👤</span>
            <span>🔔</span>
          </div>
        </header>
        <h1 className="dashboard-title">DASHBOARD</h1>
        <form className="upload-form">
          <div className="form-left">
            <label>Document Title</label>
            <input type="text" value="Transcript" />

            <label>Document Type</label>
            <select>
              <option>Certificate</option>
              <option>Transcript</option>
              <option>License</option>
            </select>
          </div>

          <div className="form-right">
            <label>Date of Issue</label>
            <input type="date" value="2025-10-02" />
            <label>Issuer Reference</label>
            <input type="password" value="************" />

            <label>Owner Name</label>
            <input type="text" placeholder="fullname" />
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
