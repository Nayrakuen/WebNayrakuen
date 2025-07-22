import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TheaterSchedule.css";

function TheaterSchedule() {
  const today = new Date();
  const [shows, setShows] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      const results = await Promise.allSettled([
        axios.get("http://localhost:5000/api/nayla/schedule"),
        axios.get("http://localhost:5000/api/teater"),
      ]);

      const [scheduleResult, theaterResult] = results;

      const naylaFormatted =
        scheduleResult.status === "fulfilled"
          ? scheduleResult.value.data.map((item) => ({
              date: item.date,
              title: item.title,
              ticket_url: item.ticket_url || "#",
              time: new Date(item.date).toTimeString().slice(0, 5),
            }))
          : [];

      const teaterFormatted =
        theaterResult.status === "fulfilled"
          ? theaterResult.value.data.map((item) => ({
              date: item.tanggal,
              title: item.setlist,
              ticket_url: "",
              time: item.jam ? item.jam.slice(0, 5) : "00:00",
            }))
          : [];

      const combined = [...naylaFormatted, ...teaterFormatted];

      const filtered = combined.filter((item) => {
        const d = new Date(item.date);
        return d.getFullYear() === year && d.getMonth() === month;
      });

      setShows(filtered);
    };

    fetchSchedule();
  }, [month, year]);

  useEffect(() => {
    generateCalendar();
  }, [month, year, shows]);

  const generateCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > totalDays) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      daysArray.push(week);
    }

    setCalendar(daysArray);
  };

  const getEventsForDate = (day) => {
    return shows.filter((show) => {
      const d = new Date(show.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const handlePrevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const monthLabel = new Date(year, month).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const openPopup = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setShowPopup(false);
  };

  return (
    <div className="calendar-container">
      <h2 className="theater-title text-center mb-2">Nayla Schedule</h2>
      <h5 className="calendar-title text-center">{monthLabel}</h5>

      <table className="calendar">
        <thead>
          <tr>
            <th>Min</th>
            <th>Sen</th>
            <th>Sel</th>
            <th>Rab</th>
            <th>Kam</th>
            <th>Jum</th>
            <th>Sab</th>
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => (
                <td key={j} className={day ? "calendar-cell" : "empty"}>
                  {day && (
                    <>
                      <div className="calendar-day">{day}</div>
                      {getEventsForDate(day).map((event, idx) => (
                        <div
                          key={idx}
                          className="calendar-event"
                          onClick={() => openPopup(event)}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="dot">●</span> {event.time} {event.title}
                        </div>
                      ))}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="calendar-nav mt-2">
        <span onClick={handlePrevMonth}>Bulan Sebelumnya</span>
        <span onClick={handleNextMonth}>Bulan Berikutnya</span>
      </div>

      {showPopup && selectedEvent && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              Detail Jadwal
              <span className="popup-close" onClick={closePopup}>✖</span>
            </div>
            <div className="popup-body">
              <p><strong>Tanggal:</strong> {new Date(selectedEvent.date).toLocaleDateString("id-ID")}</p>
              <p><strong>Jam:</strong> {selectedEvent.time}</p>
              <p><strong>Show / Event:</strong> {selectedEvent.title}</p>
              {selectedEvent.ticket_url && (
                <p>
                  <a href={selectedEvent.ticket_url} target="_blank" rel="noreferrer">
                    🎫 Link Tiket
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheaterSchedule;