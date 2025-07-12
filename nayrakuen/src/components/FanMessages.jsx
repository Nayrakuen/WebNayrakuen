import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FanMessages.css";
import bgImage from "../assets/bg.png";

const FanMessages = () => {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ from: "", message: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/fans-message");
      setMessages(res.data.reverse());
    } catch (err) {
      console.error("❌ Gagal ambil pesan:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.message.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/fans-message", {
        name: formData.from,
        message: formData.message
      });

      setFormData({ from: "", message: "" });
      setShowForm(false);
      fetchMessages();
    } catch (err) {
      console.error("❌ Gagal kirim pesan:", err);
    }
  };

  return (
    <div className="fan-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <h3 className="fan-title">Perasaan <strong>#NayFriends</strong> setelah bertemu Nayla</h3>

      <button className="fan-float-button" onClick={() => setShowForm(true)}>
        Kirim Pesan untuk Nayla
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <h2>Kirim Pesan untuk Nayla</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="from">Nama Kamu</label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Pesan</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit">Kirim</button>
                <button type="button" onClick={() => setShowForm(false)}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {[0, 1, 2].map((rowIndex) => (
        <div
          key={rowIndex}
          className={`fan-row ${rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"}`}
        >
          <div className="fan-row-content">
            {[...messages, ...messages].map((msg, i) => (
              <div key={`${rowIndex}-${i}`} className="fan-card">
                <p className="fan-from">From: {msg.name}</p>
                <p className="fan-message">
                  <strong>“</strong>{msg.message}<strong>”</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FanMessages;
