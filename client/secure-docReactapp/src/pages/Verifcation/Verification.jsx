import React ,{useState,useEffect} from 'react'
import { Html5QrcodeScanner } from "html5-qrcode";
import './verification.css'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
const Verification = () => {
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
  return (
    <div className="verify">
      <Navbar/>
      <h2>Verfiy Document</h2>
      <h4>Enter the document ID or scan the QR code<br/>
      to check authenticity
      </h4>
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
          {message && (
  <div className={`feedback ${status}`}>
    {message}
  </div>
 )}
        </div>
      </div>

  <Footer/>
    </div>
  );
};
  

export default Verification;
