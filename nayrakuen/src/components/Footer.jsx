import React from "react";
import "./Footer.css";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="structured-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src={logo}
              alt="Nayrakuen Logo"
              className="footer-logo-img-large"
            />
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
                <li><a href="/tentang-kami">Tentang Kami</a></li>
                <li><a href="mailto:nayrakuen@gmail.com">Hubungi Kami</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Sosial Media</h5>
              <ul>
                <li><a href="https://x.com/Nayrakuen_ID" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
                <li><a href="https://www.instagram.com/nayrakuen_id/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@nayrakuen_id" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Online Shop</h5>
              <ul>
                <li>
                  <a
                    href="https://tokopedia.link/dhuGIdtBIVb"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tokopedia
                  </a>
                </li>
                <li>
                  <a
                    href="https://shopee.co.id/nayrakuen_shop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Shopee
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Sosial Media Nayla</h5>
              <ul>
                <li><a href="https://x.com/SNayla_JKT48" target="_blank" rel="noopener noreferrer">X / Twitter</a></li>
                <li><a href="https://www.instagram.com/jkt48.nayla.s/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@jkt48.nayla" target="_blank" rel="noopener noreferrer">Tiktok</a></li>
                <li><a href="https://www.threads.net/@jkt48.nayla.s" target="_blank" rel="noopener noreferrer">Threads</a></li>
                <li><a href="https://www.idn.app/jkt48_nayla" target="_blank" rel="noopener noreferrer">IDN App</a></li>
                <li><a href="https://www.showroom-live.com/r/JKT48_Nayla" target="_blank" rel="noopener noreferrer">Showroom</a></li>
              </ul>
            </div>

            <div className="footer-group">
              <h5>Hashtag</h5>
              <ul className="hashtag-list">
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
