import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get('https://backend-seven-nu-19.vercel.app/api/gallery')
      .then(res => {
        setGallery(res.data);
      })
      .catch(err => {
        console.error('Gagal ambil data galeri:', err);
      });
  }, []);

  const naylabuImages = gallery.filter(img => img.folder === 'Naylabu');
  const photobookImages = gallery.filter(img => img.folder === 'Digital Photobook');

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <h2 className="gallery-title" data-aos="fade-down">Gallery</h2>

        <div className="gallery-section">
          <div className="gallery-subtitle">
            <div className="setlist-bar"></div>
            <h4 className="gallery-heading">Naylabu</h4>
          </div>
          <div className="masonry-gallery">
            {naylabuImages.map((img, i) => (
              <div className="masonry-item" key={`naylabu-${i}`} data-aos="zoom-in">
                <img src={img.image_url} alt={`naylabu-${i}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-section">
          <div className="gallery-subtitle">
            <div className="setlist-bar"></div>
            <h4 className="gallery-heading">Digital Photobook</h4>
          </div>
          <div className="masonry-gallery">
            {photobookImages.map((img, i) => (
              <div className="masonry-item" key={`photo-${i}`} data-aos="zoom-in">
                <img src={img.image_url} alt={`photo-${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
