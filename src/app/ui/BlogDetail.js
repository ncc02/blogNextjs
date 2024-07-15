'use client'
import { Card } from "react-bootstrap";
import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';


function BlogDetail() {
    const pathname = usePathname();
    const [blog, setBlog] = useState(null); // Initialize blog as null

    const fetchBlog = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${pathname}/`);
            if (!res.ok) {
                throw new Error('Server error');
            }
            const data = await res.json();
            setBlog(data);
            console.log('set blog:', data); // Use data here instead of blog
        } catch(error) {
            console.log("loi: ", error);
        }
    }

    useEffect(() => {
        fetchBlog();
    }, [pathname]); // Add pathname to dependencies to fetch new blog on pathname change

    // Conditional rendering when blog is null or undefined
    if (!blog) {
        return (<></>);
    }

    // Render Card component when blog is defined
    return (
        <>
        
          <Stack gap={5} className="col-md-6 mx-auto">
                <Card.Img variant="top" src={blog.image}/>
                <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    
                    <p className="blog-content">{blog.content}</p>
                    
                </Card.Body>
                    <small className="text-muted">Last update: {blog.created}</small>
                
            </Stack>
            <br />
        </>
    );
}

export default BlogDetail;
