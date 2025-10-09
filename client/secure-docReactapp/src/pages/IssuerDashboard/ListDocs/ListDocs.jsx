import React , {useEffect,useState,useMemo}from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"
import './listDocs.css'
const ListDocs = () => {
  
  const [documents, setDocuments] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const fetchDocuments = async () => {
  try {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams();

    if (filters.type.length > 0) params.append("type", filters.type.join(","));
    if (filters.status.length > 0) params.append("status", filters.status.join(","));
    if (filters.dateRange.from) params.append("startDate", filters.dateRange.from);
    if (filters.dateRange.to) params.append("endDate", filters.dateRange.to);

    const res = await axios.get(`http://localhost:3000/api/document?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDocuments(res.data);
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};
const handleEdit = (id) => {
  // Example: navigate to edit page
  console.log("Edit document:", id);
  // navigate(`/edit-doc/${id}`);
};

const handleWithdraw = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:3000/api/document/${id}/status`,
      { status: "Revoked" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Document withdrawn successfully!");
    fetchDocuments(); // refresh list
  } catch (err) {
    console.error(err);
    alert("Failed to withdraw document.");
  }
};

const handleHistory = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      `http://localhost:3000/api/document/${id}/history`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSelectedHistory(res.data.history);
    
  } catch (err) {
    console.error(err);
    alert("Failed to fetch document history.");
  }
};

  const [filters, setFilters] = useState({
    type: [],
    status: [],
    dateRange: { from: "", to: "" },
  });
 const handleTypeChange = (type) => {
   setFilters((prev) => ({
     ...prev,
     type: prev.type.includes(type)
       ? prev.type.filter((t) => t !== type)
       : [...prev.type, type],
   }));
 };

 const handleStatusChange = (status) => {
   setFilters((prev) => ({
     ...prev,
     status: prev.status.includes(status)
       ? prev.status.filter((s) => s !== status)
       : [...prev.status, status],
   }));
 };

 const handleDateChange = (field, value) => {
   setFilters((prev) => ({
     ...prev,
     dateRange: {
       ...prev.dateRange,
       [field]: value,
     },
   }));
 };
 
  const filteredDocs = documents.filter((doc) => {
    const typeMatch =
      filters.type.length === 0 || filters.type.includes(doc.type);

    const statusMatch =
      filters.status.length === 0 || filters.status.includes(doc.status);

    const dateMatch =
      (!filters.dateRange.from ||
        new Date(doc.dateOfIssue) >= new Date(filters.dateRange.from)) &&
      (!filters.dateRange.to ||
        new Date(doc.dateOfIssue) <= new Date(filters.dateRange.to));

    return typeMatch && statusMatch && dateMatch;
  });

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
            //every time filter changes it automatically refershes the list from the backend
            useEffect(() => {
              fetchDocuments();
            }, [filters]);

  return (
    <div className="list-container">
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
              <Link to="/listDocs" className="actives">
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
        <h1 className="dashboard-title">List of docx</h1>
        <div className="content-wrapper">
          <section className="filters">
            <div className="filter-group">
              <h4>Type</h4>
              {["Transcript", "Certificate", "License"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    checked={filters.type.includes(type)}
                    onChange={() => handleTypeChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Status</h4>
              {[
                "Draft",
                "Issued",
                "Verified",
                "Rejected",
                "Revoked",
                "Expired",
                "Archived",
              ].map((status) => (
                <label key={status}>
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusChange(status)}
                  />
                  {status}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Date Range</h4>
              <label>
                From:
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                />
              </label>
              <label>
                To:
                <input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => handleDateChange("to", e.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="doc-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.length > 0 ? (
                  documents.map((doc, index) => (
                    <tr key={index}>
                      <td>{doc.title}</td>
                      <td
                        className={doc.status === "Verified" ? "verified" : ""}
                      >
                        {doc.status}
                      </td>
                      <td>{new Date(doc.dateOfIssue).toLocaleDateString()}</td>
                      <td>{doc.documentType}</td>
                      <td className="actions">
                        {(doc.status === "Draft" ||
                          doc.status === "Issued") && (
                          <button onClick={() => handleEdit(doc._id)}>
                            ✏️ Edit
                          </button>
                        )}
                        {doc.status !== "Revoked" && (
                          <button onClick={() => handleWithdraw(doc._id)}>
                            🚫 Withdraw
                          </button>
                        )}
                        <button onClick={() => handleHistory(doc._id)}>
                          📜 View History
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No documents found</td>
                  </tr>
                )}
              </tbody>
            </table>
             
      {selectedHistory && (
        <div className="history-modal">
          <h3>Document History</h3>
          {selectedHistory.length === 0 ? (
            <p>No history available</p>
          ) : (
            <ul>
              {selectedHistory.map((item, index) => (
                <li key={index}>
                  {item.action} by {item.user} on{" "}
                  {new Date(item.date).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setSelectedHistory(null)}>Close</button>
        </div>
      )}
          </section>
          
        </div>
      </main>
    </div>
  );
}

export default ListDocs
