import React from 'react';
import Sidebar from '../components/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div className="dashboard-content">
        <h1>Dashboard Admin</h1>
        <p>Selamat datang di panel admin Nayrakuen. Gunakan menu di samping untuk mengelola konten.</p>

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
};

export default Dashboard;
