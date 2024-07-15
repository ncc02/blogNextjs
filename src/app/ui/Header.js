"use client";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useAuth } from "@/app/auth/AuthContext.js";
import { useRouter } from 'next/navigation'; 
import Search from '@/app/ui/Search.js';

function Header() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const { logout } = useAuth();
  //const router = useRouter();
  
  const handleLogout = () => {
    setHasToken(false);
    logout(); // Call the logout function from AuthContext
    router.replace('/blogs');
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    setHasToken(!!token); // Update state based on token existence
  }, [hasToken]);

  return (
    <Navbar bg="primary" className="bg-body-tertiary" style={{ width: '40rem' }}>
      <Container>
      <Link href={`/blogs`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2>Blogger</h2>
        </Link> 
       
       <div class="pt-3">
       <Search/>
       </div>

       <div className="d-flex justify-content-end">
       {hasToken ? (
        <>
          <Link href="/blogs/my"><Button  variant="outline-dark"> My Blog </Button></Link>
          <Button variant="dark" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link href="/login"><Button  variant="outline-dark">Login</Button></Link>
          <Link href="/register"><Button  variant="dark">Register</Button></Link>
        </>
      )}
        </div>
            
         
      </Container>
     </Navbar>
  );
}

export default Header;