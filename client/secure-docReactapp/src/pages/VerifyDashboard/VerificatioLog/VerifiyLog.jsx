import React, {useState,useEffect} from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { Link } from 'react-router-dom';
import sample from '../../../assets/sample-doc.jpg'
import './VerifiyLog.css'
const VerifiyLog = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("all"); // all, verified, revoked
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token"); // if using auth
        const res = await axios.get("http://localhost:3000/api/documents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      }
    };
    fetchLogs();
  }, []);
const filteredLogs = logs
  .filter((doc) => {
    if (filter === "verified") return doc.status === "Verified";
    if (filter === "revoked") {
      // Revoked documents rejected by issuer
      const rejectedByIssuer = doc.history.some(
        (h) => h.action === "Rejected" && h.role === "Issuer"
      );
      return doc.status === "Revoked" && rejectedByIssuer;
    }
    // All: include verified or revoked-by-issuer
    const revokedByIssuer =
      doc.status === "Revoked" &&
      doc.history.some((h) => h.action === "Rejected" && h.role === "Issuer");
    return doc.status === "Verified" || revokedByIssuer;
  })
  .filter((doc) => doc.title.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => new Date(b.dateOfIssue) - new Date(a.dateOfIssue));
  

  // Search + Filter
  
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
    <div className="verifiylog-container">
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
              <Link to="/verifyDashboard">
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
              <Link to="/verifiylog" className="active">
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
          <h3>Welcome,Issuer</h3>
          <div className="icons">
            <span>🔍</span>
            <span>👤</span>
            <span>🔔</span>
          </div>
        </header>

        <div className="verification-logs">
          <h2>Verification Logs</h2>

          {/* Search + Filter */}
          <div className="filter-panel">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="revoked">Revoked</option>
            </select>
            
          </div>

          {/* Table */}
          <div className="logs-table">
            <h3>Recent Verifications</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date of Issue</th>
                  <th>Owner</th>
                  <th>Uploaded By</th>
                  <th>Last Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((doc) => {
                  const lastAction = doc.history[doc.history.length - 1];
                  return (
                    <tr key={doc._id}>
                      <td>{doc.title}</td>
                      <td>{doc.status}</td>
                      <td>{new Date(doc.dateOfIssue).toLocaleDateString()}</td>
                      <td>{doc.ownerName}</td>
                      <td>{doc.uploadedBy?.name || "N/A"}</td>
                      <td>
                        {lastAction
                          ? `${lastAction.action} by ${
                              lastAction.role || lastAction.user
                            }`
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          
        </div>
      </main>
    </div>
  );
}

export default VerifiyLog
