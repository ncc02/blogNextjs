'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import {CurrentUserContext} from '@/app/blogs/layout'
import { useRouter } from 'next/navigation';
import { MdOutlineCreate } from "react-icons/md";

function CreateBlog() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const {
    currentUser,
    setCurrentUser
  } = useContext(CurrentUserContext);

  const handleClose = () =>{

    setShow(false);
    setTimeout(2000);
    
  } 
  const handleShow = () => {
    const token = localStorage.getItem("token");
    if ( !token ) {
      
      router.push('/login') // Sử dụng alert của document
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formData
      });
      if (response.ok) {
        // Xử lý thành công, có thể thêm thông báo hoặc cập nhật danh sách blog
        
        handleClose();
        setTimeout(() => {
          //alert("Thêm blog thành công, vui lòng Refresh lại trang !");
            setCurrentUser(!currentUser);
         // Làm mới trang sau 2 giây
        }, 500);
        
      } else {
        // Xử lý lỗi
        console.error('Error posting blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <>
 <Button variant="outline-dark" onClick={handleShow} className="d-flex align-items-center">
      <MdOutlineCreate className="me-2" /> {/* me-2 để thêm khoảng cách giữa icon và text */}
      Blog
    </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo blog mới</Modal.Title>
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
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Post Blog
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBlog;
