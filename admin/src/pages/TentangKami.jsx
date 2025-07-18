import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TentangKami.css";

function ManageAboutUs() {
  const [content, setContent] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/tentang-kami")
      .then(res => {
        setContent(res.data.content || "");
        setId(res.data.id);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage("Gagal memuat data.");
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tentang-kami/${id}`, {
        content,
      });
      setMessage("Berhasil disimpan!");
    } catch (err) {
      console.error(err);
      setMessage("Gagal menyimpan.");
    }
  };

  if (loading) return <div>Memuat data...</div>;

  return (
    <div className="manage-about-container">
      <h2>Edit Narasi Tentang Kami</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis narasi tentang Nayrakuen..."
        rows={20}
      />
      <button onClick={handleSave}>Simpan</button>
      {message && <p className="message">{message}</p>}
      <div className="preview">
        <h3>Preview:</h3>
        {content
          .split(/\n{2,}/)
          .map((para, index) => (
            <p key={index}>{para}</p>
          ))}
      </div>
    </div>
  );
}

export default ManageAboutUs;
