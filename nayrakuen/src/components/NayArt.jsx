import React, { useEffect, useState } from "react";
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
import sample10 from "../assets/NaylArt/Art10.png";
import sample11 from "../assets/NaylArt/Art11.jpeg";
import sample12 from "../assets/NaylArt/Art12.jpeg";
import sample13 from "../assets/NaylArt/Art13.jpg";
import sample14 from "../assets/NaylArt/Art14.jpeg";
import sample15 from "../assets/NaylArt/Art15.jpg";
import sample16 from "../assets/NaylArt/Art16.jpg";
import sample17 from "../assets/NaylArt/Art17.jpg";
import sample18 from "../assets/NaylArt/Art18.jpg";
import sample19 from "../assets/NaylArt/Art19.jpg";
import sample20 from "../assets/NaylArt/Art20.jpg";
import sample21 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_10.jpg";
import sample22 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_11.jpg";
import sample23 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_13.jpg";
import sample24 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_14.jpg";
import sample25 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_15.jpg";
import sample26 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_16.jpg";
import sample27 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_17.jpg";
import sample28 from "../assets/NaylArt/LINE_ALBUM__NaylArt_250816_18.jpg";

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
  sample11,
  sample12,
  sample13,
  sample14,
  sample15,
  sample16,
  sample17,
  sample18,
  sample19,
  sample20,
  sample21,
  sample22,
  sample23,
  sample24,
  sample25,
  sample26,
  sample27,
  sample28,
];

function NayArt({ t }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 5 : 10);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayedImages = images.slice(0, visibleCount);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleSeeLess = () => {
    setVisibleCount(isMobile ? 5 : 10);
  };

  return (
    <section className="nayart-section py-5">
      <div className="nayart-container">
        <div className="section-header mb-4 text-center">
          <h2 className="nayart-title">#NaylArt Gallery</h2>
          <p className="nayart-subtitle">{t("nayart", "subtitle")}</p>
        </div>

        <div className="masonry">
          {displayedImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Art ${index + 1}`}
              className="masonry-img"
              data-aos="fade-up"
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="text-center mt-3">
          {visibleCount < images.length ? (
            <span className="see-more-link" onClick={handleSeeMore}>
              {t("nayart", "seeMore")}
            </span>
          ) : (
            <span className="see-more-link" onClick={handleSeeLess}>
              {t("nayart", "seeLess")}
            </span>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Preview" />
          </div>
        </div>
      )}
    </section>
  );
}

export default NayArt;
