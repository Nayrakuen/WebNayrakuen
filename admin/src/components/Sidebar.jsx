import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaImages,
  FaCalendarAlt,
  FaComments,
  FaSignOutAlt,
  FaNewspaper,
  FaBook
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { label: "Galeri", path: "/gallery", icon: <FaImages /> },
    { label: "Jadwal VC", path: "/schedule", icon: <FaCalendarAlt /> },
    { label: "Pesan", path: "/messages", icon: <FaComments /> },
    { label: "Berita", path: "/news", icon: <FaNewspaper /> },
    { label: "Narasi", path: "/about-nayla", icon: <FaBook /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Nayrakuen Admin</h2>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
        <button className="sidebar-link logout" onClick={handleLogout}>
          <span className="icon"><FaSignOutAlt /></span>
          <span className="label">Log Out</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
