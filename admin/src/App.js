import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ManageGallery from './pages/ManageGallery';
import ManageSchedule from './pages/ManageSchedule';
import AdminPesan from './pages/AdminPesan';
import AdminNews from './pages/AdminNews';
import AboutEditor from './pages/AboutEditor';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/gallery"
        element={<ManageGallery />}
      />
      <Route
        path="/schedule"
        element={<ManageSchedule />}
      />
      <Route
        path="/messages"
        element={<AdminPesan />}
      />
      <Route
        path="/news"
        element={<AdminNews />}
      />
      <Route
        path="/about-nayla"
        element={<AboutEditor />}
      />
    </Routes>
  );
}

export default App;
