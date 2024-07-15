'use client'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import {CurrentUserContext} from '@/app/blogs/layout'

function UpdateBlog({id, imageP, titleP, contentP}) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(titleP);
  const [content, setContent] = useState(contentP);
  const [image, setImage] = useState();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const handleClose = () =>{

    setShow(false);
    setTimeout(2000);
    
  } 
  const handleShow = () => {
   
    const token = localStorage.getItem("token");
    if ( !token ) {
      alert("Bạn cần đăng nhập để tạo blog!"); // Sử dụng alert của document
    } else {
        console.log(token);
  
      setShow(true); // Mở modal nếu đã đăng nhập
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('token');

    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });
        // Xử lý thành công, có thể thêm thông báo hoặc cập nhật danh sách blog
        handleClose();
        setTimeout(() => {
          setCurrentUser(!currentUser);
         // Làm mới trang sau 2 giây
        }, 500);
    
    } catch (error) {
      console.log('Error posting blog:', error);
    }
  };

  return (
    <>
      <Button variant="outline-warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhập blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="example title ..."
                value={title}
           
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Upload Image</Form.Label>
              {imageP && (
              <div>
                <img src={imageP} alt="Current Blog Image" style={{ maxWidth: '100%' }} />
                <p className="text-muted">Current Image</p>
              </div>
            )}
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Update Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateBlog;
