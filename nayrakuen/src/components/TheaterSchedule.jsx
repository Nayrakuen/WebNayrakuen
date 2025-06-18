import React, { useEffect, useState } from "react";
import axios from "axios";

function NaylaSchedule() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/theater")
      .then((response) => {
        const filtered = response.data.filter((item) =>
          item.members?.some((member) =>
            member.toLowerCase().includes("nayla")
          )
        );
        setShows(filtered);
      })
      .catch((error) => {
        console.error("Gagal ambil data teater:", error);
      });
  }, []);

  return (
    <div className="py-5">
      <div className="container">
        <h3 className="mb-3 text-center">Teater Schedule</h3>

        <div className="table-responsive">
          <table className="table table-bordered table-sm align-middle">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Tanggal</th>
                <th>Judul Show</th>
                <th style={{ width: "20%" }}>Jam</th>
              </tr>
            </thead>
            <tbody>
              {shows.length > 0 ? (
                shows.map((item, index) => (
                  <tr key={index}>
                    <td>{new Date(item.date).toLocaleDateString("id-ID")}</td>
                    <td>{item.title}</td>
                    <td>
                      {new Date(item.date).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    Tidak ada show minggu ini
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default NaylaSchedule;
