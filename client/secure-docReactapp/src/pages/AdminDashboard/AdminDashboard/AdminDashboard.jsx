import React,{useState,useEffect} from 'react'
import './admindashboard.css'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import StatusPieChart from "../../../components/Charts/StatusPieChart";

    
const AdminDashboard = () => {
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
    <div className="admin-container">
      <aside className="sidebar">
        <h2 className="logo">Secure verification</h2>
        <i class="bx bx-menu" id="btn"></i>
        <nav>
          <ul className="dash">
            <li>
              <a href="#">
                <i class="bx  bx-dashboard-alt"></i>
                <span className="nav-item">Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bx  bx-checklist"></i>
                <span className="nav-item">Verification Log</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">User documntaion</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">Approve/Reject Issuer</span>
              </a>
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
          <h3>Welcome,Admin</h3>
          <div className="icons">
            <span>🔍</span>
            <span>👤</span>
            <span>🔔</span>
          </div>
        </header>
        <h1 className="dashboard-title">DASHBOARD</h1>
        <div className="stats">
          <div className="card">
            <h4>Total Issuer Registered</h4>
            <p className="value">4</p>
          </div>
          <div className="card">
            <h4>Pending approval</h4>
            <p className="value">5</p>
          </div>{" "}
          <div className="card">
            <h4>Total Verified Documents</h4>
            <p className="value">10</p>
          </div>
        </div>
        <div className="content-section">
          <div className="recent-docs">
            <h4>Pending Issuer Requests</h4>
            <table>
              {" "}
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th>Request Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Document A</td>
                  <td className="status verified">verified</td>
                  <td>a@gail.com</td>
                  <td>2023-10-02</td>
                </tr>
                <tr>
                  <td>Document B</td>
                  <td className="status rejected">Invalid</td>
                  <td>a@gail.com</td>
                  <td>2023-10-02</td>
                </tr>
                <tr>
                  <td>Document C</td>
                  <td className="status pending">Valid</td>
                  <td>a@gail.com</td>
                  <td>2023-10-02</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="qucik-analysis card">
            <h4>Quick Analysis</h4>
            <div className="chart-placeholder">
              <StatusPieChart />
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

export default AdminDashboard
