import React from "react";
import "./Gallery.css";

import photo1 from "../assets/Photo1.png";
import photo2 from "../assets/Photo2.png";
import photo3 from "../assets/Photo3.png";
import photo4 from "../assets/Photo4.png";
import photo5 from "../assets/Photo5.png";
import photo6 from "../assets/Photo6.png";
import photo7 from "../assets/Photo7.png";
import photo8 from "../assets/Photo8.jpeg";
import photo9 from "../assets/Photo9.jpeg";

function Gallery() {
  return (
    <div className="gallery-wrapper">
      <div className="gallery-container">
        <h2 className="gallery-title" data-aos="fade-down">Gallery</h2>
        <div className="gallery-subtitle">
          <div className="setlist-bar"></div>
          <h4 className="gallery-heading">Digital Photobook</h4>
        </div>

        <div className="masonry-gallery">
          <div className="masonry-item" data-aos="zoom-in"><img src={photo1} alt="Photo1" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo4} alt="Photo4" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo7} alt="Photo7" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo2} alt="Photo2" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo3} alt="Photo3" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo5} alt="Photo5" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo6} alt="Photo6" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo8} alt="Photo8" /></div>
          <div className="masonry-item" data-aos="zoom-in"><img src={photo9} alt="Photo9" /></div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
