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

  const formatNewsContent = (text) => {
    if (!text) return null;

    const lines = text.trim().split('\n').map(line => line.trim());
    const paragraphs = [];
    let tempPara = [];

    for (const line of lines) {
      if (line === '') {
        if (tempPara.length > 0) {
          paragraphs.push(tempPara.join(' '));
          tempPara = [];
        }
      } else {
        tempPara.push(line);
      }
    }

    if (tempPara.length > 0) {
      paragraphs.push(tempPara.join(' '));
    }

    return (
      <>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="news-paragraph">{para}</p>
        ))}
      </>
    );
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
              <h2 className="news-title">{news.title}</h2>
              {news.image_url && (
                <img src={news.image_url} alt="gambar berita" />
              )}
              <div className="news-content-text">
                {formatNewsContent(news.content)}
              </div>
              <button className="delete-btn" onClick={() => handleDelete(news.id)}>Hapus</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
