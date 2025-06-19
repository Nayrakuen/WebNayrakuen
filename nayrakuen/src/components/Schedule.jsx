import React, { useEffect, useState } from "react";
import axios from "axios";

function TheaterSchedule() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/theater");
        setShows(response.data.theater);
      } catch (error) {
        console.error("Gagal mengambil data theater:", error);
      }
    };

    fetchTheater();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Jadwal Theater</h2>
      <div className="row">
        {shows.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100">
              <img src={item.poster} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Tanggal: {new Date(item.date).toLocaleDateString("id-ID")}</p>
                <p className="card-text">Member: {item.member_count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TheaterSchedule;
