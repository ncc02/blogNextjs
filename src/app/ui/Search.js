import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useState, useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import './Search.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
          if (searchTerm) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?search=${searchTerm}`) // Đường dẫn API của bạn
              .then(response => response.json())
              .then(data => {
                setBlogs(data); // Cập nhật dữ liệu kết quả tìm kiếm vào state
                // Xử lý dữ liệu kết quả tìm kiếm ở đây (ví dụ: cập nhật state để hiển thị kết quả)
                console.log(data);
              })
              .catch(error => {
                console.error('Error fetching search results:', error);
              });
          }
        }, 500); // Thời gian delay (milliseconds)
    
        return () => clearTimeout(delayDebounceFn); // Dọn dẹp timeout khi component unmount hoặc searchTerm thay đổi
      }, [searchTerm]); // Chỉ gọi lại useEffect khi searchTerm thay đổi
    
      const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
  return (
    <>
      {['bottom'].map((placement) => (
        <OverlayTrigger
         trigger="click"
         rootClose
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`} className="custom-tooltip">
              <ListGroup defaultActiveKey="#link1">
               
              {blogs && blogs.map(blog => (
                <ListGroup.Item action>
              <Link href={`/blogs/${blog.id}`} passHref className="my-custom-link">
            <Row>
             
                      {blog.image && (
                        <Col xs={3}>
              <div>
                <img src={`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`} alt="Blog Image" style={{ width:'50px', height: '50px' }} />
                <p className="text-muted"></p>
              </div>
              </Col>
            )}
            
                  <Col>
                    {blog.title}
                    </Col>
                    </Row>
                    </Link>
    
                </ListGroup.Item>
                    ))}
                              
         
                </ListGroup>
            </Tooltip>
          }
        >
           <InputGroup className="mb-3">
      <Form.Control
        type="text"
        placeholder="Tìm kiếm blog..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </InputGroup>
        </OverlayTrigger>
      ))}
    </>
  );
}

export default Search;