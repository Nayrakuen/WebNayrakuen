import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import bgImage from '../assets/bg.png';

function HeroCarousel() {
  const imageStyle = {
    maxHeight: "550px",
    objectFit: "cover",
    width: "100%"
  };

  return (
    <Carousel controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bgImage}
          alt="Slide 1"
          style={imageStyle}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bgImage}
          alt="Slide 2"
          style={imageStyle}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={bgImage}
          alt="Slide 3"
          style={imageStyle}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
