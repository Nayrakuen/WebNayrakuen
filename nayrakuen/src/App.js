import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import NavbarComponent from './components/NavbarComponents';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import Schedule from './components/NaylaSchedule';
import AboutNayla from './components/AboutNayla';
import Gallery from './components/Gallery';
import TentangKami from './components/TentangKami';
import EventPage from './components/EventPage';
import NayrakuenStruktur from './components/NayrakuenStruktur';
import ScrollToTop from './components/ScrollToTop';
import translate from './translate.json';
import Footer from "./components/Footer";

const getPageTitle = (pathname) => {
  switch (pathname) {
    case '/':
      return 'Nayrakuen';
    case '/schedule':
      return 'Nayrakuen - Schedule';
    case '/about-nayla':
      return 'Nayrakuen - About Nayla';
    case '/gallery':
      return 'Nayrakuen - Gallery';
    case '/tentang-kami':
      return 'Nayrakuen - Tentang Kami';
    case '/event':
      return 'Nayrakuen - Event';
    case '/struktur-organisasi':
      return 'Nayrakuen - Struktur Nayrakuen';
    default:
      return 'Nayrakuen';
  }
};

function AppWrapper() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(location.pathname === '/');
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  useEffect(() => {
    document.title = getPageTitle(location.pathname);
  }, [location.pathname]);

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
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/schedule" element={<Schedule t={t} />} />
        <Route path="/about-nayla" element={<AboutNayla t={t} />} />
        <Route path="/gallery" element={<Gallery t={t} />} />
        <Route path="/tentang-kami" element={<TentangKami t={t} />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/struktur-nayrakuen" element={<NayrakuenStruktur />} />
      </Routes>
      <Footer />
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
