import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './NewsPreview.css';

const NewsPreview = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/news');
        const sorted = res.data
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);
        setNews(sorted);
      } catch (err) {
        console.error('Gagal mengambil data berita:', err);
      }
    };

    fetchNews();
  }, []);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <section className="news-preview-section">
      <div className="news-preview-list">
        {news.map((item) => (
          <Link to={`/news/${item.id}`} key={item.id} className="news-preview-card">
            {item.image_url && (
              <img src={item.image_url} alt="thumbnail" className="news-preview-img" />
            )}
            <div className="news-preview-info">
              <h3 className="news-preview-headline">{item.title}</h3>
              <p className="news-preview-date">{formatDateTime(item.created_at)}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="news-preview-more">
        <Link to="/berita" className="news-preview-link">Lihat Semua Berita</Link>
      </div>
    </section>
  );
};

export default NewsPreview;
