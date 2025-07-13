import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './FanMessages.css';

const AdminPesan = () => {
  const [reviews, setReviews] = useState([]);
  const [bulan, setBulan] = useState('');
  const [nama, setNama] = useState('');
  const [review, setReview] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchMessages();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin-pesan/review-vc');
      setReviews(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil review:", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin-pesan/fans-message');
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil pesan fans:", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!bulan || !nama || !review) return alert("Semua field wajib diisi");

    try {
      await axios.post('http://localhost:5000/api/admin-pesan/review-vc', {
        bulan, nama, review
      });
      setBulan('');
      setNama('');
      setReview('');
      fetchReviews();
    } catch (err) {
      console.error("❌ Gagal tambah review:", err);
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Yakin ingin menghapus review ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin-pesan/review-vc/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("❌ Gagal hapus review:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin-pesan/fans-message/approve/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("❌ Gagal setujui pesan:", err);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin-pesan/fans-message/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("❌ Gagal hapus pesan:", err);
    }
  };

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Review <strong>Video Call</strong></h2>

        <form className="schedule-form" onSubmit={handleReviewSubmit}>
          <label>Bulan</label>
          <input type="text" value={bulan} onChange={(e) => setBulan(e.target.value)} placeholder="Contoh: Juli 2025" required />
          <label>Nama</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
          <label>Review</label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={4} required></textarea>
          <button type="submit">Tambah Review</button>
        </form>

        <table className="review-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Bulan</th>
              <th>Nama</th>
              <th>Review</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td>{r.bulan}</td>
                <td>{r.nama}</td>
                <td className="message-cell">{r.review}</td>
                <td>
                  <button onClick={() => handleDeleteReview(r.id)} className="delete-btn">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0' }} />

        <h2>Pesan <strong>#NayFriends</strong></h2>

        {messages.length === 0 ? (
          <p>Belum ada pesan dari fans.</p>
        ) : (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Pesan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg.id}>
                  <td>{index + 1}</td>
                  <td>{msg.name}</td>
                  <td className="message-cell">{msg.message}</td>
                  <td>
                    {!msg.is_approved && (
                      <button onClick={() => handleApprove(msg.id)} className="approve-btn">✔️ Setujui</button>
                    )}
                    <button onClick={() => handleDeleteMessage(msg.id)} className="delete-btn">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPesan;
