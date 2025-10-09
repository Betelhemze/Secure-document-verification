import React, {useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import './styles.css'
const Mainboard = () => {
   const [recentDocs, setRecentDocs] = useState([]);
   const issuerId = localStorage.getItem("userId");
   console.log("Issuer ID from localStorage:", issuerId);

   useEffect(() => {
     const fetchRecentDocs = async () => {
       try {
         const res = await axios.get(
           `http://localhost:3000/api/analytics/recent/${issuerId}`,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
         );
         setRecentDocs(res.data);
       } catch (err) {
         console.error("Error fetching recent documents:", err);
       }
     };
     fetchRecentDocs();
   }, [issuerId]);

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
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Secure verification</h2>
        <i class="bx bx-menu" id="btn"></i>
        <nav>
          <ul className="dash">
            <li>
              <Link to="/issuer" className="active">
                <i class="bx  bx-dashboard-alt"></i>
                <span className="nav-item">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/UploadDocx">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Uploaded Document</span>
              </Link>
            </li>
            <li>
              <Link to="/IssuedDocxs">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Issue Document</span>
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
              <button className="logout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <span className="logout-text">Logout</span>
              </button>
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

        <h1 className="dashboard-title">DASHBOARD</h1>
        <div className="stats">
          <div className="card">
            <h4>Total Uploade Document</h4>
            <p className="value">4</p>
          </div>
          <div className="card">
            <h4>Pending Verification</h4>
            <p className="value">5</p>
          </div>{" "}
          <div className="card">
            <h4>Verified Documents</h4>
            <p className="value">10</p>
          </div>
        </div>
        <div className="content-section">
          <div className="recent-docs">
            <button className="upload-btn">Upload Document</button>
            <h4>Recent Document</h4>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDocs.length > 0 ? (
                  recentDocs.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.title}</td>
                      <td className={`status ${doc.status.toLowerCase()}`}>
                        {doc.status}
                      </td>
                      <td>{new Date(doc.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No recent documents</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="qucik-analysis card">
            <h4>Quick Analysis</h4>
            <div className="chart-placeholder">[chart Here]</div>
            <ul className="legend">
              <li>
                <span className="dot verified"></span> 50% Verified
              </li>
              <li>
                <span className="dot rejected"></span> 25% Rejected
              </li>
              <li>
                <span className="dot pending"></span> 25% Pending
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mainboard
