import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Gallery.css';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [visibleNaylabu, setVisibleNaylabu] = useState(4);
  const [visiblePhotobook, setVisiblePhotobook] = useState(4);

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

  const loadMoreNaylabu = () => setVisibleNaylabu(prev => prev + 5);
  const loadMorePhotobook = () => setVisiblePhotobook(prev => prev + 5);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <h2 className="gallery-title" data-aos="fade-down">Gallery</h2>

        {/* Naylabu */}
        <div className="gallery-section">
          <div className="gallery-subtitle">
            <div className="setlist-bar"></div>
            <h4 className="gallery-heading">Naylabu</h4>
          </div>
          <div className="masonry-gallery">
            {naylabuImages.slice(0, visibleNaylabu).map((img, i) => (
              <div className="masonry-item" key={`naylabu-${i}`} data-aos="zoom-in">
                <img src={img.image_url} alt={`naylabu-${i}`} />
              </div>
            ))}
          </div>
          {visibleNaylabu < naylabuImages.length && (
            <p className="load-more-text" onClick={loadMoreNaylabu}>
              Lihat selengkapnya
            </p>
          )}
        </div>

        {/* Digital Photobook */}
        <div className="gallery-section">
          <div className="gallery-subtitle">
            <div className="setlist-bar"></div>
            <h4 className="gallery-heading">Digital Photobook</h4>
          </div>
          <div className="masonry-gallery">
            {photobookImages.slice(0, visiblePhotobook).map((img, i) => (
              <div className="masonry-item" key={`photo-${i}`} data-aos="zoom-in">
                <img src={img.image_url} alt={`photo-${i}`} />
              </div>
            ))}
          </div>
          {visiblePhotobook < photobookImages.length && (
            <p className="load-more-text" onClick={loadMorePhotobook}>
              Lihat selengkapnya
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
