import React from "react";
import "./Footer.css";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="structured-footer">
      <div className="container">
        <div className="footer-brand text-start">
          <img src={logo} alt="Nayrakuen Logo" className="footer-logo-img-large" />
          <h4 className="footer-logo-text">Nayrakuen</h4>
          <p className="footer-description">
            Official Fanbase of Nayla Suji, 12th Generation of JKT48.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-group text-start">
            <h5>Halaman</h5>
            <ul>
              <li><a href="/">Beranda</a></li>
              <li><a href="/tentang">Tentang Kami</a></li>
              <li><a href="/kontak">Hubungi Kami</a></li>
            </ul>
          </div>

          <div className="footer-group text-start">
            <h5>Sosial Media</h5>
            <ul>
              <li><a href="https://x.com/Nayrakuen_ID">X / Twitter</a></li>
              <li><a href="https://www.instagram.com/nayrakuen_id/">Instagram</a></li>
              <li><a href="https://www.tiktok.com/@nayrakuen_id">TikTok</a></li>
            </ul>
          </div>

          <div className="footer-group text-start">
            <h5>Sosial Media Nayla</h5>
            <div className="social-nayla-pairs">
              <div className="social-row">
                <a href="https://x.com/SNayla_JKT48">X / Twitter</a>
                <a href="https://www.threads.net/@jkt48.nayla.s">Threads</a>
              </div>
              <div className="social-row">
                <a href="https://www.instagram.com/jkt48.nayla.s/">Instagram</a>
                <a href="https://www.idn.app/jkt48_nayla">IDN App</a>
              </div>
              <div className="social-row">
                <a href="https://www.tiktok.com/@jkt48.nayla">TikTok</a>
                <a href="https://www.showroom-live.com/r/JKT48_Nayla">Showroom</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom text-start">
          <p>&copy; 2025 Nayrakuen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
