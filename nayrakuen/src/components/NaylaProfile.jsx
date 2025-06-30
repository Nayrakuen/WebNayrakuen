import React from "react";
import "./NaylaProfile.css";
// import naylaImage from "../assets/nayla-suji.jpeg";
import instagramIcon from "../assets/icons/Instagram.png";
import twitterIcon from "../assets/icons/Twitter.png";
import tiktokIcon from "../assets/icons/Tiktok.png";
import idnIcon from "../assets/icons/IDN-Live.png";

function NaylaProfile() {
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

            <p className="profile-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget
              libero nec augue imperdiet ullamcorper. Suspendisse gravida, felis
              ac laoreet rhoncus, justo leo pretium lorem, sed tempor elit justo eu arcu.
            </p>
            <p className="profile-description">
              Curabitur pretium nisl eu sapien lobortis, nec tristique velit malesuada.
              Nullam tempor ligula sit amet velit convallis, a fermentum libero interdum.
              Morbi et leo risus. Nam vitae purus nec tellus vulputate fringilla.
            </p>

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

          {/* Gambar */}
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
