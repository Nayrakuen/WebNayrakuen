import React, { useState } from 'react';
import axios from 'axios';

const ImportReviewExcel = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Silakan pilih file Excel terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      await axios.post("http://localhost:5000/api/admin-pesan/import-review-excel", formData);
      alert("Berhasil mengimpor review dari Excel!");
      setFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("❌ Gagal import review:", err);
      alert("❌ Gagal mengimpor file. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} encType="multipart/form-data" style={{ marginBottom: '2rem' }}>
      <label style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
        Import dari File Excel
      </label>
      <input
        type="file"
        accept=".xlsx"
        onChange={(e) => setFile(e.target.files[0])}
        required
        style={{
          marginBottom: '0.5rem',
          padding: '0.4rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <button type="submit" className="import-btn" disabled={isUploading}>
        {isUploading ? "Mengunggah..." : "Import dari Excel"}
      </button>
    </form>
  );
};

export default ImportReviewExcel;
