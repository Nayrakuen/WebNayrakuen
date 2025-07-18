import React, { useEffect, useState } from "react";
import "./TentangKami.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

import logoSquare from "../assets/LogoMerah.png";
import foto1 from "../assets/Nayrakuen/Photo3.jpg";
import foto2 from "../assets/Nayrakuen/Photo2.jpg";
import foto3 from "../assets/Nayrakuen/Photo1.jpg";
import foto4 from "../assets/Nayrakuen/Photo4.jpg";
import foto5 from "../assets/Nayrakuen/Photo5.jpg";
import foto6 from "../assets/Nayrakuen/Photo6.jpg";
import foto7 from "../assets/Nayrakuen/Photo7.jpg";

function TentangKami() {
  const [content, setContent] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    axios
      .get("http://localhost:5000/api/tentang-kami")
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data) && data.length > 0 && data[0].content) {
          setContent(data[0].content);
        } else if (data && data.content) {
          setContent(data.content);
        } else {
          setIsEmpty(true);
        }
      })
      .catch(() => {
        setIsEmpty(true);
      });
  }, []);

  const galeriFoto = [
    { src: foto1, caption: "Birthday Project Sweet Naylalaland" },
    { src: foto2, caption: "Spesial Gathering with Ancol Beach" },
    { src: foto3, caption: "Offline Gathering" },
    { src: foto4, caption: "Meet and Greet Nayla #4" },
    { src: foto5, caption: "JKT48 Meet n Greet Festival 26th Single" },
    { src: foto6, caption: "Anniversary Nayrakuen 1th" },
    { src: foto7, caption: "Anniversary Nayrakuen 1th" },
  ];

  const paragraphs = content ? content.split("\n\n") : [];

  return (
    <div className="tentang-wrapper">
      <div className="container text-center">
        <div className="tentang-heading" data-aos="fade-up">
          <h2 className="tentang-title">
            <span className="latin">Nayrakuen</span> | <span className="japanese">奈楽園</span>
          </h2>
        </div>

        <div className="tentang-logo-paragraph" data-aos="fade-up" data-aos-delay="100">
          <img src={logoSquare} alt="Logo Nayrakuen" className="logo-square" />
          <div className="tentang-text">
            {isEmpty ? (
              <p>Konten belum tersedia untuk saat ini.</p>
            ) : (
              paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
            )}
          </div>
        </div>

        {galeriFoto.map((foto, index) => (
          <div
            key={index}
            className="tentang-photo-frame"
            data-aos="fade-up"
            data-aos-delay={150 + index * 100}
          >
            <img src={foto.src} alt={foto.caption} />
            <p className="image-caption">{foto.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TentangKami;
