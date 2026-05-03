import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "../util/http";
import Header from "./Header";
import "./Blog.css";

export default function Blog() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id),
  });

  if (isLoading) return <p className="status">Loading blog...</p>;

  if (isError) return <p className="status error">{error.message}</p>;

  return (
    <>
      <Header />
      <div className="blog-container">
        <h2 className="blog-title">{data.title}</h2>
        <p className="blog-date">{data.date}</p>
        <p className="blog-content">{data.content}</p>
      </div>
    </>
  );
}
