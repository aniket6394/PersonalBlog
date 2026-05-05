import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBlogById, updateBlog } from "../util/http";
import { useRef } from "react";
import "./EditPost.css";
export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const titleRef = useRef();
  const dateRef = useRef();
  const contentRef = useRef();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  const { mutate } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      navigate("/admin");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    const blogData = {
      title: titleRef.current.value,
      date: dateRef.current.value,
      content: contentRef.current.value,
    };

    mutate({ token, id, blogData });
  }

  let content = <p>loading form</p>;

  if (isError) {
    content = <p>Error loading blog</p>;
  }

  if (data) {
    content = (
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-row">
          <input
            ref={titleRef}
            type="text"
            defaultValue={data.title}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            ref={dateRef}
            type="date"
            defaultValue={data.date}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <textarea
            ref={contentRef}
            defaultValue={data.content}
            rows="8"
            className="form-textarea"
          />
        </div>

        <button type="submit" className="form-button">
          Update
        </button>
      </form>
    );
  }

  return (
    <div className="edit-container">
      <h2>Update Article</h2>
      {content}
    </div>
  );
}
