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

  useEffect(() => {
    axios.get('http://localhost:5000/api/mini-profile')
      .then(res => {
        const content = (res.data.content || '').replace(/\\n/g, '\n');
        setMiniProfile(content);
      });

    axios.get('http://localhost:5000/api/about-nayla')
      .then(res => {
        const content = (res.data.content || '').replace(/\\n/g, '\n');
        setAboutNayla(content);
      });

    axios.get('http://localhost:5000/api/tentang-kami')
      .then(res => {
        setTentangKami(res.data.content || '');
        setTentangKamiId(res.data.id);
      });
  }, []);

  const handleSaveMiniProfile = () => {
    const content = miniProfile.replace(/\n/g, '\\n');
    axios.put('http://localhost:5000/api/mini-profile', { content })
      .then(() => setMessage({ section: 'mini', text: 'Mini Profile berhasil disimpan!' }))
      .catch(() => setMessage({ section: 'mini', text: 'Gagal menyimpan Mini Profile.' }));
  };

  const handleSaveAboutNayla = () => {
    const content = aboutNayla.replace(/\n/g, '\\n');
    axios.post('http://localhost:5000/api/about-nayla', { content })
      .then(() => setMessage({ section: 'about', text: 'About Nayla berhasil disimpan!' }))
      .catch(() => setMessage({ section: 'about', text: 'Gagal menyimpan About Nayla.' }));
  };

  const handleSaveTentangKami = () => {
    axios.put(`http://localhost:5000/api/tentang-kami/${tentangKamiId}`, { content: tentangKami })
      .then(() => setMessage({ section: 'kami', text: 'Tentang Kami berhasil disimpan!' }))
      .catch(() => setMessage({ section: 'kami', text: 'Gagal menyimpan Tentang Kami.' }));
  };

  const renderPreview = (text) =>
    text.split(/\n{2,}/).map((para, i) => <p key={i}>{para}</p>);

  return (
    <div className="manage-narrative-container">
      <Sidebar />
      <div className="manage-narrative-content">
        <div className="narrative-wrapper">
          <h2>Manage Narrative</h2>

          <div className="narrative-section">
            <label htmlFor="miniProfile">Mini Profile</label>
            <textarea
              id="miniProfile"
              rows={7}
              value={miniProfile}
              onChange={(e) => setMiniProfile(e.target.value)}
            />
            <button onClick={handleSaveMiniProfile}>Simpan</button>
            {message.section === 'mini' && <p className="status-message">{message.text}</p>}
            <div className="preview">
              <h3>Preview:</h3>
              {renderPreview(miniProfile)}
            </div>
          </div>

          <div className="narrative-section">
            <label htmlFor="aboutNayla">About Nayla / Profile Lengkap</label>
            <textarea
              id="aboutNayla"
              rows={10}
              value={aboutNayla}
              onChange={(e) => setAboutNayla(e.target.value)}
            />
            <button onClick={handleSaveAboutNayla}>Simpan</button>
            {message.section === 'about' && <p className="status-message">{message.text}</p>}
            <div className="preview">
              <h3>Preview:</h3>
              {renderPreview(aboutNayla)}
            </div>
          </div>

          <div className="narrative-section">
            <label htmlFor="tentangKami">Tentang Nayrakuen / Komunitas</label>
            <textarea
              id="tentangKami"
              rows={12}
              value={tentangKami}
              onChange={(e) => setTentangKami(e.target.value)}
            />
            <button onClick={handleSaveTentangKami}>Simpan</button>
            {message.section === 'kami' && <p className="status-message">{message.text}</p>}
            <div className="preview">
              <h3>Preview:</h3>
              {renderPreview(tentangKami)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutEditor;
