import React from 'react';
import './EventCard.css';
import eventImage from '../assets/Header.jpg';

function EventCard() {
  return (
    <div className="event-card">
      <div className="event-border top"></div>

      <div className="event-content">
        <img src={eventImage} alt="Event" className="event-image" />
        <img src="/Logo.png" alt="Nayrakuen Logo" className="event-logo" />
      </div>

      <div className="event-border bottom"></div>
    </div>
  );
}

export default EventCard;
