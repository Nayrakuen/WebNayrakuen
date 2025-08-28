import React, { useState, useEffect } from "react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Tidak ada auto-redirect ke dashboard, halaman utama selalu login

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const res = await axios.get(
        " https://backend-seven-nu-19.vercel.app/api/admin ",
        formData
      );
      // Asumsikan response: { token, user_id }
      setSuccess(true);
      setLoading(false);
      const now = Date.now();
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_id", res.data.user_id || formData.username);
      localStorage.setItem("token_expiry", (now + 60 * 60 * 1000).toString()); // 1 jam
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Username atau password salah.");
      setLoading(false);
    }
  };

  // Cek session kadaluarsa setiap kali komponen di-mount
  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem("token");
      const expiry = localStorage.getItem("token_expiry");
      if (token && expiry) {
        const now = Date.now();
        if (now > parseInt(expiry, 10)) {
          localStorage.removeItem("token");
          localStorage.removeItem("token_expiry");
          window.location.href = "/";
        }
      }
    };
    checkSession();
    const interval = setInterval(checkSession, 60000); // cek setiap 1 menit
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-wrapper-modern">
      <form className="login-card-modern" onSubmit={handleLogin}>
        <h2 className="login-title">Admin Login</h2>
        {error && <div className="login-error-modern">{error}</div>}
        {success && (
          <div className="login-success-modern">
            Login berhasil! Mengalihkan ke dashboard...
          </div>
        )}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            required
            disabled={loading || success}
            className="login-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            required
            disabled={loading || success}
            className="login-input"
          />
        </div>
        <button
          className="login-btn"
          type="submit"
          disabled={loading || success}
        >
          {loading ? (
            <span className="login-spinner" aria-label="Loading"></span>
          ) : (
            "Masuk"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
