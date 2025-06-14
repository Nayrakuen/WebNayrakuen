import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponents'
import HeroCarousel from './components/HeroCarousel';
import EventCard from './components/EventCard';
import Gallery from './components/Gallery';
import TheaterSchedule from './components/TheaterSchedule';

function App() {
  return (
    <div className="App">
      <NavbarComponent/>
      <HeroCarousel />
      <container>
        <EventCard />
      </container>
      <Gallery />
      <TheaterSchedule />
    </div>
  );
}

export default App;
