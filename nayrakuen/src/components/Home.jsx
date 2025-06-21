import React from "react";
import HeroClouds from './HeroClouds';
import NaylaProfile from './NaylaProfile';
import EventCard from './EventCard';
import TheaterSchedule from './TheaterSchedule';
import NayArt from './NayArt';
import FanMessages from './FanMessages';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <HeroClouds />
      <NaylaProfile />
      <EventCard />
      <TheaterSchedule />
      <NayArt />
      <FanMessages />
      <Footer />
    </>
  );
};

export default Home;
