import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './FanMessages.css';
import ImportReviewExcel from '../components/ImportReviewExcel';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const BASE_URL = 'https://backend-seven-nu-19.vercel.app/api/admin-pesan';

const AdminPesan = () => {
  const [reviews, setReviews] = useState([]);
  const [messages, setMessages] = useState([]);
  const [approvingId, setApprovingId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchReviews();
    fetchMessages();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/review-vc`);
      const sorted = (res.data || []).sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setReviews(sorted);
    } catch (err) {
      console.error("Gagal ambil review:", err);
      alert("Gagal mengambil data review.");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/fans-message`);
      setMessages(res.data || []);
    } catch (err) {
      console.error("Gagal ambil pesan fans:", err);
      alert("Gagal mengambil pesan fans.");
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Yakin ingin menghapus review ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/review-vc/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Gagal hapus review:", err);
      alert("Gagal menghapus review.");
    }
  };

  const handleApprove = async (id) => {
    setApprovingId(id);
    try {
      await axios.put(`${BASE_URL}/fans-message/approve/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Gagal setujui pesan:", err);
      alert("Gagal menyetujui pesan.");
    } finally {
      setApprovingId(null);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/fans-message/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Gagal hapus pesan fans:", err);
      alert("Gagal menghapus pesan fans.");
    }
  };

  const handleExportExcel = async () => {
    setIsExporting(true);
    try {
      const response = await fetch(`${BASE_URL}/export/nayfriends`);
      if (!response.ok) throw new Error('Gagal mengambil file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nayfriends_messages.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Gagal export Excel:', error);
      alert('Export gagal, coba lagi!');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Review <strong>Video Call</strong></h2>

        {/* Komponen Import Excel */}
        <ImportReviewExcel onSuccess={fetchReviews} />

        {reviews.length === 0 ? (
          <p>Belum ada review yang tersedia.</p>
        ) : (
          <table className="review-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Tanggal Upload</th>
                <th>Nama</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td>{r.created_at ? dayjs(r.created_at).format("D MMMM YYYY") : '-'}</td>
                  <td>{r.nama || '-'}</td>
                  <td className="message-cell">{r.review || '-'}</td>
                  <td>{r.rating || '-'}</td>
                  <td>
                    <button onClick={() => handleDeleteReview(r.id)} className="delete-btn">Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <hr style={{ margin: '2rem 0' }} />

        <h2>Pesan <strong>#NayFriends</strong></h2>

        <button
          onClick={handleExportExcel}
          className="export-btn"
          disabled={isExporting}
          style={{
            marginBottom: '1rem',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {isExporting ? 'Mengekspor...' : 'Export ke Excel'}
        </button>

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
                  <td>{msg.name || '-'}</td>
                  <td className="message-cell">{msg.message || '-'}</td>
                  <td>
                    {!msg.is_approved && (
                      <button
                        onClick={() => handleApprove(msg.id)}
                        className="approve-btn"
                        disabled={approvingId === msg.id}
                      >
                        {approvingId === msg.id ? 'Menyetujui...' : 'Setujui'}
                      </button>
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
