'use client'
import './Blog.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import UpdateBlog from '@/app/ui/UpdateBlog';
import { useContext } from 'react';
import {CurrentUserContext} from '@/app/blogs/layout'

const Blog = ({image, title, id, content, createAt, myblog}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const handleDel = () => {
   
      
        try {
          const token = localStorage.getItem("token"); // Lấy token từ localStorage
  
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}/`, {
            method: 'DELETE',
            headers: {
              "Authorization": `Token ${token}`, // Thêm token vào header
            },
          });
  

          setCurrentUser(!currentUser);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
     
   
  };


  return (
    <div className="card" style={{ width: '40rem', height:'15rem' }}>
      <Row>
        <Col>
      <img className="card-img-top" style={{ height: '15rem' }} src={image} alt="Card image cap" />
      </Col>
      <Col>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <small className="text-muted">
          Last updated: {createAt.toString().slice(0, 10)}
        </small>
        <p></p>

        
        {!myblog ? (
        <>
        <Link href={`/blogs/${id}`} passHref>
        <Button variant="dark">Read more</Button>
        </Link>
        </>
      ) : (
        <>
          <Link href={`/blogs/${id}`} passHref>
        <Button variant="outline-dark">Read</Button>
        </Link>
          
            <UpdateBlog id={id} imageP={image} titleP={title} contentP={content} />
          
          <Button  variant="outline-danger" onClick={handleDel}>Del</Button>
        </>
      )}
      </div>
      </Col>
      </Row>
    </div>
  );
};

export default Blog;
