import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavbarComponents.css';

function ContainerInsideExample() {
  const [language, setLanguage] = useState('id');

  const content = {
    id: {
      brand: "Nayrakuen | ナイラの楽園",
      event: "Event",
      galeri: "Gallery",
      Schedule: "Schedule",
      AboutNayla: "About Nayla",
      tentangKami: "Tentang Kami"
    },
    jp: {
      brand: "ナイラの楽園 | Nayrakuen",
      event: "イベント",
      galeri: "ギャラリー",
      Schedule: "スケジュール",
      AboutNayla: "ナイラのプロフィール",
      tentangKami: "私たちについて"
    }
  };

  const current = content[language];

  return (
    <Navbar expand="lg" fixed="top" className="navbar-maroon">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          {current.brand}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />

        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
          <Nav>
            <NavDropdown
              title={<FaChevronDown className="custom-caret" />}
              id="basic-nav-dropdown"
              className="menu-white"
            >
              <NavDropdown.Item href="#event">{current.event}</NavDropdown.Item>
              <NavDropdown.Item href="/Gallery">{current.galeri}</NavDropdown.Item>
              <NavDropdown.Item href="/schedule">{current.Schedule}</NavDropdown.Item>
              <NavDropdown.Item href="/about-nayla">{current.AboutNayla}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#tentang-kami">{current.tentangKami}</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <div className="d-flex align-items-center mt-2 mt-lg-0">
            <Image
              src="/Indonesia.jpg"
              alt="ID"
              width={30}
              height={20}
              className="me-2"
              style={{ cursor: 'pointer' }}
              onClick={() => setLanguage('id')}
            />
            <Image
              src="/Japan.jpg"
              alt="JP"
              width={30}
              height={20}
              style={{ cursor: 'pointer' }}
              onClick={() => setLanguage('jp')}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
