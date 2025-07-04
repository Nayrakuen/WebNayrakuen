import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NaylaSchedule.css";

function NaylaSchedule() {
  const [shows, setShows] = useState([]);
  const [showroom, setShowroom] = useState(null);
  const [idnLive, setIdnLive] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchData = async () => {
      try {
        const scheduleRes = await axios.get("http://localhost:3001/api/nayla/schedule");
        setShows(scheduleRes.data);

        const showroomRes = await axios.get("http://localhost:3001/api/nayla/showroom");
        setShowroom(showroomRes.data);
      } catch {
        setShowroom(null);
      }

      try {
        const idnRes = await axios.get("http://localhost:3001/api/nayla/idnlive");
        setIdnLive(idnRes.data);
      } catch {
        setIdnLive(null);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="schedule-wrapper">
      <div className="schedule-container">
        
        <h2 className="schedule-title" data-aos="fade-down">Schedule</h2>

        <section className="schedule-section" data-aos="fade-up">
          <div className="subtitle-wrapper">
            <div className="subtitle-line"></div>
            <h3 className="schedule-subtitle">Teater</h3>
          </div>

          <table className="schedule-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Setlist</th>
                <th>Performing Member</th>
                <th>Tiket</th>
              </tr>
            </thead>
            <tbody>
              {shows.length > 0 ? (
                shows.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(item.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td>{item.title}</td>
                    <td>{item.performers || "Nayla dan member lainnya"}</td>
                    <td>
                      {item.ticket_url ? (
                        <a href={item.ticket_url} target="_blank" rel="noreferrer" className="ticket-link">
                          Beli Tiket
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">Tidak ada jadwal tampil.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="schedule-section" data-aos="fade-up">
          <div className="subtitle-wrapper">
            <div className="subtitle-line"></div>
            <h3 className="schedule-subtitle">Video Call</h3>
            <img src="/Cam.svg" alt="Icon Cam" className="subtitle-icon" />
          </div>

          <table className="schedule-table videocall-table">
            <thead>
              <tr>
                <th>Sesi</th>
                <th>Nama</th>
                <th>Preparation</th>
                <th>Masuk</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nayla Suji</td>
                <td>12:30 WIB</td>
                <td>13:00 WIB</td>
                <td><span className="status-ready">Ready</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Nayla Suji</td>
                <td>13:30 WIB</td>
                <td>14:00 WIB</td>
                <td><span className="status-sold">Sold</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>Nayla Suji</td>
                <td>14:30 WIB</td>
                <td>15:00 WIB</td>
                <td><span className="status-sold">Sold</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="schedule-section" data-aos="fade-up">
          <div className="subtitle-wrapper">
            <div className="subtitle-line"></div>
            <h3 className="schedule-subtitle">Live</h3>
          </div>

          <div className="live-box">
            {idnLive && (
              <a href={idnLive.url} target="_blank" rel="noreferrer">
                <img src="/nayla-live.jpg" alt="IDN Live" className="live-img" />
              </a>
            )}
            {showroom && (
              <a href={showroom.url} target="_blank" rel="noreferrer">
                <img src="/nayla-live.jpg" alt="Showroom Live" className="live-img" />
              </a>
            )}
            {!idnLive && !showroom && (
              <p className="text-muted">Belum ada live saat ini.</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default NaylaSchedule;