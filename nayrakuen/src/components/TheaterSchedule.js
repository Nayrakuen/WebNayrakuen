import React, { useEffect, useState } from "react";
import axios from "axios";

function TheaterSchedule() {
  const [shows, setShows] = useState([]);
  const targetMember = "Nayla Suji";

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/theater");
        const filteredShows = response.data.theater.filter((show) =>
          show.members?.some((member) =>
            member.name.toLowerCase().includes(targetMember.toLowerCase())
          )
        );
        setShows(filteredShows);
      } catch (error) {
        console.error("Gagal mengambil data theater:", error);
      }
    };

    fetchTheater();
  }, []);

  return (
<div className="table-responsive">
  <table className="table table-bordered table-hover align-middle">
    <thead className="table-dark text-center">
      <tr>
        <th>No</th>
        <th>Judul Show</th>
        <th>Tanggal</th>
        <th>Poster</th>
        <th>Jumlah Member</th>
      </tr>
    </thead>
    <tbody>
      {shows.length > 0 ? (
        shows.map((item, index) => (
          <tr key={item.id}>
            <td className="text-center">{index + 1}</td>
            <td>{item.title}</td>
            <td>{new Date(item.date).toLocaleDateString("id-ID")}</td>
            <td className="text-center">
              <img src={item.poster} alt={item.title} style={{ width: "100px", borderRadius: "6px" }} />
            </td>
            <td className="text-center">{item.member_count}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center">
            Belum ada jadwal untuk {targetMember}
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
  );
}

export default TheaterSchedule;
