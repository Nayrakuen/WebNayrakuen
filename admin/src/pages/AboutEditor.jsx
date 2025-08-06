import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import './AboutEditor.css';

function AboutEditor() {
  const [miniProfile, setMiniProfile] = useState('');
  const [aboutNayla, setAboutNayla] = useState('');
  const [tentangKami, setTentangKami] = useState('');
  const [tentangKamiId, setTentangKamiId] = useState(null);
  const [message, setMessage] = useState({ section: '', text: '' });
  const [loading, setLoading] = useState({ mini: false, about: false, kami: false });

  useEffect(() => {
    axios.get('https://backend-seven-nu-19.vercel.app/api/mini-profile')
      .then(res => {
        const content = (res.data.content || '').replace(/\\n/g, '\n');
        setMiniProfile(content);
      });

    axios.get('https://backend-seven-nu-19.vercel.app/api/about-nayla')
      .then(res => {
        const content = (res.data.content || '').replace(/\\n/g, '\n');
        setAboutNayla(content);
      });

    axios.get('https://backend-seven-nu-19.vercel.app/api/tentang-kami')
      .then(res => {
        setTentangKami(res.data.content || '');
        setTentangKamiId(res.data.id);
      });
  }, []);

  const handleSave = async (type) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      if (type === 'mini') {
        const content = miniProfile.replace(/\n/g, '\\n');
        await axios.put('https://backend-seven-nu-19.vercel.app/api/mini-profile', { content });
        setMessage({ section: 'mini', text: 'Mini Profile berhasil disimpan!' });
      } else if (type === 'about') {
        const content = aboutNayla.replace(/\n/g, '\\n');
        await axios.post('https://backend-seven-nu-19.vercel.app/api/about-nayla', { content });
        setMessage({ section: 'about', text: 'About Nayla berhasil disimpan!' });
      } else if (type === 'kami') {
        await axios.put(`https://backend-seven-nu-19.vercel.app/api/tentang-kami/${tentangKamiId}`, { content: tentangKami });
        setMessage({ section: 'kami', text: 'Tentang Kami berhasil disimpan!' });
      }
    } catch {
      setMessage({ section: type, text: 'Gagal menyimpan.' });
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const renderPreview = (text) =>
    text.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>);

  return (
    <div className="manage-schedule-container">
      <Sidebar />
      <div className="manage-schedule-content">
        <h2>Kelola Narasi</h2>

        <form className="schedule-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="miniProfile">Mini Profile</label>
          <textarea
            id="miniProfile"
            rows={6}
            value={miniProfile}
            onChange={(e) => setMiniProfile(e.target.value)}
          />
          <button type="button" onClick={() => handleSave('mini')} disabled={loading.mini}>
            {loading.mini ? 'Menyimpan...' : 'Simpan'}
          </button>
          {message.section === 'mini' && <p className="status-message">{message.text}</p>}
          <div className="preview">
            <h4>Preview:</h4>
            {renderPreview(miniProfile)}
          </div>

          <hr />

          <label htmlFor="aboutNayla">About Nayla / Profil Lengkap</label>
          <textarea
            id="aboutNayla"
            rows={8}
            value={aboutNayla}
            onChange={(e) => setAboutNayla(e.target.value)}
          />
          <button type="button" onClick={() => handleSave('about')} disabled={loading.about}>
            {loading.about ? 'Menyimpan...' : 'Simpan'}
          </button>
          {message.section === 'about' && <p className="status-message">{message.text}</p>}
          <div className="preview">
            <h4>Preview:</h4>
            {renderPreview(aboutNayla)}
          </div>

          <hr />

          <label htmlFor="tentangKami">Tentang Komunitas Nayrakuen</label>
          <textarea
            id="tentangKami"
            rows={10}
            value={tentangKami}
            onChange={(e) => setTentangKami(e.target.value)}
          />
          <button type="button" onClick={() => handleSave('kami')} disabled={loading.kami}>
            {loading.kami ? 'Menyimpan...' : 'Simpan'}
          </button>
          {message.section === 'kami' && <p className="status-message">{message.text}</p>}
          <div className="preview">
            <h4>Preview:</h4>
            {renderPreview(tentangKami)}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutEditor;
