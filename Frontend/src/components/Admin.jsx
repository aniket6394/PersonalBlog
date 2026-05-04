import { useQuery } from "@tanstack/react-query";
import { adminBlog } from "../util/http";
export default function Admin() {
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => adminBlog({ token }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading blogs</p>;

  return (
    <>
      <h2>Personal Blog</h2>

      {data.blogs.map((blog) => (
        <div key={blog.id}>
          <p>{blog.title}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
    </>
  );
}
