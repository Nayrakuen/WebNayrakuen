import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

function ContainerInsideExample() {
  const [language, setLanguage] = useState('id');

  const content = {
    id: {
      brand: "Nayrakuen | ナイラの楽園",
      profil: "Profil",
      event: "Event",
      galeri: "Galeri",
      tentangKami: "Tentang Kami"
    },
    jp: {
      brand: "ナイラの楽園 | Nayrakuen",
      profil: "プロフィール",
      event: "イベント",
      galeri: "ギャラリー",
      tentangKami: "私たちについて"
    }
  };

  const current = content[language];

  return (
    <Navbar expand="lg" fixed="top" className="navbar-maroon">
      <Container className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <Navbar.Brand href="#" className="me-2">{current.brand}</Navbar.Brand>
          <Nav>
            <NavDropdown title={current.menu} id="basic-nav-dropdown">
              <NavDropdown.Item href="#profil">{current.profil}</NavDropdown.Item>
              <NavDropdown.Item href="#event">{current.event}</NavDropdown.Item>
              <NavDropdown.Item href="#galeri">{current.galeri}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#tentang-kami">{current.tentangKami}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>

        {/* Tombol translate */}
        <div className="d-flex align-items-center">
          <Image
            src="/Indonesia.jpg"
            alt="ID"
            width={30}
            height={20}
            className="me-2"
            style={{ cursor: 'pointer'}}
            onClick={() => setLanguage('id')}
          />
          <Image
            src="/Japan.jpg"
            alt="JP"
            width={30}
            height={20}
            style={{ cursor: 'pointer', border: language === 'jp' ? '2px solid red' : 'none' }}
            onClick={() => setLanguage('jp')}
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
