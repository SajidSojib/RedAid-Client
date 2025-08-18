import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaUser, FaCalendarAlt, FaFolderOpen } from "react-icons/fa";
const BlogDetails = () => {
    const {id:blogId}=useParams();
    console.log(blogId);
    const axiosSecure=useAxiosSecure();
    const [blog,setBlog]=useState({});
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        axiosSecure.get(`/blogs/${blogId}`)
        .then(res=>{
            setBlog(res.data);
            setLoading(false);
        })
    },[blogId])

    if(loading){
        return <div className='flex items-center justify-center h-screen'><span className='loading loading-dots loading-xl'></span></div>
    }
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className=" bg-base-100 rounded-xl mx-auto px-4 pt-14 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
            {blog.title}
          </h1>
          <p className="text-center text-base text-base-content mb-6">
            <span className="inline-flex items-center gap-2">
              <FaFolderOpen className="text-primary" />
              {blog.category}
            </span>
          </p>

          <div className='flex flex-col lg:flex-row gap-8'>
            <div className="w-full flex-3 mb-6 rounded-lg overflow-hidden shadow">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="max-w-sm lg:max-w-full w-full object-cover"
              />
            </div>

            <div className='flex-4'>
              <div className="flex justify-between flex-wrap text-sm text-base-content mb-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-primary" />
                  <span>{blog.authorName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <article
                className="prose prose-base prose-p:text-gray-700 max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default BlogDetails;