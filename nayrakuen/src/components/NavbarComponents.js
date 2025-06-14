import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function ContainerInsideExample() {
  return (
    <Navbar expand="lg" className="navbar-maroon">
      <Container>
        <Navbar.Brand href="#">Nayrakuen | ナイラの楽園</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;