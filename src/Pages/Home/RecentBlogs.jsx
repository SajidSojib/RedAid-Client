import React from 'react';
import { Link } from 'react-router';

const RecentBlogs = ({blogs}) => {
    return (
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24">
        <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-5 font-sans text-3xl font-bold leading-none tracking-tight text-base-content lg:text-4xl md:mx-auto">
            Recent <span className="text-primary">Blogs</span>
          </h2>
          <p className="text-base text-base-content/70 md:text-lg">
            Stay updated with the latest blood donation and emergency support
            news, resources and doner stories. 
          </p>
        </div>

        { blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md bg-base-100 text-base-content"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-2xl">{blog.category}</h2>
                </div>
                <div className="relative">
                  <img
                    src={blog.thumbnail}
                    alt=""
                    className="object-cover w-full mb-4 h-56 dark:bg-gray-500"
                  />
                  <h2 className="mb-1 text-xl font-semibold">{blog.title}</h2>
                  <p className="text-sm dark:text-gray-600">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: blog.content.slice(0, 150) + "...",
                      }}
                    ></p>
                  </p>
                  <div className="badge badge-secondary absolute text-base text-black bg-yellow-500 border-none  right-0 top-0 capitalize">
                    {blog.status}
                  </div>
                </div>
                <div className="flex items-center gap-5 justify-between">
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="btn flex-1 btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
};

export default RecentBlogs;