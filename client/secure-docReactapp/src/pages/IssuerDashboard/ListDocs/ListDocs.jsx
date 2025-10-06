import React , {useEffect,useState,useMemo}from 'react'
import './listDocs.css'
const ListDocs = () => {
  
  const [documents, setDocuments] = useState([
    { title: "Document A", status: "Verified", date: "2023/10/02", type: "PDF" },
    { title: "Document B", status: "Pending", date: "2023/09/28", type: "Word" },
    { title: "Document C", status: "Verified", date: "2023/10/01", type: "PDF" },
  ]);
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
        new Date(doc.date) >= new Date(filters.dateRange.from)) &&
      (!filters.dateRange.to ||
        new Date(doc.date) <= new Date(filters.dateRange.to));

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
  return (
    <div className="list-container">
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
        <div className="content-wrapper">
          <section className="filters">
            <div className="filter-group">
              <h4>Type</h4>
              {["PDF", "DOCX", "XLSX"].map((type) => (
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
              {["Verified", "Rejected", "Pending"].map((status) => (
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
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.title}</td>
                    <td className={doc.status === "Verified" ? "verified" : ""}>
                      {doc.status}
                    </td>
                    <td>{doc.date}</td>
                    <td>{doc.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ListDocs
