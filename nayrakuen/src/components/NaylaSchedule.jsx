import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import "./NaylaSchedule.css";

const api = axios.create({
  validateStatus: () => true,
});

function NaylaSchedule() {
  const [shows, setShows] = useState([]);
  const [vcSchedule, setVcSchedule] = useState([]);
  const [idnLive, setIdnLive] = useState(null);
  const [showroom, setShowroom] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const fetchSchedule = async () => {
      const res = await api.get(
        "https://backend-seven-nu-19.vercel.app/api/nayla/schedule"
      );
      if (res.status === 200) {
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setShows(sorted);
      } else {
        setShows([]);
      }
    };

    const fetchVC = async () => {
      const res = await api.get(
        "https://backend-seven-nu-19.vercel.app/api/vc-schedule"
      );
      if (res.status === 200) {
        const sortedVC = [...res.data].sort((a, b) => {
          const dateDiff = new Date(a.tanggal) - new Date(b.tanggal);
          if (dateDiff !== 0) return dateDiff;
          return a.sesi - b.sesi;
        });
        setVcSchedule(sortedVC);
      } else {
        setVcSchedule([]);
      }
    };

    const fetchLive = async () => {
      const showroomRes = await api.get(
        "https://backend-seven-nu-19.vercel.app/api/nayla/showroom"
      );
      if (showroomRes.status === 200) {
        setShowroom(showroomRes.data);
      } else {
        setShowroom(null);
      }

      const idnRes = await api.get(
        "https://backend-seven-nu-19.vercel.app/api/nayla/idnlive"
      );
      if (idnRes.status === 200) {
        setIdnLive(idnRes.data);
      } else {
        setIdnLive(null);
      }
    };

    fetchSchedule();
    fetchVC();
    fetchLive();
  }, []);

  const getTimeRange = (startTime, durationMinutes = 15) => {
    if (!startTime) return "";
    const [hour, minute] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    const start = new Date(date);
    const end = new Date(date);
    end.setMinutes(end.getMinutes() + durationMinutes);

    const format = (d) =>
      `${String(d.getHours()).padStart(2, "0")}:${String(
        d.getMinutes()
      ).padStart(2, "0")}`;

    return `${format(start)} - ${format(end)}`;
  };

  const groupedVC = vcSchedule.reduce((acc, item) => {
    const dateStr = new Date(item.tanggal).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(item);
    return acc;
  }, {});

  return (
    <div className="schedule-wrapper">
      <div className="schedule-container">
        <h2 className="schedule-title" data-aos="fade-down">
          Schedule
        </h2>

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
                    <td>
                      {item.members?.length > 0 ? (
                        item.members.map((member, i) => (
                          <span key={member.id}>
                            {member.name.toLowerCase() === "nayla" ? (
                              <strong>{member.name}</strong>
                            ) : (
                              member.name
                            )}
                            {i < item.members.length - 1 ? ", " : ""}
                          </span>
                        ))
                      ) : (
                        "Nayla dan member lainnya"
                      )}
                    </td>
                    <td>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ticket-link"
                        >
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
                  <td colSpan="4" className="text-center">
                    Tidak ada jadwal tampil.
                  </td>
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

          {Object.keys(groupedVC).length > 0 ? (
            Object.keys(groupedVC).map((date) => (
              <div key={date}>
                <h4 className="vc-subtitle">{date}</h4>
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
                    {groupedVC[date].map((item) => (
                      <tr key={item.id}>
                        <td>{item.sesi}</td>
                        <td>{item.nama}</td>
                        <td>{getTimeRange(item.preparation, 15)}</td>
                        <td>{getTimeRange(item.masuk, 60)}</td>
                        <td>
                          <span
                            className={`status-${item.status.toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-center">Belum ada jadwal video call.</p>
          )}
        </section>

        <section className="schedule-section" data-aos="fade-up">
          <div className="subtitle-wrapper">
            <div className="subtitle-line"></div>
            <h3 className="schedule-subtitle">Live</h3>
          </div>

          <div className="live-box">
            {idnLive && (
              <div className="live-item">
                <a href={idnLive.url} target="_blank" rel="noreferrer">
                  <img
                    src={idnLive.image_url}
                    alt={idnLive.title}
                    className="live-img"
                    loading="lazy"
                  />
                </a>
                <p className="live-title">
                  <strong style={{ color: "red" }}>IDN Live:</strong>{" "}
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {idnLive.title}
                  </span>
                </p>
                <a
                  href={idnLive.url}
                  className="live-viewers"
                  target="_blank"
                  rel="noreferrer"
                >
                  {idnLive.view_count?.toLocaleString("id-ID")} penonton
                </a>
              </div>
            )}

            {showroom && (
              <a href={showroom?.url || "#"} target="_blank" rel="noreferrer">
                <img
                  src="/nayla-live.jpg"
                  alt="Showroom Live"
                  className="live-img"
                />
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