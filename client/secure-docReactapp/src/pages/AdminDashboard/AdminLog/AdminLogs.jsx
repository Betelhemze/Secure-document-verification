import React,{useState,useEffect} from 'react'
import './adminLog.css'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialLogs = [
  {
    verifier: "employer",
    docId: "DOC-001",
    status: "verified",
    date: "2023-10-02T10:30",
  },
  {
    verifier: "admin",
    docId: "DOC-002",
    status: "invalid",
    date: "2023-10-03T14:45",
  },
  {
    verifier: "issuer",
    docId: "DOC-003",
    status: "valid",
    date: "2023-10-04T09:15",
  },
];
const AdminLogs = () => {
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
               const [logs, setLogs] = useState(initialLogs);
               const [filters, setFilters] = useState({
                 status: "",
                 type: "",
                 from: "",
                 to: "",
               });

               const filteredLogs = logs.filter((log) => {
                 const date = new Date(log.date);
                 const from = filters.from ? new Date(filters.from) : null;
                 const to = filters.to ? new Date(filters.to) : null;

                 return (
                   (!filters.status || log.status === filters.status) &&
                   (!filters.type || log.docId.includes(filters.type)) &&
                   (!from || date >= from) &&
                   (!to || date <= to)
                 );
               });
               const exportCSV = () => {
                 const csvContent = [
                   ["Verifier", "Document ID", "Status", "Date & Time"],
                   ...filteredLogs.map((log) => [
                     log.verifier,
                     log.docId,
                     log.status,
                     log.date,
                   ]),
                 ]
                   .map((row) => row.join(","))
                   .join("\n");

                 const blob = new Blob([csvContent], { type: "text/csv" });
                 const link = document.createElement("a");
                 link.href = URL.createObjectURL(blob);
                 link.download = "verification_logs.csv";
                 link.click();
               };
             const exportPDF = () => {
               const doc = new jsPDF();
               doc.text("Verification Logs", 14, 20);
               autoTable(doc, {
                 head: [["Verifier", "Document ID", "Status", "Date & Time"]],
                 body: filteredLogs.map((log) => [
                   log.verifier,
                   log.docId,
                   log.status,
                   log.date,
                 ]),
               });
               doc.save("verification_logs.pdf");
             };   
  return (
    <div className="adminlog-container">
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
              <a href="#">
                <i class="bx  bx-file-plus"></i>
                <span className="nav-item">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="active">
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
        <h1 className="dashboard-title">Verification Log</h1>
        <div className="log-layout">
          <div className="filters-panel">
            <label>
              Status:
              <select
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="verified">Verified</option>
                <option value="valid">Valid</option>
                <option value="invalid">Invalid</option>
              </select>
            </label>
            <label>
              Document Type:
              <input
                type="text"
                placeholder="e.g. DOC"
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              />
            </label>{" "}
            <label>
              From:
              <input
                type="date"
                onChange={(e) =>
                  setFilters({ ...filters, from: e.target.value })
                }
              />
            </label>
            <label>
              To:
              <input
                type="date"
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              />
            </label>
            <div className="export-buttons">
              <button onClick={exportCSV}>Export CSV</button>
              <button onClick={exportPDF}>Export PDF</button>
            </div>
          </div>
          <div className="table-panel">
            <table>
              <thead>
                <tr>
                  <th>Verifier</th>
                  <th>Document ID</th>
                  <th>Status</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.verifier}</td>
                    <td>{log.docId}</td>
                    <td className={`status ${log.status}`}>{log.status}</td>
                    <td>{new Date(log.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLogs
