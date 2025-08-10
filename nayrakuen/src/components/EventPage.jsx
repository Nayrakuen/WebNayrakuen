import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EventPage.css";

import poster1 from "../assets/Poster.jpeg";
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
    title: "Happiness on Sweet Island",
    poster: poster1,
    description: [
      "Sebuah Perayaan untuk menyambut Ulang Tahun Nayla Suji yang ke 17th",
      "Dalam terjemahan bahasa Indonesia bisa disebut Kebahagiaan di Pulau Manis Kebahagiaan disini tidak hanya kebahagiaan yang sementara saja, tetapi juga kami berharap sebuah kebahagian yang abadi. Seperti yang dirasakan ketika berada di tempat yang sempurna dan penuh cinta.",
      "Semoga Nayla dapat menemukan kebahagiaan ini di setiap aspek kehidupannya, dan merasakan manisnya hidup di Pulau Manis.",
      "Maka dari itu, Kami menggunakan Hastag #SweetNaylalalan17",
    ],
    memories: [memory1, memory2, memory3, memory4],
  },
  {
    title: "Happiness Slice on Pizzaland",
    poster: poster3,
    description: [
      "Sebuah Perayaan untuk menyambut Ulang Tahun Nayla Suji yang ke 18th",
      "Di antara harum keju yang meleleh dan adonan yang menari di udara, Nayla menemukan kebahagiaan dalam hal sederhana yakni sepotong pizza. Bukan hanya sekedar rasanya yang lezat ataupun topping nya yang beragam, tapi karena tiap gigitan pizza yang ia makan mengingatkan nya pada tawa, keluarga, dan momen yang sederhana tapi membahagiakan.",
      "Kini di usia nya yang ke-18, kami ingin merayakan kebahagiaan sederhana itu dalam tema Happiness Slice on Pizzaland. Nayla, sang chef kecil, meracik adonan kebahagiaan nya sendiri dari remah-remah kasih sayang, taburan bumbu tawa sahabatnya dan juga lapisan cinta keluarga.",
      "Selamat datang di #HappinessNaylalaland18🍕, sebuah perayaan hangat dan sederhana, karena hidup bukan hanya soal momen besar, tapi soal potongan-potongan kecil kebahagiaan, satu gigitan pada satu waktu.",
    ],
    memories: [memory5, memory6, memory7, memory8, memory9],
  },
  {
    title: "Coming Soon",
    poster: "COMING_SOON",
    description: [
      "",
      "",
    ],
    memories: [],
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
        <h2 className="event-heading" data-aos="fade-down">
          Spesial Event
        </h2>

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
            {current.poster === "COMING_SOON" ? (
              <div
                className="event-poster coming-soon-box"
                style={{
                  backgroundColor: "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  minHeight: "400px",
                  borderRadius: "8px",
                }}
              >
                COMING SOON
              </div>
            ) : (
              current.poster && (
                <img
                  src={current.poster}
                  alt="Poster"
                  className="event-poster"
                  data-aos="zoom-in"
                />
              )
            )}

            <div className="event-text">
              {current.description.slice(0, 2).map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}

              <div className={`fade-text ${showFullText ? "show" : ""}`}>
                {current.description.slice(2).map((desc, i) => (
                  <p key={i + 2}>{desc}</p>
                ))}
              </div>

              {current.description.length > 2 && (
                <button className="see-more-btn" onClick={toggleText}>
                  {showFullText ? "Tutup" : "Lihat Selengkapnya"}
                </button>
              )}
            </div>
          </div>
        </div>

        {current.memories.length > 0 && (
          <div className="gallery-section">
            <h2 className="event-heading" data-aos="fade-down">
              Memories
            </h2>
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
          <span className="close-button" onClick={closeModal}>
            &times;
          </span>
        </div>
      )}
    </div>
  );
};

export default EventPage;
