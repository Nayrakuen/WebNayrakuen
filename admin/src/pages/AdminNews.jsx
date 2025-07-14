import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import NewsForm from '../components/NewsForm';
import './AdminNews.css';

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/news');
      setNewsList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Yakin hapus berita ini?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNews();
    } catch (err) {
      console.error(err);
      alert('Gagal hapus berita');
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="admin-news-container">
      <Sidebar />
      <div className="admin-news-content">
        <h2>Kelola Berita</h2>

        <div className="news-warning">
          <strong>Perhatian:</strong> Dilarang mengunggah konten yang mengandung unsur <strong>kekerasan</strong>, <strong>kebencian</strong>, <strong>pornografi</strong>, atau <strong>isu sensitif lainnya</strong>. Pelanggaran dapat menyebabkan pemblokiran akses dan dikenakan hukuman yang berlaku.
        </div>

        <NewsForm onSuccess={fetchNews} />

        <div>
          {newsList.map((news) => (
            <div key={news.id} className="news-item">
              <h3>{news.title}</h3>
              {news.image_url && (
                <img src={news.image_url} alt="gambar berita" />
              )}
              <p className="mt-2 whitespace-pre-line">{news.content}</p>
              <button onClick={() => handleDelete(news.id)}>Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
