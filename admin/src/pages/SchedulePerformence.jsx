import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import './SchedulePerformence.css';

const ManageSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [form, setForm] = useState({
    tanggal: '', jam: '', setlist: '', catatan: ''
  });
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSchedule = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teater');
      setSchedule(res.data);
    } catch (error) {
      console.error("Gagal ambil data jadwal teater:", error);
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
        await axios.put(`http://localhost:5000/api/teater/${editId}`, form);
      } else {
        await axios.post('http://localhost:5000/api/teater', form);
      }

      fetchSchedule();
      setForm({ tanggal: '', jam: '', setlist: '', catatan: '' });
      setEditId(null);
    } catch (error) {
      console.error("Gagal simpan jadwal teater:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teater/${id}`);
      fetchSchedule();
    } catch (error) {
      console.error("Gagal hapus jadwal teater:", error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      tanggal: item.tanggal,
      jam: item.jam,
      setlist: item.setlist,
      catatan: item.catatan,
    });
    setEditId(item.id);
  };

  const handleCancelEdit = () => {
    setForm({ tanggal: '', jam: '', setlist: '', catatan: '' });
    setEditId(null);
  };

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Kelola Jadwal Nayla</h2>
        <form className="schedule-form" onSubmit={handleSubmit}>
          <label>Tanggal</label>
          <input type="date" name="tanggal" value={form.tanggal} onChange={handleChange} required />

          <label>Jam</label>
          <input type="time" name="jam" value={form.jam} onChange={handleChange} required />

          <label>Setlist / Judul Acara</label>
          <input type="text" name="setlist" value={form.setlist} onChange={handleChange} required />

          <label>Catatan</label>
          <textarea name="catatan" value={form.catatan} onChange={handleChange} />

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

        <h3>Daftar Jadwal Teater</h3>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jam</th>
              <th>Setlist / Acara</th>
              <th>Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {schedule.length > 0 ? (
              schedule.map((item) => (
                <tr key={item.id}>
                  <td>{item.tanggal}</td>
                  <td>{item.jam}</td>
                  <td>{item.setlist}</td>
                  <td>{item.catatan}</td>
                  <td>
                    <button onClick={() => handleEdit(item)} disabled={isSubmitting}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} disabled={isSubmitting}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Belum ada jadwal</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSchedule;
