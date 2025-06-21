import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./NayArt.css";
import sample1 from "../assets/NaylArt/Art1.jpeg";
import sample2 from "../assets/NaylArt/Art2.jpeg";
import sample3 from "../assets/NaylArt/Art3.jpeg";
import sample4 from "../assets/NaylArt/Art4.jpeg";
import sample5 from "../assets/NaylArt/Art5.jpeg";
import sample6 from "../assets/NaylArt/Art6.jpeg";
import sample7 from "../assets/NaylArt/Art7.jpeg";
import sample8 from "../assets/NaylArt/Art8.jpeg";
import sample9 from "../assets/NaylArt/Art9.jpeg";
import sample10 from "../assets/NaylArt/Art11.jpeg";

const images = [
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  sample6,
  sample7,
  sample8,
  sample9,
  sample10,
];

function NayArt() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="nayart-section py-5">
      <div className="nayart-container">
        <div className="section-header mb-4 text-center">
          <h2 className="nayart-title">#NaylArt Gallery</h2>
          <p className="nayart-subtitle">
            Kumpulan karya kreatif dari para penggemar Nayla Suji.
          </p>
        </div>

        <div className="masonry">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Art ${index + 1}`}
              className="masonry-img"
              data-aos="fade-up"
            />
          ))}
        </div>

        <div className="see-more-text">Lihat lainnya</div>
      </div>
    </section>
  );
}

export default NayArt;
