import React,{useState,useEffect} from 'react'
import './userDoc.css'
const mockUsers = [
  {
    id: 1,
    name: "Institution A",
    role: "Issuer",
    status: "pending",
    email: "a@inst.com",
  },
  {
    id: 2,
    name: "Verifier B",
    role: "Verifier",
    status: "active",
    email: "b@verify.com",
  },
  {
    id: 3,
    name: "Admin C",
    role: "Admin",
    status: "deactivated",
    email: "c@admin.com",
  },
];
const UserDoc = () => {
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
    const [users, setUsers] = useState(mockUsers);
    const handleApprove = (id) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: "active" } : user
        )
      );
    };

    const handleSuspend = (id) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, status: "suspended" } : user
        )
      );
    };
  return (
    <div className="userdoc-container">
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
        <div className="user-doc-page">
          <h1>User Documentation</h1>

          <section className="user-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className={`status ${user.status}`}>{user.status}</td>
                    <td>
                      {user.status === "pending" && (
                        <button onClick={() => handleApprove(user.id)}>
                          Approve
                        </button>
                      )}
                      {user.status === "active" && (
                        <button onClick={() => handleSuspend(user.id)}>
                          Suspend
                        </button>
                      )}
                    </td>
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

export default UserDoc
