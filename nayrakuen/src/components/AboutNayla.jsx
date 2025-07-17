import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AboutNayla.css";

function AboutNayla() {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/about-nayla")
      .then((res) => {
        let content = res.data.content || "";
        content = content.replace(/\\n/g, '\n');

        const parts = content.split(/\n\s*\n/);
        setParagraphs(parts);
      })
      .catch((err) => {
        console.error("Gagal mengambil data narasi:", err);
      });
  }, []);

  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h2 className="about-title" data-aos="fade-down">Profile Nayla</h2>

        {paragraphs.map((para, index) => (
          <p
            key={index}
            className="profile-description"
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
          >
            {para}
          </p>
        ))}

        <div className="video-wrapper" data-aos="zoom-in" data-aos-delay="300">
          <div className="youtube-embed-container">
            <iframe
              className="youtube-video"
              src="https://www.youtube.com/embed/dVPVlqVPgZ0?autoplay=1&mute=1&controls=1&rel=0&loop=1&playlist=dVPVlqVPgZ0"
              title="Nayla Suji Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="setlist-section" data-aos="fade-up" data-aos-delay="400">
          <div className="subtitle-wrapper">
            <div className="setlist-bar"></div>
            <h4 className="setlist-title">Setlist</h4>
          </div>

          <div className="setlist-item" data-aos="fade-up" data-aos-delay="500">
            <span className="setlist-name blue">Pajama Drive</span>
            <p className="unit-song">
              Unit Song : <strong>Kagami no Naka no Jeanne D'Arc</strong>
            </p>
          </div>
          <hr />

          <div className="setlist-item" data-aos="fade-up" data-aos-delay="600">
            <span className="setlist-name orange">Aitakatta</span>
            <p className="unit-song">
              Unit Song : <strong>Nageki No Figure, Glass no I Love You, Senaka Kara Dakishimete</strong>
            </p>
          </div>
          <hr />

          <div className="setlist-item" data-aos="fade-up" data-aos-delay="700">
            <span className="setlist-name yellow">Cara Meminum Ramune</span>
            <p className="unit-song">
              Unit Song : <strong>Usotsuki na Dachou</strong>
            </p>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default AboutNayla;
