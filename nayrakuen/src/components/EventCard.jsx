import React from 'react';
import './EventCard.css';
import translate from '../translate.json';
import eventImage1 from '../assets/Poster.jpeg';
import eventImage2 from '../assets/Poster1.jpeg';
import eventImage3 from '../assets/Poster2.jpeg';

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
        <h2 className="event-title text-center mb-5" data-aos="fade-up">
          ≡ {t("navbar", "event")} ≡
        </h2>
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
      </div>
    </section>
  );
}

export default EventCard;
