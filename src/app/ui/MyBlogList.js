'use client';
import React, { useEffect, useState } from 'react';
import Blog from '@/app/ui/Blog';
import Stack from 'react-bootstrap/Stack';
import { useAuth } from '@/app/auth/AuthContext'; // Nhập useAuth
import { useContext } from 'react';
import {CurrentUserContext} from '@/app/blogs/layout'

const MyBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated, login } = useAuth();
  const {
    currentUser
  } = useContext(CurrentUserContext);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token"); // Lấy token từ localStorage

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my_blogs`, {
          method: 'POST',
          headers: {
            "Authorization": `Token ${token}`, // Thêm token vào header
          },
        });

        if (!response.ok) {
          console.log("Error fetching");
          // Nếu token hết hạn hoặc không hợp lệ
          if (response.status === 401 && isAuthenticated) {
      
            // Thử đăng nhập lại để lấy token mới
            await login(); 

            // Gọi lại fetchBlogs sau khi đăng nhập
            fetchBlogs();
          } else {
            throw new Error("Network response was not ok");
          }
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogs();
  }, [isAuthenticated, currentUser]); // Đảm bảo useEffect chạy lại khi isAuthenticated thay đổi

  return (
    <div>
      <Stack gap={5} className="col-md-6 mx-auto">
        {blogs.map((blog) => (
          <Blog
            key={blog.id} // Thêm key cho mỗi phần tử trong danh sách
            image={`${process.env.NEXT_PUBLIC_API_URL}`+blog.image}
            id={blog.id}
            title={blog.title}
            content={blog.content}
            createAt={blog.created}
            myblog = {true}
          />
        ))}
      </Stack>
    </div>
  );
};

export default MyBlogList;
