import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminBlog, deleteBlogByID } from "../util/http";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => adminBlog({ token }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteBlogByID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
    },
  });

  function handleDelete(id) {
    mutate({ id, token });
  }

  if (isLoading) return <p className="status">Loading...</p>;
  if (isError) return <p className="status error">Error loading blogs</p>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">Personal Blog</h2>

        <button
          className="create-button"
          onClick={() => navigate("/admin/new")}
        >
          + New Post
        </button>
      </div>

      <div className="blog-list">
        {data.blogs.map((blog) => (
          <div className="blog-item" key={blog.id}>
            <p className="blog-title">{blog.title}</p>

            <div className="blog-actions">
              <button
                className="action-button edit-button"
                onClick={() => navigate(`/admin/edit/${blog.id}`)}
              >
                Edit
              </button>

              <button
                className="action-button delete-button"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
