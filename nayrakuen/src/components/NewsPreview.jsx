import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './NewsPreview.css';

const NewsPreview = () => {
  const [news, setNews] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('https://backend-seven-nu-19.vercel.app/api/news');
        const sorted = res.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6);
        setNews(sorted);
      } catch (err) {
        console.error('Gagal mengambil data berita:', err);
      }
    };

    fetchNews();
  }, []);

  const scroll = (dir) => {
    const container = scrollRef.current;
    const amount = 300;
    container.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <section className="news-preview-section">

      <div className="news-preview-list" ref={scrollRef}>
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

      <div className="news-preview-bar">
        <div className="scroll-buttons">
          <button onClick={() => scroll('left')}>&lt;</button>
          <button onClick={() => scroll('right')}>&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default NewsPreview;
