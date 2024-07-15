'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '@/app/ui/Header';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Layout({ children }) {
  return (
    <Container>
    <Row>
    
      <Col>
      <Stack gap={10} className="col-md-6 mx-auto"><Header/></Stack></Col>
      
    </Row>
    
    <br/>
    
    <Row>
      <Col><Stack gap={10} className="col-md-6 mx-auto">{children}</Stack></Col>
    </Row>
  </Container>
  );
}
