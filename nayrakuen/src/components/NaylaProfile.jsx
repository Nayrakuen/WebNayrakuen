import React, { useEffect, useState } from "react";
import "./NaylaProfile.css";
// import naylaImage from "../assets/nayla-suji.jpeg";
import instagramIcon from "../assets/icons/Instagram.png";
import twitterIcon from "../assets/icons/Twitter.png";
import tiktokIcon from "../assets/icons/Tiktok.png";
import idnIcon from "../assets/icons/IDN-Live.png";
import axios from "axios";

function NaylaProfile() {
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-seven-nu-19.vercel.app/api/mini-profile")
      .then((res) => {
        let content = res.data.content || "";
        content = content.replace(/\\n/g, "\n");
        const parts = content.split(/\n\s*\n/);
        setParagraphs(parts);
      })
      .catch((err) => {
        console.error("Gagal mengambil data narasi Nayla:", err);
      });
  }, []);

  return (
    <section className="profile-section py-5">
      <div className="container">
        <div className="row align-items-center flex-column-reverse flex-md-row">
          <div
            className="col-md-7 content-left"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="profile-header d-flex align-items-center mb-4">
              <div className="red-bar me-2"></div>
              <h2 className="profile-title m-0">Nayla Suji</h2>
            </div>

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

            <div className="social-icons mt-3 d-flex gap-3 flex-wrap">
              <a href="https://www.idn.app/jkt48_nayla" target="_blank" rel="noreferrer">
                <img src={idnIcon} alt="IDN Live Nayla Suji" />
              </a>
              <a href="https://x.com/SNayla_JKT48" target="_blank" rel="noreferrer">
                <img src={twitterIcon} alt="Twitter Nayla Suji" />
              </a>
              <a href="https://www.instagram.com/jkt48.nayla.s" target="_blank" rel="noreferrer">
                <img src={instagramIcon} alt="Instagram Nayla Suji" />
              </a>
              <a href="https://www.tiktok.com/@jkt48.nayla" target="_blank" rel="noreferrer">
                <img src={tiktokIcon} alt="TikTok Nayla Suji" />
              </a>
            </div>
          </div>

          {/* Gambar opsional jika dibutuhkan */}
          {/* <div
            className="col-md-5 text-center mb-4 mb-md-0"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <img
              src={naylaImage}
              alt="Nayla Suji JKT48"
              className="img-fluid profile-img"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default NaylaProfile;
