import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await axios.get(`https://backend-seven-nu-19.vercel.app/api/news/${id}`);
        setNews(res.data);
      } catch (err) {
        console.error('Gagal mengambil detail berita:', err);
        navigate('/');
      }
    };

    const fetchAllNews = async () => {
      try {
        const res = await axios.get(`https://backend-seven-nu-19.vercel.app/api/news`);
        const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setAllNews(sorted.slice(0, 5));
      } catch (err) {
        console.error('Gagal mengambil daftar berita:', err);
      }
    };

    fetchNewsDetail();
    fetchAllNews();
  }, [id, navigate]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!news) return <div className="news-detail-loading">Memuat...</div>;

  return (
    <div className="news-detail-layout responsive-order">
      <main className="news-detail-main">
        <div className="news-detail-card">
          <h1 className="news-detail-title">{news.title}</h1>
          <p className="news-detail-date">
            {formatDate(news.created_at)}, {formatTime(news.created_at)}
          </p>
          {news.image_url && (
            <img src={news.image_url} alt="gambar berita" className="news-detail-img" />
          )}
          <div className="news-detail-content">
            {news.content.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </div>
      </main>

      <aside className="news-sidebar">
        <h2>NEWS</h2>
        {allNews.map((item) => (
          <div key={item.id} className="news-sidebar-item">
            <Link to={`/news/${item.id}`} className="news-sidebar-title">
              {item.title}
            </Link>
            <p className="news-sidebar-date">{formatDate(item.created_at)}</p>
            <hr />
          </div>
        ))}
        <Link to="/berita" className="news-sidebar-button">Lihat Selengkapnya</Link>
      </aside>
    </div>
  );
};

export default NewsDetail;
