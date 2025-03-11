'use client'
import axios from 'axios'; // Make sure axios is imported
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      console.log(response.data); // Check the API response
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError('Failed to load blogs.');
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId)=>{
    const response = await axios.delete('/api/blog',{
      params:{
        id:mongoId
      }
    })
    toast.success(response.data.msg);
    fetchBlogs();

  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author Name</th>
              <th scope='col' className=' px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="4" className="text-center text-red-500">{error}</td></tr>
            ) : (
              blogs.map((item, index) => {
                return (
                  <BlogTableItem
                    key={index}
                    mongoId={item._id}
                    title={item.title}
                    author={item.author}
                    authorImg={item.authorImg}
                    date={item.date} // Check if the field name is correct
                    deleteBlog={deleteBlog}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
