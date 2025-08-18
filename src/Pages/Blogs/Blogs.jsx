import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const categories = [
  "Donor Stories",
  "Health Tips",
  "Facts & Myths",
  "Eligibility & Guidelines",
  "Events",
  "News & Updates",
  "Achievements",
];

const Blogs = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 3; // Blogs per page
  const queryClient = useQueryClient();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", categoryFilter, search, page],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/blogs?status=published&category=${categoryFilter}&search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const blogs = data?.blogs || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1
    queryClient.invalidateQueries(["blogs"]);
  };

  return (
    <div className="pt-20">
      <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-8 ">
        <div>
          <h1 className="max-w-lg mb-3 font-sans text-3xl font-bold leading-none tracking-tight text-primary lg:text-4xl md:mx-auto text-center">
            Explore Inspiring Stories & Helpful Insights
          </h1>
          <p className="text-base mb-3 text-center max-w-xl lg:max-w-2xl mx-auto text-base-content/70 md:text-lg">
            Discover real-life donor journeys, expert health tips, and the
            latest updates on blood donation and community impact.
          </p>
        </div>

        <div className="flex mb-14 items-center justify-between mt-4 gap-12">
          <form
            onSubmit={handleSearch}
            className="grid w-full sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-3"
          >
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered md:col-span-2 w-full"
            />
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
                    className="btn flex-1 btn-outline btn-primary"
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
    </div>
  );
};

export default Blogs;
