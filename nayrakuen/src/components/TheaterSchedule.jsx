import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TheaterSchedule.css";

function TheaterSchedule() {
  const today = new Date();
  const [shows, setShows] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  useEffect(() => {
    setShows([]);

    const fetchSchedule = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/nayla/schedule");

        const filtered = res.data.filter((item) => {
          const itemDate = new Date(item.date);
          return (
            itemDate.getFullYear() === year &&
            itemDate.getMonth() === month
          );
        });

        setShows(filtered);
      } catch (err) {
        console.error("❌ Gagal mengambil jadwal Nayla:", err.message);
      }
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
      const date = new Date(show.date);
      return date.getDate() === day;
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

  return (
    <div className="calendar-container">
      <h2 className="theater-title text-center mb-2">Jadwal Teater Nayla</h2>
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
                        <div key={idx} className="calendar-event">
                          <span className="dot">●</span>
                          <a
                            href={event.ticket_url || "#"}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {new Date(event.date).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            {event.title}
                          </a>
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
          <tr>
            <td colSpan={3} style={{ textAlign: "left", padding: "8px" }}>
              <span
                onClick={handlePrevMonth}
                style={{ cursor: "pointer", color: "#800000", fontWeight: "bold" }}
              >
                Bulan Sebelumnya
              </span>
            </td>
            <td>|</td>
            <td colSpan={3} style={{ textAlign: "right", padding: "8px" }}>
              <span
                onClick={handleNextMonth}
                style={{ cursor: "pointer", color: "#800000", fontWeight: "bold" }}
              >
                Bulan Berikutnya
              </span>
            </td>
          </tr>
    </div>
  );
}

export default TheaterSchedule;