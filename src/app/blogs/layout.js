'use client'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '@/app/ui/Header';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateBlog from '@/app/ui/CreateBlog.js'

import { createContext, useContext, useState } from 'react';

export const CurrentUserContext = createContext(false);

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}> 
    <Container>
    <Row>
    
      <Col>
      <Stack gap={10} className="col-md-6 mx-auto"><Header/></Stack></Col>
      
    </Row>
    
    <br/>
    <Stack gap={10} className="col-md-6 mx-auto"><div><CreateBlog/></div></Stack>
    <br/>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
  </CurrentUserContext.Provider>
  );
}

