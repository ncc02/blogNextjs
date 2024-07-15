'use client';
import React, { useEffect, useState } from 'react';
import Blog from '@/app/ui/Blog'; // Import Card component
import Stack from 'react-bootstrap/Stack';
import {CurrentUserContext} from '@/app/blogs/layout'
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';

const BlogList = ({refresh}) => {
  const [blogs, setBlogs] = useState([]);
  const [url, setUrl] = useState([`${process.env.NEXT_PUBLIC_API_URL}/blogs/`]);
  const {
    currentUser
  } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data); // Save blog data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBlogs();
  }, [currentUser, url]); // useEffect runs only once when the component is mounted

  return (
    <div>
      {/* <h1>List of Blogs</h1> */}
      <Stack gap={5} className="col-md-6 mx-auto">
      {blogs.results && blogs.results.map(blog => (
        <Blog image={blog.image} id={blog.id} title={blog.title} content={blog.content} createAt={blog.created}/>
      ))}
      <div className="d-flex justify-content-center mt-0 mb-3">
      <Button 
          variant="outline-dark"
          disabled={!blogs.previous} 
          onClick={() => setUrl(blogs.previous)}
        >
          Back
        </Button>
        <Button 
          variant="outline-dark"
          disabled={!blogs.next} 
          onClick={() => setUrl(blogs.next)}
        >
          Next
        </Button>
      </div>
      </Stack>
    </div>
  );
};

export default BlogList;
