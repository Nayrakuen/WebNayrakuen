import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ImportReviewExcel = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setStatus('Pilih file terlebih dahulu');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      try {
        const response = await axios.post('https://backend-seven-nu-19.vercel.app/api/admin-pesan/import', {
          data: jsonData,
        });

        setStatus(response.data.message || 'Berhasil mengimpor');
      } catch (error) {
        console.error(error);
        setStatus('Gagal mengimpor');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Import</button>
      <p>{status}</p>
    </div>
  );
};

export default ImportReviewExcel;
