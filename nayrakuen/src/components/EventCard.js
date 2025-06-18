import React from 'react';
import './EventCard.css';
import eventImage1 from '../assets/Poster.jpeg';
import eventImage2 from '../assets/Poster1.jpeg';
import eventImage3 from '../assets/Poster2.jpeg';

function EventCard() {
  return (
    <section className="event-section py-5">
      <div className="event-container container">
        <h2 className="event-title text-center mb-5" data-aos="fade-up">≡ Spesial Event ≡</h2>
        <div className="event-grid row justify-content-center">
          <div className="event-card col-md-4 col-sm-6 mb-4 text-center" data-aos="zoom-in" data-aos-delay="100">
            <img src={eventImage1} alt="Event 1" className="poster-img mb-2" />
            <p className="poster-subtitle">Happiness On Sweet Island</p>
          </div>

          <div className="event-card col-md-4 col-sm-6 mb-4 text-center" data-aos="zoom-in" data-aos-delay="200">
            <img src={eventImage2} alt="Event 2" className="poster-img mb-2" />
            <p className="poster-subtitle">Nayla Journey</p>
          </div>

          <div className="event-card col-md-4 col-sm-6 mb-4 text-center" data-aos="zoom-in" data-aos-delay="200">
            <img src={eventImage3} alt="Event 2" className="poster-img mb-2" />
            <p className="poster-subtitle">Happiness Slice On Pizzaland</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventCard;
