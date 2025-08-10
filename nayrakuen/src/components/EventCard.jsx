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
  const rawEvents = translate[language]?.events || translate["id"].events;

  const filtered = rawEvents.filter(e => !/nayla\s*'?s?\s*journey/i.test(e.title));

  const sweetIsland = filtered.find(e => /happiness on sweet island|sweet island/i.test(e.title));
  const pizzaland = filtered.find(e => /pizzaland/i.test(e.title) || /happiness slice on pizzaland/i.test(e.title));

  const ordered = [];

  if (sweetIsland) ordered.push(sweetIsland);
  else if (filtered.length > 0) ordered.push(filtered[0]);

  if (pizzaland && !ordered.includes(pizzaland)) {
    ordered.push(pizzaland);
  } else {
    const fallback = filtered.find(e => !ordered.includes(e));
    if (fallback) ordered.push(fallback);
  }

  filtered.forEach(e => {
    if (!ordered.includes(e)) ordered.push(e);
  });
  
  const comingSoonCard = { title: "Coming Soon", image: "COMING_SOON" };
  if (ordered.length >= 3) {
    ordered[2] = comingSoonCard;
  } else {
    ordered.push(comingSoonCard);
  }

  return (
    <section className="event-section py-5">
      <div className="event-container container">
        <div className="d-flex justify-content-center mb-5" data-aos="fade-up">
          <h2 className="event-title">≡ Spesial Event ≡</h2>
        </div>

        <div className="event-grid row justify-content-center">
          {ordered.map((event, index) => (
            <div
              className="event-card col-md-4 col-sm-6 mb-4 text-center"
              // keep AOS on card; poster-specific animation can be handled inside if needed
              data-aos="zoom-in"
              data-aos-delay={100 * (index + 1)}
              key={index}
            >
              {event.image === "COMING_SOON" ? (
                <div
                  className="poster-img mb-2 coming-soon-placeholder"
                  style={{
                    backgroundColor: "#ccc",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "#555",
                    borderRadius: "8px"
                  }}
                >
                  COMING SOON
                </div>
              ) : (
                <img
                  src={imageMap[event.image]}
                  alt={event.title}
                  className="poster-img mb-2"
                />
              )}

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
