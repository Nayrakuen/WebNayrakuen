import React from 'react';
import './EventCard.css';
import translate from '../translate.json';
import eventImage1 from '../assets/Poster.jpeg';
import eventImage2 from '../assets/Poster1.jpeg';
import eventImage3 from '../assets/Poster2.jpeg';
import { Link } from 'react-router-dom';

const imageMap = {
  "Poster.jpeg": eventImage1,
  "Poster1.jpeg": eventImage2,
  "Poster2.jpeg": eventImage3
};

function EventCard({ t, language = "id" }) {
  const events = translate[language]?.events || translate["id"].events;

  return (
    <section className="event-section py-5">
      <div className="event-container container">
        <div className="d-flex justify-content-center mb-5" data-aos="fade-up">
          <h2 className="event-title">
            ≡ Spesial Event ≡
          </h2>
        </div>
        <div className="event-grid row justify-content-center">
          {events.map((event, index) => (
            <div
              className="event-card col-md-4 col-sm-6 mb-4 text-center"
              data-aos="zoom-in"
              data-aos-delay={100 * (index + 1)}
              key={index}
            >
              <img src={imageMap[event.image]} alt={`Event ${index + 1}`} className="poster-img mb-2" />
              <p className="poster-subtitle">{event.title}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/event" className="see-more-link">
            Lihat Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventCard;
