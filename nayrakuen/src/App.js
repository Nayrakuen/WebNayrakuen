import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComponent from './components/NavbarComponents';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';
import Schedule from './components/NaylaSchedule';
import AboutNayla from './components/AboutNayla';
import Gallery from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      ) : (
        <Router>
          <ScrollToTop />
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/about-nayla" element={<AboutNayla />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
