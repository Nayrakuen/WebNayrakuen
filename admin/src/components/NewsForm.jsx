import React, { useState } from 'react';
import axios from 'axios';

const NewsForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    let image_url = '';
    let cloudinary_id = '';

    if (imageFile) {
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('folder', 'news');

        const res = await axios.post(
          'https://backend-seven-nu-19.vercel.app/api/news/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        image_url = res.data.imageUrl;
        cloudinary_id = res.data.publicId;
      } catch (err) {
        alert('Gagal upload gambar');
        console.error(err);
        setUploading(false);
        return;
      }
    }

    try {
      await axios.post(
        'https://backend-seven-nu-19.vercel.app/api/news',
        { title, content, image_url, cloudinary_id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Berita berhasil ditambahkan');
      setTitle('');
      setContent('');
      setImageFile(null);
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Gagal menambahkan berita');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="news-form">
      <label>Judul</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Konten</label>
      <textarea
        rows="5"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <label>Pilih Gambar (opsional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button type="submit" disabled={uploading}>
        {uploading ? 'Mengupload...' : 'Simpan'}
      </button>
    </form>
  );
};

export default NewsForm;
