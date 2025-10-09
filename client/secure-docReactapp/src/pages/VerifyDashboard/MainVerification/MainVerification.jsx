import React,{useState,useEffect} from 'react'
import './mainverifiy.css'
import { Link } from 'react-router-dom';
import StatusPieChart from '../../../components/Charts/StatusPieChart';
import axios from "axios"
const MainVerification = () => {
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
    <div className="verifydashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Secure verification</h2>
        <i class="bx bx-menu" id="btn"></i>
        <nav>
          <ul className="dash">
            <li>
              <Link to="/">
                <i class="bx  bx-dashboard-alt"></i>
                <span className="nav-item">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/verifyDashboard" className="active">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/verifyDocument">
                <i class="bx  bx-checklist"></i>
                <span className="nav-item">Verify Document</span>
              </Link>
            </li>
            <li>
              <Link to="/verifiylog">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">Verification Logs</span>
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
          <h3>Welcome,{userName || "verifier"}</h3>
          <div className="icons">
            <span>🔍</span>
            <span>👤</span>
            <span>🔔</span>
          </div>
        </header>
        <h1 className="dashboard-title">DASHBOARD</h1>
        <div className="stats">
          <div className="card">
            <h4>Total Verification Done</h4>
            <p className="value">4</p>
          </div>
          <div className="card">
            <h4>Valid Documents Found</h4>
            <p className="value">5</p>
          </div>{" "}
          <div className="card">
            <h4>Invalid Documents Found</h4>
            <p className="value">10</p>
          </div>
        </div>
        <div className="content-section">
          <div className="recent-docs">
            <button className="upload-btn">Recent Verification</button>
            <h4>Recent Document</h4>
            <table>
              {" "}
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Document A</td>
                  <td className="status verified">verified</td>
                  <td>2023-10-02</td>
                </tr>
                <tr>
                  <td>Document B</td>
                  <td className="status rejected">Invalid</td>
                  <td>2023-10-02</td>
                </tr>
                <tr>
                  <td>Document C</td>
                  <td className="status pending">Valid</td>
                  <td>2023-10-02</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="qucik-analysis card">
            <h4>Quick Analysis</h4>
            <div className="chart-placeholder">
              <StatusPieChart stats={stats} />
            </div>
            <ul className="legend">
              <li>
                <span className="dot verified"></span> 50% Verified
              </li>
              <li>
                <span className="dot rejected"></span> 25% Invalid
              </li>
              <li>
                <span className="dot pending"></span> 25% Valid
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainVerification
