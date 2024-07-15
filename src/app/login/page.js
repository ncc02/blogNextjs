"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/auth/AuthContext.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {


  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username);
    console.log(password);
    
    await login(username, password);
  };

  return (
    
      <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control  
        type = "text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <Form.Text className="text-muted">
          Click register if you don't have an account already!
        </Form.Text>
    </Form.Group>
      
      <Button variant="dark" type="submit">
        Submit
      </Button>
      
    </Form>
    
  );
};

export default Login;
