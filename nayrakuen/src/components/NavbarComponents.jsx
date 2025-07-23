import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';
import './NavbarComponents.css';

function ContainerInsideExample({ language, setLanguage }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [expanded, setExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setExpanded(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <Navbar expand="lg" fixed="top" className="navbar-maroon" expanded={expanded}>
      <Container fluid className="px-4">
        
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          Nayrakuen | ナイラの楽園
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="custom-toggler"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="w-100 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center">
            
            {isDesktop ? (
              <Nav>
                <NavDropdown
                  id="nav-dropdown"
                  className="menu-white"
                  show={dropdownOpen}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  title=""
                >
                  <NavDropdown.Item as={Link} to="/event">Event</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/gallery">Galeri</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/schedule">Jadwal</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/about-nayla">Tentang Nayla</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/tentang-kami">Tentang Kami</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/struktur-nayrakuen">Struktur Nayrakuen</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/event" onClick={() => setExpanded(false)}>Event</Nav.Link>
                <Nav.Link as={Link} to="/gallery" onClick={() => setExpanded(false)}>Galeri</Nav.Link>
                <Nav.Link as={Link} to="/schedule" onClick={() => setExpanded(false)}>Jadwal</Nav.Link>
                <Nav.Link as={Link} to="/about-nayla" onClick={() => setExpanded(false)}>Tentang Nayla</Nav.Link>
                <Nav.Link as={Link} to="/tentang-kami" onClick={() => setExpanded(false)}>Tentang Kami</Nav.Link>
                <Nav.Link as={Link} to="/struktur-nayrakuen" onClick={() => setExpanded(false)}>Struktur Nayrakuen</Nav.Link>
              </Nav>
            )}

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

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;