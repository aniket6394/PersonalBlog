import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../util/http";
import "./NewPost.css";
export default function NewPost() {
  const titleRef = useRef();
  const dateRef = useRef();
  const contentRef = useRef();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { mutate } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
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

    mutate({ token, blogData });
  }

  return (
    <div className="newpost-container">
      <h2>Create New Article</h2>

      <form onSubmit={handleSubmit} className="newpost-form">
        <div className="form-row">
          <input
            ref={titleRef}
            type="text"
            placeholder="Article Title"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input ref={dateRef} type="date" className="form-input" />
        </div>

        <div className="form-row">
          <textarea
            ref={contentRef}
            placeholder="Content"
            rows="8"
            className="form-textarea"
          />
        </div>

        <button type="submit" className="form-button">
          Create
        </button>
      </form>
    </div>
  );
}
