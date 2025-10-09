import React, {useEffect, useState} from 'react'
import UploadLineChart from '../../../components/Charts/UploadLineChart';
import StatusPieChart from '../../../components/Charts/StatusPieChart';
import { Link } from 'react-router-dom';
import axios from "axios";

import './issueranalysis.css'
const IssuerAnalysis = () => {
  

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
  });
  const [monthlyUploads, setMonthlyUploads] = useState([]);
  const issuerId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!issuerId || !token) {
      console.warn("Missing issuerId or token. Skipping fetch.");
      return;
    }
    const fetchStats = async () => {

      try {
        
        const baseUrl = "http://localhost:3000/api";

        const [totalRes, pendingRes, verifiedRes, monthlyRes] =
          await Promise.all([
            axios.get(`${baseUrl}/analytics/total/${issuerId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseUrl}/analytics/pending/${issuerId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseUrl}/analytics/verified/${issuerId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${baseUrl}/analytics/uploads/monthly/${issuerId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        console.log("Total response:", totalRes.data); // ✅ Now it will run

        setStats({
          total: totalRes.data.total,
          pending: pendingRes.data.pending,
          verified: verifiedRes.data.verified,
        });
        setMonthlyUploads(
          Array.isArray(monthlyRes.data) ? monthlyRes.data : []
        );
        console.log("monthlyUploads state:", monthlyUploads);
      } catch (err) {
        console.error(err);
        setMonthlyUploads([]); // prevent chart from breaking
      }
    };
    fetchStats();
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
    <div className="Ianalysis-container">
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
              <Link to="/issuerAnalytics" className="actives">
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
        <h1 className="dashboard-title">Issued Analytics</h1>

        <section className="stats-grid">
          <div className="card">
            <h4>Total Uploaded Document</h4>
            <p className="value">{stats.total}</p>
          </div>
          <div className="card">
            <h4>Pending Verification</h4>
            <p className="value">{stats.pending}</p>
          </div>
          <div className="card">
            <h4>Verified Documents</h4>
            <p className="value">{stats.verified}</p>
          </div>
        </section>

        <section className="charts-section">
          <div className="chart-box">
            <h4>Uploads per Month</h4>
            <div className="chart-placeholder">
              <UploadLineChart data={monthlyUploads} />
            </div>
          </div>
          <div className="chart-box">
            <h4>Quick Analysis</h4>
            <div className="chart-placeholder">
              <StatusPieChart stats={stats} />
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
