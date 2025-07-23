import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NayrakuenStruktur.css";
import orgImage from "../assets/Frame31.png";

const OrganizationStructure = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="org-section" data-aos="fade-up">
      <div className="org-image-wrapper">
        <img
          src={orgImage}
          alt="Struktur Organisasi Nayrakuen"
          className="org-image"
        />
      </div>
    </section>
  );
};

export default OrganizationStructure;
