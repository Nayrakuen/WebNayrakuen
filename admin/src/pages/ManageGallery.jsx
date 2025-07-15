import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './ManageSchedule.css';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState('');

  const fetchGallery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Gagal ambil data galeri:', err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !folder) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const uploadRes = await axios.post('http://localhost:5000/api/gallery/upload', formData);
      const { imageUrl, publicId } = uploadRes.data;

      await axios.post('http://localhost:5000/api/gallery', {
        imageUrl,
        publicId,
        folder,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      setFile(null);
      setFolder('');
      fetchGallery();
    } catch (err) {
      console.error('Gagal upload:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchGallery();
    } catch (err) {
      console.error('Gagal hapus:', err);
    }
  };

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Kelola Galeri</h2>

        <form className="schedule-form" onSubmit={handleUpload}>
          <label>Folder</label>
          <input
            type="text"
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            required
          />

          <label>Pilih Gambar</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit">Upload Gambar</button>
        </form>

        <h3>Daftar Galeri</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Folder</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {images.length > 0 ? (
              images.map((img) => (
                <tr key={img.id}>
                  <td>
                    <img src={img.image_url} alt="preview" style={{ width: '100px', borderRadius: '6px' }} />
                  </td>
                  <td>{img.folder}</td>
                  <td>{new Date(img.created_at).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleDelete(img.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Belum ada gambar</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageGallery;