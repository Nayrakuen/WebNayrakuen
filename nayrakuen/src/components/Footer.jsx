import React from "react";
import "./Footer.css";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="structured-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="Nayrakuen Logo" className="footer-logo-img-large" />
            <div className="footer-text-block">
              <h4 className="footer-logo-text">Nayrakuen</h4>
              <p className="footer-description">
                Official Fanbase of Nayla Suji, 12th Generation of JKT48.
              </p>
            </div>
          </div>

          <div className="footer-columns">
            <div className="footer-group">
              <h5>Halaman</h5>
              <ul>
                <li><a href="/">Beranda</a></li>
                <li><a href="/tentang">Tentang Kami</a></li>
                <li><a href="/kontak">Hubungi Kami</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Sosial Media</h5>
              <ul>
                <li><a href="https://x.com/Nayrakuen_ID">X / Twitter</a></li>
                <li><a href="https://www.instagram.com/nayrakuen_id/">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@nayrakuen_id">Tiktok</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Sosial Media Nayla</h5>
              <ul>
                <li><a href="https://x.com/SNayla_JKT48">X / Twitter</a></li>
                <li><a href="https://www.instagram.com/jkt48.nayla.s/">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@jkt48.nayla">Tiktok</a></li>
                <li><a href="https://www.threads.net/@jkt48.nayla.s">Threads</a></li>
                <li><a href="https://www.idn.app/jkt48_nayla">IDN app</a></li>
                <li><a href="https://www.showroom-live.com/r/JKT48_Nayla">Showroom</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Hashtag</h5>
              <ul>
                <li>#Ohayo</li>
                <li>#Naylabu</li>
                <li>#NayReply</li>
                <li>#BAKKYUN</li>
                <li>#PictEveryNay</li>
                <li>#NayMeet</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Nayrakuen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
