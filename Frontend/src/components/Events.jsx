import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../util/http";
import Header from "./Header";
import { Link } from "react-router";
import "./Events.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function Events() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  let content = <p className="status">Fetching events...</p>;

  if (isLoading) {
    content = <p className="status">Loading Blogs List...</p>;
  }

  if (isError) {
    const msg = error?.message || "failed to fetch";
    content = <p className="status error">{msg}</p>;
  }

  if (data) {
    content = (
      <ul className="blog-list">
        {data.map((item) => (
          <li key={item.id} className="blog-item">
            <Link to={`/blog/${item.id}`} className="blog-link">
              <span className="blog-title">{item.title}</span>
              <span className="blog-date">{formatDate(item.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <Header />
      {content}
    </>
  );
}
