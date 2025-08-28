import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  useEffect(() => {
    document.title = "Nayrakuen - Dashboard Admin";
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome Admin</h1>
        <p>
          Selamat datang di panel admin Nayrakuen. Gunakan menu di samping untuk
          mengelola konten.
        </p>
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Jumlah Jadwal VC</h3>
            <p>12</p>
          </div>
          <div className="dashboard-card">
            <h3>Pesan Fans</h3>
            <p>37</p>
          </div>
          <div className="dashboard-card">
            <h3>Galeri</h3>
            <p>128 foto</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
