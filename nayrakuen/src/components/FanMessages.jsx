import React from "react";
import "./FanMessages.css";
import bgImage from "../assets/bg.png";
import fanMessages from "../fanMessages.json";

const FanMessages = () => {
  return (
    <div
      className="fan-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h3 className="fan-title">To <strong>Nayla</strong> :</h3>

      {[0, 1, 2].map((rowIndex) => (
        <div
          key={rowIndex}
          className={`fan-row ${rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"}`}
        >
          <div className="fan-row-content">
            {[...fanMessages, ...fanMessages].map((msg, i) => (
              <div key={`${rowIndex}-${i}`} className="fan-card">
                <p className="fan-from">From: {msg.from}</p>
                <p className="fan-message">
                  <strong>“</strong>{msg.message}<strong>”</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FanMessages;
