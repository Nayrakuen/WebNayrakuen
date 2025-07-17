import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './AdminNews.css';

function AboutEditor() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/about-nayla')
      .then((res) => {
        const formattedContent = (res.data.content || '').replace(/\\n/g, '\n');
        setContent(formattedContent);
      })
      .catch((err) => console.error('Gagal ambil narasi:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentWithEscapedNewlines = content.replace(/\n/g, '\\n');
    axios
      .post('http://localhost:5000/api/about-nayla', { content: contentWithEscapedNewlines })
      .then(() => setMessage('Narasi berhasil disimpan'))
      .catch(() => setMessage('Gagal menyimpan narasi'));
  };

  return (
    <div className="admin-news-container">
      <Sidebar />
      <div className="admin-news-content">
        <h2>Kelola Tentang Nayla</h2>
        <form className="news-form" onSubmit={handleSubmit}>
          <label htmlFor="content">Narasi</label>
          <textarea
            id="content"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis narasi tentang Nayla di sini..."
            style={{ whiteSpace: 'pre-line' }}
          />
          <button type="submit">Simpan</button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AboutEditor;
