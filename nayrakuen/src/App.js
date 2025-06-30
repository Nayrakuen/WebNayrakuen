import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavbarComponent from './components/NavbarComponents';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';
import Schedule from './components/NaylaSchedule';
import AboutNayla from './components/AboutNayla';
import Gallery from './components/Gallery';
import TentangKami from './components/TentangKami';
import ScrollToTop from './components/ScrollToTop';
import translate from './translate.json';

function AppWrapper() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(location.pathname === '/');
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  const t = (section, key) => translate[language][section][key];

  if (isLoading && location.pathname === '/') {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <>
      <ScrollToTop />
      <NavbarComponent language={language} setLanguage={setLanguage} t={t} />

      <Routes>
        <Route path="/" element={<Home t={t} language={language} />} />
        <Route path="/schedule" element={<Schedule t={t} />} />
        <Route path="/about-nayla" element={<AboutNayla t={t} />} />
        <Route path="/gallery" element={<Gallery t={t} />} />
        <Route path="/tentang-kami" element={<TentangKami t={t} />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
