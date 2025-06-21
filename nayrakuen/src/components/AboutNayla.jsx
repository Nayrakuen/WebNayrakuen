import React from "react";
import "./AboutNayla.css";

function AboutNayla() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <h2 className="about-title" data-aos="fade-down">Profile Nayla</h2>

        <p className="profile-description" data-aos="fade-up" data-aos-delay="100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at
          venenatis quam. Donec vel posuere orci. Sed fermentum neque urna, vel
          consequat sapien auctor id. Curabitur nisi est, venenatis quis dolor
          vitae, convallis lobortis ex. Aliquam semper, leo vitae facilisis
          luctus, neque dui sodales arcu, ut dictum sem dui a enim. Quisque
          eget risus neque. Nulla commodo ornare est, in mollis nisl viverra
          ac.
        </p>
        <p className="profile-description" data-aos="fade-up" data-aos-delay="200">
          Morbi vitae magna turpis. Proin fringilla tellus leo, eget molestie
          arcu vehicula non. Sed eu mollis velit. In sed est ut metus viverra
          tempor. Sed fermentum orci odio, eget fermentum dolor semper non.
          Cras sagittis, urna vel malesuada suscipit, diam velit volutpat
          magna, sed rhoncus nibh dolor in mauris. Integer molestie tempor
          sollicitudin.
        </p>

        <div className="video-wrapper" data-aos="zoom-in" data-aos-delay="300">
          <video className="profile-video" controls autoPlay muted loop>
            <source src="/Nayla-Suji.mp4" type="video/mp4" />
            Browser tidak mendukung video tag.
          </video>
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
              Unit Song : <strong>Nageki No Figure</strong>
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
