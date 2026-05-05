import { QueryClient } from "@tanstack/react-query";
export const query = new QueryClient();
export async function fetchBlogs() {
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
export async function fetchBlogById(id) {
  const url = `http://localhost:3000/blog/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
}
export async function adminBlog({ token }) {
  const response = await fetch("http://localhost:3000/admin", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin blogs");
  }

  const data = await response.json();
  return data;
}
export async function loginUser({ email, password }) {
  const url = "http://localhost:3000/login";
  const response = await fetch(url, {
    method: "POST", // ⚠️ must be string
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }
  localStorage.setItem("token", data.token);
  return data;
}
export async function deleteBlogByID({ id, token }) {
  const url = `http://localhost:3000/admin/blog/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }

  return response.json();
}
export async function updateBlog({ token, id, blogData }) {
  const url = `http://localhost:3000/admin/blog/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    throw new Error("Failed to update blog");
  }

  return response.json();
}
export async function createBlog({ token, blogData }) {
  const response = await fetch("http://localhost:3000/admin/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    throw new Error("Failed to create blog");
  }

  return response.json();
}
