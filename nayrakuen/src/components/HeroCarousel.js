import Carousel from 'react-bootstrap/Carousel';

function HeroCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1200x400?text=Slide+1"
          alt="Slide 1"
        />
        <Carousel.Caption>
          <h3>Selamat Datang di Nayrakuen</h3>
          <p>Surga untuk para fans Nayla Suji JKT48.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1200x400?text=Slide+2"
          alt="Slide 2"
        />
        <Carousel.Caption>
          <h3>Event dan Galeri</h3>
          <p>Jangan lewatkan update terbaru!</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://via.placeholder.com/1200x400?text=Slide+3"
          alt="Slide 3"
        />
        <Carousel.Caption>
          <h3>Dukung Nayla Selalu</h3>
          <p>Kita adalah keluarga Nayrakuen!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroCarousel;
