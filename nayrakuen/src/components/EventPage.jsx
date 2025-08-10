import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EventPage.css";

import poster1 from "../assets/Poster.jpeg";
import poster2 from "../assets/Poster1.jpeg";
import poster3 from "../assets/Poster2.jpeg";
import memory1 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250720_1.jpg";
import memory2 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250720_2.jpg";
import memory3 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_3.jpg";
import memory4 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_4.jpg";
import memory5 from "../assets/GtzQtCSagAAMw97.jpeg";
import memory6 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_2.jpg";
import memory7 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_5.jpg";
import memory8 from "../assets/LINE_ALBUM_Nayla's Birthday Archiv_250723_1.jpg";
import memory9 from "../assets/GtvfHbTXgAARi_4.jpeg";

const events = [
  {
    title: "Happiness on Naylalaland17",
    poster: poster1,
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis purus sit amet neque faucibus, et elementum metus dapibus. Vestibulum placerat arcu eu elit pellentesque, vitae maximus justo placerat. Nam lobortis, purus ut gravida consectetur, nunc eros porttitor nunc, volutpat tristique velit lorem ac eros. Pellentesque finibus nisl ut euismod ultrices. Etiam convallis odio mi, et rhoncus velit porttitor id. Integer nec augue ut libero pretium venenatis. Fusce turpis nunc, placerat ut iaculis sit amet, vestibulum maximus erat. Nam sit amet elit dui. Aliquam erat volutpat. Pellentesque condimentum ante lorem, non tincidunt quam aliquet sodales. Nullam lorem leo, euismod vitae libero id, rutrum fermentum tellus.",
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque metus mauris, faucibus et purus volutpat, rutrum elementum est. Phasellus cursus in sem et tempor. Sed sit amet iaculis purus. Integer sit amet placerat ante, id scelerisque turpis. Ut eu dui gravida, faucibus nunc eu, venenatis nunc. Aenean venenatis tempor lectus, consectetur ultrices sem vulputate sed. Maecenas facilisis mi sit amet ipsum porta vulputate. Fusce vel nisl a tellus dignissim suscipit in vitae leo. Aenean feugiat facilisis arcu nec tempus. Aenean sollicitudin nulla in mauris lobortis ullamcorper. Mauris augue libero, placerat vel dignissim porta, euismod ultrices tortor. Suspendisse nisl nisl, porttitor a maximus id, cursus sit amet nibh. Etiam vitae ante augue.",
    ],
    memories: [memory1, memory2, memory3, memory4],
  },
  {
    title: "Nayla's Journey",
    poster: poster2,
    description: [
      "JourNayla jadi sebuah langkah sekaligus tanda petualangan member JKT48 generasi ke-12, Nayla Suji, yang sedang menciptakan harapan menjadi seorang IDOL.",
      "Sebuah pijakan awal untuk menggapai mimpi sebagai seorang IDOLA. Pada saat itu, kesempatan Nayla Suji untuk memulai langkahnya diiringi dengan setlist [劇場] AITAKATTA dan kami Nayrakuen akan selalu ada di setiap langkah untuk memberikan semangat dan senyuman.",
    ],
    timeline: [
      "Diperkenalkan menjadi member traine JKT48 pada tanggal 18 November 2023 di acara Jak Japan Matsuri 2023.",
      "Kurang dari dua bulan setelah debut tersebut, ia melakukan shonichi untuk setlist Ingin Bertemu pada 1 Maret 2024.",
      "Menghadiri event video call bareng member.",
      "Membuat fanart dan dibagikan di sosial media.",
      "Menonton teater langsung pertama kali.",
    ],
  },
  {
    title: "Happiness Slice on Pizzaland",
    poster: poster3,
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris convallis purus sit amet neque faucibus, et elementum metus dapibus. Vestibulum placerat arcu eu elit pellentesque, vitae maximus justo placerat. Nam lobortis, purus ut gravida consectetur, nunc eros porttitor nunc, volutpat tristique velit lorem ac eros. Pellentesque finibus nisl ut euismod ultrices. Etiam convallis odio mi, et rhoncus velit porttitor id. Integer nec augue ut libero pretium venenatis. Fusce turpis nunc, placerat ut iaculis sit amet, vestibulum maximus erat. Nam sit amet elit dui. Aliquam erat volutpat. Pellentesque condimentum ante lorem, non tincidunt quam aliquet sodales. Nullam lorem leo, euismod vitae libero id, rutrum fermentum tellus.",
      "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque metus mauris, faucibus et purus volutpat, rutrum elementum est. Phasellus cursus in sem et tempor. Sed sit amet iaculis purus. Integer sit amet placerat ante, id scelerisque turpis. Ut eu dui gravida, faucibus nunc eu, venenatis nunc. Aenean venenatis tempor lectus, consectetur ultrices sem vulputate sed. Maecenas facilisis mi sit amet ipsum porta vulputate. Fusce vel nisl a tellus dignissim suscipit in vitae leo. Aenean feugiat facilisis arcu nec tempus. Aenean sollicitudin nulla in mauris lobortis ullamcorper. Mauris augue libero, placerat vel dignissim porta, euismod ultrices tortor. Suspendisse nisl nisl, porttitor a maximus id, cursus sit amet nibh. Etiam vitae ante augue.",
    ],
    memories: [memory5, memory6, memory7, memory8, memory9],
  },
];

const EventPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => {
      setFadeIn(true);
      AOS.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [selectedEvent]);

  const toggleText = () => setShowFullText(!showFullText);
  const openModal = (img) => {
    setModalImage(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalImage(null);
    setModalOpen(false);
  };

  const current = events[selectedEvent];

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <h2 className="event-heading" data-aos="fade-down">Spesial Event</h2>

        <div className="event-tabs">
          {events.map((_, index) => (
            <button
              key={index}
              className={`tab-button ${selectedEvent === index ? "active" : ""}`}
              onClick={() => {
                setFadeIn(false);
                setShowFullText(false);
                setTimeout(() => setSelectedEvent(index), 50);
              }}
            >
              Event {index + 1}
            </button>
          ))}
        </div>

        <div className={`event-content fade-slide ${fadeIn ? "show" : ""}`}>
          <div className="event-title">
            <span className="event-line" />
            <h3>{current.title}</h3>
          </div>

          <div className="event-body">
            <img src={current.poster} alt="Poster" className="event-poster" />
            <div className="event-text">
              <p>{current.description[0]}</p>
              <div className={`fade-text ${showFullText ? "show" : ""}`}>
                <p>{current.description[1]}</p>
              </div>
              <button className="see-more-btn" onClick={toggleText}>
                {showFullText ? "Tutup" : "Lihat Selengkapnya"}
              </button>
            </div>
          </div>
        </div>

        {current.timeline ? (
          <div className="gallery-section">
            <h2 className="event-heading" data-aos="fade-down">Timeline</h2>
            <div className="timeline-text">
              <div className="timeline-line" />
              {current.timeline.map((text, i) => (
                <div
                  className={`timeline-text-item ${i % 2 === 0 ? "left" : "right"}`}
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="timeline-circle" />
                  <div className="timeline-text-content">
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="gallery-section">
            <h2 className="event-heading" data-aos="fade-down">Memories</h2>
            <div className="masonry-gallery">
              {current.memories.map((img, i) => (
                <div
                  className="masonry-item"
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  onClick={() => openModal(img)}
                >
                  <img src={img} alt={`Memory ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="image-modal" onClick={closeModal}>
          <img src={modalImage} alt="Zoomed" />
          <span className="close-button" onClick={closeModal}>&times;</span>
        </div>
      )}
    </div>
  );
};

export default EventPage;
