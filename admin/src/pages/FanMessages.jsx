import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './FanMessages.css';

const FanMessages = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/fans-message');
      setMessages(res.data);
    } catch (err) {
      console.error("❌ Gagal ambil pesan fans:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) return alert("Nama dan pesan wajib diisi");

    try {
      await axios.post('http://localhost:5000/api/fans-message', { name, message });
      setName('');
      setMessage('');
      fetchMessages();
    } catch (err) {
      console.error("❌ Gagal simpan pesan:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/fans-message/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("❌ Gagal hapus pesan:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Pesan <strong>#NayFriends</strong></h2>

        <form className="schedule-form" onSubmit={handleSubmit}>
          <label>Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Pesan</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          ></textarea>

          <button type="submit">Kirim Pesan</button>
        </form>

        {messages.length === 0 ? (
          <p>Belum ada pesan.</p>
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
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="delete-btn"
                    >
                      Hapus
                    </button>
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

export default FanMessages;
