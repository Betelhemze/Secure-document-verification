import React, {useState,useEffect} from 'react'
import { Html5QrcodeScanner } from "html5-qrcode";
import './verifiyDocument.css'
const VerifiyDocument = () => {
    const [docId, setDocId] = useState("");
      const [scanMode, setScanMode] = useState(false);
      const [scanResult, setScanResult] = useState("");
      const [status, setStatus] = useState(""); // "success", "error", "loading"
      const [message, setMessage] = useState("");
    
       const handleVerify = async () => {
         console.log("Verifying Document ID:", docId);
         // Add your backend verification logic here
    
         if (!docId.trim()) {
           setStatus("error");
           setMessage("Please enter a valid Document ID.");
           return;
         }
    
         setStatus("loading");
         setMessage("Verifying document...");
    
         try {
           // Simulate API call
           await new Promise((res) => setTimeout(res, 1500));
    
           // Replace with actual verification logic
           const isValid = docId === "DOC123456"; // Example condition
    
           if (isValid) {
             setStatus("success");
             setMessage("✅ Document is authentic.");
           } else {
             setStatus("error");
             setMessage("❌ Document not found or invalid.");
           }
         } catch (err) {
           setStatus("error");
           setMessage("Something went wrong. Please try again.");
         }
       };
        useEffect(() => {
        if (scanMode) {
          const scanner = new Html5QrcodeScanner("qr-reader", {
            fps: 10,
            qrbox: 250,
          });
    
          scanner.render(
            (decodedText) => {
              setScanResult(decodedText);
              setScanMode(false);
              scanner.clear();
            },
            (error) => {
              console.warn("QR Scan Error:", error);
            }
          );
    
          return () => scanner.clear();
        }
      }, [scanMode]);
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
    <div className="verifydoc-container">
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
                <span className="nav-item">Verify Document</span>
              </a>
            </li>
            <li>
              <a href="#">
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

        <h1 className="dashboard-title">Verifiy Document</h1>
        <div className="verify-content">
          <div className="verify-left">
            <label htmlFor="docId">Enter Document ID</label>
            <input
              type="text"
              id="docId"
              value={docId}
              onChange={(e) => setDocId(e.target.value)}
              placeholder="e.g. DOC123456"
            />
            <button onClick={handleVerify}>Verify Document</button>
          </div>
          <div className="verify-right">
            {!scanMode ? (
              <>
                <div className="qr-icon">📷</div>
                <button onClick={() => setScanMode(true)}>Scan QR Code</button>
              </>
            ) : (
              <div className="scanner-wrapper">
                <div id="qr-reader" />
                <button onClick={() => setScanMode(false)}>Cancel</button>
              </div>
            )}
            {scanResult && <p>Scanned Result: {scanResult}</p>}
            {message && <div className={`feedback ${status}`}>{message}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifiyDocument
