import React, { useEffect, useState } from "react";
import "./FanMessages.css";
import bgImage from "../assets/bg.png";
import { FaStar, FaRegStar } from "react-icons/fa";
import reviewsData from "../data/review.json";

const FanMessages = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ from: "", message: "", rating: 0 });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setReviews(reviewsData.reverse());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.from.trim() || !formData.message.trim() || formData.rating === 0) return;

    const newMessage = {
      nama: formData.from,
      review: formData.message,
      rating: formData.rating,
    };

    setReviews((prev) => [newMessage, ...prev]);

    const savedMessages = JSON.parse(localStorage.getItem("fansMessages") || "[]");
    localStorage.setItem("fansMessages", JSON.stringify([newMessage, ...savedMessages]));

    setFormData({ from: "", message: "", rating: 0 });
    setShowForm(false);
  };

  return (
    <div className="fan-section" style={{ backgroundImage: `url(${bgImage})` }}>
      <h3 className="fan-title">
        Perasaan <strong>#NayFriends</strong> setelah bertemu Nayla
      </h3>

      <button className="fan-float-button" onClick={() => setShowForm(true)}>
        Kirim Fan letter untuk Nayla
      </button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <h2>Pesan untuk Nayla</h2>
            <p className="note">Pesan ini akan langsung dikirim dan dibaca oleh Nayla Suji.</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor="from">Nama Kamu</label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                placeholder="Contoh: Adit"
              />

              <label htmlFor="message">Pesanmu</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tulis pesan hangatmu setelah bertemu Nayla..."
                rows={4}
              />

              <div className="modal-buttons">
                <button type="submit">Kirim</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {[0, 1].map((rowIndex) => (
        <div
          key={rowIndex}
          className={`fan-row ${rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"}`}
        >
          <div className="fan-row-content">
            {reviews.map((msg, i) => (
              <div key={`${rowIndex}-${i}`} className="fan-card">
                <p className="fan-from">From: {msg.nama}</p>
                <p className="fan-message">
                  <strong>“</strong>
                  {msg.review}
                  <strong>”</strong>
                </p>
                <div className="fan-rating">
                  {[1, 2, 3, 4, 5].map((num) =>
                    num <= msg.rating ? (
                      <FaStar key={num} className="star filled" />
                    ) : (
                      <FaRegStar key={num} className="star" />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FanMessages;
