import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './ManageSchedule.css';

const API_BASE_URL = 'https://backend-seven-nu-19.vercel.app/api/vc-schedule';

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [form, setForm] = useState({
    sesi: '',
    nama: '',
    preparation: '',
    masuk: '',
    status: 'Ready',
  });
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSchedule = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setSchedule(res.data);
    } catch (error) {
      console.error('Gagal ambil data jadwal:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/${editId}`, {
          ...form,
          sesi: parseInt(form.sesi, 10),
          id: editId,
        });
      } else {
        await axios.post(API_BASE_URL, {
          ...form,
          sesi: parseInt(form.sesi, 10),
        });
      }

      fetchSchedule();
      setForm({ sesi: '', nama: '', preparation: '', masuk: '', status: 'Ready' });
      setEditId(null);
    } catch (error) {
      console.error('Gagal simpan jadwal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchSchedule();
    } catch (error) {
      console.error('Gagal hapus jadwal:', error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      sesi: item.sesi.toString(),
      nama: item.nama,
      preparation: item.preparation,
      masuk: item.masuk,
      status: item.status,
    });
    setEditId(item.id);
  };

  const handleCancelEdit = () => {
    setForm({ sesi: '', nama: '', preparation: '', masuk: '', status: 'Ready' });
    setEditId(null);
  };

  const getTimeRange = (startTime, durationMinutes = 15) => {
    if (!startTime) return '';
    const [hour, minute] = startTime.split(':').map(Number);
    const start = new Date();
    start.setHours(hour, minute, 0, 0);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    const format = (d) =>
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

    return `${format(start)} - ${format(end)}`;
  };

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Kelola Jadwal VC</h2>
        <form className="schedule-form" onSubmit={handleSubmit}>
          <label>Sesi</label>
          <input type="number" name="sesi" value={form.sesi} onChange={handleChange} required />
          <label>Nama</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} required />
          <label>Preparation</label>
          <input type="time" name="preparation" value={form.preparation} onChange={handleChange} required />
          <label>Masuk</label>
          <input type="time" name="masuk" value={form.masuk} onChange={handleChange} required />
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Ready">Ready</option>
            <option value="sold out">Sold Out</option> {/* ✅ Sesuaikan value dengan isi dari database */}
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? editId
                  ? 'Menyimpan...'
                  : 'Menambahkan...'
                : editId
                ? 'Simpan Perubahan'
                : 'Tambah Jadwal'}
            </button>
            {editId && (
              <button type="button" onClick={handleCancelEdit} disabled={isSubmitting}>
                Batal
              </button>
            )}
          </div>
        </form>

        <h3>Daftar Jadwal</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Sesi</th>
              <th>Nama</th>
              <th>Preparation</th>
              <th>Masuk</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.map((item) => (
                <tr key={item.id}>
                  <td>{item.sesi}</td>
                  <td>{item.nama}</td>
                  <td>{getTimeRange(item.preparation, 15)}</td>
                  <td>{getTimeRange(item.masuk, 60)}</td>
                  <td>{item.status}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} disabled={isSubmitting}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} disabled={isSubmitting}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Belum ada jadwal</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSchedule;
