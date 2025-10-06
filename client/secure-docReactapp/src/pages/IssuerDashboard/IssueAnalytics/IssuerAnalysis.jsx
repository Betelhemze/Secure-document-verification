import React, {useEffect} from 'react'
import UploadLineChart from '../../../components/Charts/UploadLineChart';
import StatusPieChart from '../../../components/Charts/StatusPieChart';

import './issueranalysis.css'
const IssuerAnalysis = () => {
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
    <div className="Ianalysis-container">
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
              <a href="#">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Uploaded Document</span>
              </a>
            </li>
            <li>
              <a href="#" className="actives">
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
        <h1 className="dashboard-title">List of docx</h1>

        <section className="stats-grid">
          <div className="card">
            <h4>Total Uploaded Document</h4>
            <p className="value">15</p>
          </div>
          <div className="card">
            <h4>Pending Verifications</h4>
            <p className="value">4</p>
          </div>
          <div className="card">
            <h4>Verified Documents</h4>
            <p className="value">8</p>
          </div>
        </section>

        <section className="charts-section">
          <div className="chart-box">
            <h4>Uploads per Month</h4>
            <div className="chart-placeholder">
              <UploadLineChart />
            </div>
          </div>
          <div className="chart-box">
            <h4>Quick Analysis</h4>
            <div className="chart-placeholder">
              <StatusPieChart />
            </div>
            <ul className="legend">
              <li>
                <span className="dot verified"></span> Verified:8
              </li>
              <li>
                <span className="dot pending"></span> Pending:4
              </li>
              <li>
                <span className="dot rejected"></span> Rejected:3
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default IssuerAnalysis
