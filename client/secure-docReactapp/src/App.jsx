import { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/Hero/Hero.jsx";
import Services from "./components/Services/Services.jsx";
import Process from "./components/Process/Process.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import LoginSignup from './components/LoginSignup/LoginSignup.jsx'
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/LoginSignup/PrivateRoute";
import Verification from "./pages/Verifcation/Verification.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Main from './pages/IssuerDashboard/Main/Mainboard.jsx'
import UploadDocx from './pages/IssuerDashboard/Upload/UploadDocx.jsx'
import ListDocs from "./pages/IssuerDashboard/ListDocs/ListDocs.jsx";
import IssuerAnalysis from "./pages/IssuerDashboard/IssueAnalytics/IssuerAnalysis.jsx";
import MainVerification from './pages/VerifyDashboard/MainVerification/MainVerification.jsx'
import VerifiyDocument from "./pages/VerifyDashboard/VerifiyDocument/VerifiyDocument.jsx";
import VerifiyLog from "./pages/VerifyDashboard/VerificatioLog/VerifiyLog.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard/AdminDashboard.jsx";
import AdminLogs from "./pages/AdminDashboard/AdminLog/AdminLogs.jsx";
import UserDoc from "./pages/AdminDashboard/UserDocs/UserDoc.jsx";
import SecureDocsPolicy from "./components/Terms/privacypolicy.jsx";
import AboutUs from "./components/Aboutus/aboutus.jsx";


function App() {
  return (
    <>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/issuer" element={<Main />} />
        <Route path="/UploadDocx" element={<UploadDocx />} />
        <Route path="/listDocs" element={<ListDocs />} />
        <Route path="/issuerAnalytics" element={<IssuerAnalysis />} />
        <Route path="/verifyDashboard" element={<MainVerification />} />
        <Route path="/verifyDocument" element={<VerifiyDocument />} />
        <Route path="/verifiylog" element={<VerifiyLog />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminlogs" element={<AdminLogs />} />
        <Route path="/userDocumentaion" element={<UserDoc />} />
        <Route path="/policies" element={<SecureDocsPolicy />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
