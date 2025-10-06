import React, {useState,useEffect} from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";
import sample from '../../../assets/sample-doc.jpg'
import './VerifiyLog.css'
const VerifiyLog = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [previewDoc, setPreviewDoc] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const logs = [
    {
      title: "Document A",
      status: "verified",
      date: "2025-10-02",
      verifier: "abeba",
      history: [
        {
          time: "2025-10-02 10:30",
          action: "Uploaded",
          note: "Initial upload",
        },
        {
          time: "2025-10-02 11:15",
          action: "Verified",
          note: "Approved by Abeba",
        },
      ],
    },
    {
      title: "Document B",
      status: "invalid",
      date: "2025-10-02",
      verifier: "kebede",
      history: [
        {
          time: "2025-10-02 12:00",
          action: "Uploaded",
          note: "Wrong format",
        },
        {
          time: "2025-10-02 12:30",
          action: "Rejected",
          note: "Invalid certificate",
        },
      ],
    },
    {
      title: "Document C",
      status: "valid",
      date: "2025-10-02",
      verifier: "marta",
      history: [
        {
          time: "2025-10-02 09:00",
          action: "Uploaded",
          note: "Submitted by Marta",
        },
        {
          time: "2025-10-02 09:45",
          action: "Validated",
          note: "Marked as valid",
        },
      ],
    },
  ];

  // Search + Filter
  const filteredLogs = logs.filter(
    (log) =>
      (filter === "all" || log.status === filter) &&
      log.title.toLowerCase().includes(search.toLowerCase())
  );

  // Export as CSV
  const exportCSV = () => {
    const csvContent = [
      ["Title", "Status", "Date", "Verifier"],
      ...logs.map((l) => [l.title, l.status, l.date, l.verifier]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "verification_logs.csv";
    link.click();
  };
  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Verification Logs", 14, 15);

    const tableData = logs.map((l) => [l.title, l.status, l.date, l.verifier]);
    doc.autoTable({
      head: [["Title", "Status", "Date", "Verifier"]],
      body: tableData,
      startY: 20,
    });

    doc.save("verification_logs.pdf");
  };

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
              <a href="#">
                <i class="bx  bx-checklist"></i>
                <span className="nav-item">Verify Document</span>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                <i class="bx  bx-chart-line"></i>
                <span className="nav-item">Verification Logs</span>
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
              <option value="invalid">Invalid</option>
              <option value="valid">Valid</option>
            </select>
            <button onClick={exportCSV}>Export CSV</button>
            <button onClick={exportPDF}>Export PDF</button>
          </div>

          {/* Document Preview */}
          <div className="document-preview">
            <h3>Document Preview</h3>
            <img
              src={sample}
              alt="Preview"
              onClick={() => setPreviewDoc("/sample-doc.jpg")}
            />
          </div>

          {/* Table */}
          <div className="logs-table">
            <h3>Recent Verifications</h3>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Verifier</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{log.title}</td>
                      <td>{log.status}</td>
                      <td>{log.date}</td>
                      <td>{log.verifier}</td>
                      <td>
                        <button
                          className="history-btn"
                          onClick={() =>
                            setExpandedRow(expandedRow === i ? null : i)
                          }
                        >
                          {expandedRow === i ? "Hide History" : "View History"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === i && (
                      <tr className="audit-row">
                        <td colSpan="5">
                          <div className="audit-trail">
                            <h4>Audit Trail</h4>
                            <ul>
                              {log.history.map((h, j) => (
                                <li key={j}>
                                  <strong>{h.time}</strong> – {h.action} (
                                  {h.note})
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {previewDoc && (
            <div className="modal" onClick={() => setPreviewDoc(null)}>
              <div className="modal-content">
                <img src={sample} alt="Full Preview" />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VerifiyLog
