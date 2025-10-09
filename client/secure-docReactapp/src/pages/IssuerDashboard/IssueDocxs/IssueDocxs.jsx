import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './issuedocxs.css'
const IssueDocxs = () => {
    const [documents, setDocuments] = useState([]);
    const token = localStorage.getItem("token");

    const fetchDraftDocuments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/document", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const draftsOnly = res.data.filter((doc) => doc.status === "Draft");
        setDocuments(draftsOnly);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    const handleIssue = async (id) => {
      try {
        const res = await axios.patch(
          `http://localhost:3000/api/document/${id}/status`,
          { status: "Issued" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Document issued successfully!");
        fetchDraftDocuments(); // refresh list
      } catch (err) {
        console.error("Failed to issue document:", err);
      }
    };
    useEffect(() => {
      fetchDraftDocuments();
    }, []);
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
    <div className="Issuedocx-container">
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
              <Link to="/IssuedDocxs" className="actives">
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
        <h1 className="dashboard-title">Issue documents</h1>
        <h2>Issue Draft Documents</h2>
        <table className="issue-docs-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.title}</td>
                  <td className="status draft">{doc.status}</td>
                  <td>
                    {doc.dateOfIssue
                      ? new Date(doc.dateOfIssue).toLocaleDateString()
                      : "Invalid Date"}
                  </td>
                  <td>{doc.documentType || "—"}</td>
                  <td>
                    <button
                      className="issue-btn"
                      onClick={() => handleIssue(doc._id)}
                    >
                      ✅ Issue
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No draft documents available</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default IssueDocxs
