import React from "react";
import HeroClouds from './HeroClouds';
import NaylaProfile from './NaylaProfile';
import NewsPreview from '../components/NewsPreview';
import EventCard from './EventCard';
import TheaterSchedule from './TheaterSchedule';
import NayArt from './NayArt';
import FanMessages from './FanMessages';
import Footer from './Footer';

const Home = ({ t, language }) => {
  return (
    <>
      <HeroClouds />
      <NaylaProfile />
      <NewsPreview />
      <EventCard t={t} language={language} />
      <TheaterSchedule />
      <NayArt t={t} />
      <FanMessages />
    </>
  );
};

export default Home;
