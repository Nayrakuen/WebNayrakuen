import React, { useEffect, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from "aos";
import "aos/dist/aos.css";

import NavbarComponent from './components/NavbarComponents';
import HeroClouds from './components/HeroClouds';
import EventCard from './components/EventCard';
import NaylaProfile from './components/NaylaProfile';
import TheaterSchedule from './components/TheaterSchedule';
import Footer from './components/Footer';
import NayArt from './components/NayArt';
import LoadingScreen from './components/LoadingScreen';

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
        <div className="App">
          <NavbarComponent />
          <HeroClouds />
          <NaylaProfile />
          <EventCard />
          <TheaterSchedule />
          <NayArt />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
