import React, { useState } from "react";
import "./LoginPage.css";
import users from "./users.json";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const found = users.find(
        (u) =>
          u.username === formData.username && u.password === formData.password
      );
      if (found) {
        localStorage.setItem("token", "dummy-auth-token");
        window.location.href = "/dashboard";
      } else {
        setError("Username atau password salah.");
      }
      setLoading(false);
    }, 700);
  };

  return (
    <div className="login-wrapper-modern">
      <form className="login-card-modern" onSubmit={handleLogin}>
        <h2 className="login-title">Admin Login</h2>
        {error && <div className="login-error-modern">{error}</div>}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            required
            disabled={loading}
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
            disabled={loading}
            className="login-input"
          />
        </div>
        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
