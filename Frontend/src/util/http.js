export default async function fetchBlogs() {
  const url = "http://localhost:3000/blogs";
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { blogs } = await response.json();
  return blogs;
}
