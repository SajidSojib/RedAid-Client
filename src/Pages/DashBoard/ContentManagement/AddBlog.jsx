import { useForm } from "react-hook-form";
import { useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { Helmet } from "@dr.pogodin/react-helmet";

const categories = [
  "Donor Stories",
  "Health Tips",
  "Facts & Myths",
  "Eligibility & Guidelines",
  "Events",
  "News & Updates",
  "Achievements",
];

const AddBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // 1. Upload image to imgbb
    const imageFile = data.thumbnail[0];
    const formImage = new FormData();
    formImage.append("image", imageFile);
    const imageBBKey = import.meta.env.VITE_IMAGEBB_KEY;
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageBBKey}`;

    let imageUrl = "";
    try {
      const res = await axios.post(imageUploadUrl, formImage);
      imageUrl = res.data.data.display_url;
    } catch (error) {
      toast.error("Image upload failed!");
      return;
    }

    // 2. Construct blog data
    const blogData = {
      title: data.title,
      thumbnail: imageUrl,
      category: data.category,
      content,
      authorName: user?.displayName || "Unknown",
      authorEmail: user?.email || "unknown@email.com",
      status: "draft",
      createdAt: new Date().toISOString(),
    };

    // 3. Post blog
    try {
      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        toast.success("Blog created successfully!");
        reset();
        setContent("");
        navigate("/dashboard/content-management");
      }
    } catch (error) {
      toast.error("Failed to create blog!");
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow space-y-6">
      <Helmet>
                <title>Add Blog | RedAid</title>
              </Helmet>
      <h2 className="text-3xl font-bold">Add New Blog</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="label">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: "Thumbnail is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.thumbnail && (
            <p className="text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="select select-bordered w-full"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="label">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        {/* Author Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Author Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
          <div>
            <label className="label">Author Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full">
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
