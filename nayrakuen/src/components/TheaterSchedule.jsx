import React, { useEffect, useState } from "react";
import axios from "axios";

function NaylaSchedule() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchNaylaSchedule = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/nayla/schedule");
        setShows(response.data);
      } catch (error) {
        console.error("Gagal mengambil jadwal Nayla:", error);
      }
    };

    fetchNaylaSchedule();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Teater Schedule</h2>

      {shows.length === 0 ? (
        <p className="text-center text-muted">Tidak ada jadwal tampil minggu ini.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Poster</th>
                <th>Judul</th>
                <th>Tanggal</th>
                <th>Jam</th>
                <th>Tiket</th>
              </tr>
            </thead>
            <tbody>
              {shows.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {item.poster ? (
                      <img
                        src={item.poster}
                        alt={item.title}
                        style={{ width: "80px", height: "auto", borderRadius: "4px" }}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{item.title}</td>
                  <td>{new Date(item.date).toLocaleDateString("id-ID", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric"
                  })}</td>
                  <td>{new Date(item.date).toLocaleTimeString("id-ID", {
                    hour: "2-digit", minute: "2-digit"
                  })}</td>
                  <td>
                    {item.ticket_url ? (
                      <a
                        href={item.ticket_url}
                        className="btn btn-sm btn-outline-primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Beli Tiket
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NaylaSchedule;
