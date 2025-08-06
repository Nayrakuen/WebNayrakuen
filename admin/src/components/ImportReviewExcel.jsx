import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://backend-seven-nu-19.vercel.app/api/admin-pesan';

const ImportReviewExcel = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Pilih file Excel terlebih dahulu');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/import-review-excel`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(res.data.message || 'Upload berhasil');
      setFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Gagal import review:", err);
      const msg = err?.response?.data?.error || 'Gagal import file. Pastikan format Excel berisi kolom: Nama, Review, Rating';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={{ marginBottom: '1rem' }}>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
        disabled={loading}
      />
      {file && <span style={{ marginLeft: '0.5rem' }}>{file.name}</span>}
      <button
        type="submit"
        disabled={loading}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Mengupload...' : 'Upload Excel'}
      </button>
    </form>
  );
};

export default ImportReviewExcel;
