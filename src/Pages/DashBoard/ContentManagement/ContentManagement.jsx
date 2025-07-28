import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const categories = [
  "Donor Stories",
  "Health Tips",
  "Facts & Myths",
  "Eligibility & Guidelines",
  "Events",
  "News & Updates",
  "Achievements",
];

const ContentManagement = () => {
  const { role } = useRole();
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3; // Blogs per page
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", statusFilter, categoryFilter, search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blogs?status=${statusFilter}&category=${categoryFilter}&search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => axiosSecure.patch(`/blogs/${id}/${status}`),
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1
    queryClient.invalidateQueries(["blogs"]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      }
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-center text-primary">
          Manage Blog Posts
        </h1>
        <p className="text-gray-600 text-center">
          Create, filter, publish and delete blogs
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 gap-12">
        <form onSubmit={handleSearch} className="grid w-full sm:grid-cols-2 grid-cols-1 md:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered md:col-span-2 w-full"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
        <Link
          to="/dashboard/content-management/add-blog"
          className="btn btn-primary"
        >
          Add Blog
        </Link>
      </div>

      {isLoading ? (
        <p>Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-2xl">{blog.category}</h2>
                {role === "admin" && (
                  <div className="flex items-center gap-2">
                    <CiEdit
                      size={30}
                      className="hover:text-white text-purple-600 cursor-pointer rounded-full p-1 hover:bg-purple-600"
                      onClick={() =>
                        navigate(`/dashboard/content-management/update/${blog._id}`)
                      }
                    />
                    <MdDeleteForever
                      size={30}
                      className="hover:text-white text-primary rounded-full cursor-pointer p-1 hover:bg-primary"
                      onClick={() => handleDelete(blog._id)}
                    />
                  </div>
                )}
              </div>
              <div className="relative">
                <img
                  src={blog.thumbnail}
                  alt=""
                  className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500"
                />
                <h2 className="mb-1 text-xl font-semibold">{blog.title}</h2>
                <p className="text-sm dark:text-gray-600">
                  <p dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 150)+"..." }}></p>
                </p>
                <div className="badge badge-secondary absolute text-base right-0 top-0 capitalize">
                  {blog.status}
                </div>
              </div>
              <div className="flex items-center gap-5 justify-between">
                {role === "admin" &&
                  (blog.status === "draft" && role !== "volunteer" ? (
                    <button
                      className="btn flex-1 btn-primary"
                      onClick={() =>
                        statusMutation.mutate({
                          id: blog._id,
                          status: "published",
                        })
                      }
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      className="btn flex-1 btn-warning"
                      onClick={() =>
                        statusMutation.mutate({ id: blog._id, status: "draft" })
                      }
                    >
                      Unpublish
                    </button>
                  ))}
                <Link
                  to={`/blogs/${blog._id}`}
                  className="btn flex-1 btn-outline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm ${
                page === i + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
