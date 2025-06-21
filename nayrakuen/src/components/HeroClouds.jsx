import React from "react";
import "./HeroClouds.css";
import videoBackground from "../assets/NaylaAec.mp4"; // pastikan path-nya benar

function HeroClouds() {
  return (
    <section className="hero-clouds">
      <video autoPlay muted loop playsInline className="background-video">
        <source src={videoBackground} type="video/mp4" /></video>
      <div className="clouds"></div>
      <div className="overlay-gradient"></div>
      <div className="hero-content"></div>
    </section>
  );
}

export default HeroClouds;
