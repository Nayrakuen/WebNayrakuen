import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import photo1 from '../assets/gallery/1.jpeg';
import photo2 from '../assets/gallery/2.jpeg';
import photo3 from '../assets/gallery/3.jpeg';
import './Gallery.css';

function Gallery() {
  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <img src={photo1} className="img-fluid" alt="Gallery 1" />
        </Col>
        <Col md={4}>
          <img src={photo2} className="img-fluid" alt="Gallery 2" />
        </Col>
        <Col md={4}>
          <img src={photo3} className="img-fluid" alt="Gallery 3" />
        </Col>
      </Row>
    </Container>
  );
}

export default Gallery;
