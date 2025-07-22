import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EventPage.css";
import posterImg from "../assets/Poster.jpeg";
import memory1 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250720_1.jpg";
import memory2 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250720_2.jpg";
import memory3 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_3.jpg";
import memory4 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_4.jpg";

const EventPage = () => {
  const [showFullText, setShowFullText] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const toggleText = () => setShowFullText(!showFullText);
  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <h2 className="event-heading" data-aos="fade-down">Spesial Event</h2>

        <div className="event-content" data-aos="fade-up">
          <div className="event-title">
            <span className="event-line" />
            <h3>Happiness on Naylalaland17</h3>
          </div>

          <div className="event-body">
            <img src={posterImg} alt="Poster Event" className="event-poster" />
            <div className="event-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                tincidunt elit quis risus facilisis maximus. Pellentesque ut
                malesuada nibh, eu mollis purus. Duis lobortis dolor viverra
                lacus iaculis congue. Sed sagittis malesuada aliquam.
              </p>

              {showFullText && (
                <>
                  <p>
                    Integer ac turpis varius, pharetra libero ut, fermentum
                    velit. Sed pulvinar placerat velit, vel pellentesque elit
                    ornare non. Pellentesque sed turpis massa. Praesent sit amet
                    mollis arcu, ac tristique magna. In at magna ac nisi viverra
                    interdum eget sit amet justo.
                  </p>
                  <p>
                    Integer ac turpis varius, pharetra libero ut, fermentum
                    velit. Sed pulvinar placerat velit, vel pellentesque elit
                    ornare non. Pellentesque sed turpis massa. Praesent sit amet
                    mollis arcu, ac tristique magna. In at magna ac nisi viverra
                    interdum eget sit amet justo.
                  </p>
                </>
              )}

              <button className="see-more-btn" onClick={toggleText}>
                {showFullText ? "Tutup" : "Lihat Selengkapnya"}
              </button>
            </div>
          </div>
        </div>

        <div className="gallery-section" data-aos="fade-up">
          <div className="gallery-subtitle">
            <div className="setlist-bar"></div>
            <h4 className="gallery-heading">Memories</h4>
          </div>
          <div className="masonry-gallery">
            {[memory1, memory2, memory3, memory4].map((img, i) => (
              <div className="masonry-item" key={i} onClick={() => openModal(img)}>
                <img src={img} alt={`Memory ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <img src={modalImage} alt="Full view" />
          <span className="close-button" onClick={closeModal}>&times;</span>
        </div>
      )}
    </div>
  );
};

export default EventPage;
