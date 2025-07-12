import React from 'react';
import Sidebar from '../components/Sidebar';

const ManageGallery = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ padding: '2rem' }}>
        <h2>Kelola Galeri</h2>
        {/* Nanti isi upload dan list gambar */}
      </div>
    </div>
  );
};

export default ManageGallery;