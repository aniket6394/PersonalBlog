const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const authMiddleware = require("./auth.js");
app.use(express.json());
app.use(cors());
const SECRET = "mysecretkey";
app.get("/blogs", async (req, res) => {
  const fileContent = await fs.readFile("./blogs/blog.json");
  let blogs = JSON.parse(fileContent);
  res.json({
    blogs: blogs.map((blogs) => ({
      id: blogs.id,
      title: blogs.title,
      date: blogs.date,
    })),
  });
});
app.get("/blog/:id", async (req, res) => {
  try {
    const fileContent = await fs.readFile("./blogs/blog.json", "utf-8");
    const blogs = JSON.parse(fileContent);

    const blog = blogs.find((b) => b.id === parseInt(req.params.id));

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      id: blog.id,
      title: blog.title,
      date: blog.date,
      content: blog.content,
    });
  } catch (err) {
    res.status(500).json({ message: "Error reading file" });
  }
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@gmail.com" && password === "1234") {
    const token = jwt.sign(
      { email: email }, // payload
      SECRET, // secret key
      { expiresIn: "1h" }, // optional
    );
    return res.json({ token });
  }
  res.status(401).json({ message: "Invalid credentials" });
});
app.use(authMiddleware);
app.get("/admin", async (req, res) => {
  const fileContent = await fs.readFile("./blogs/blog.json");
  let blogs = JSON.parse(fileContent);
  res.json({
    blogs: blogs.map((blogs) => ({
      id: blogs.id,
      title: blogs.title,
      date: blogs.date,
    })),
  });
});
app.delete("/admin/blog/:id", async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const fileContent = await fs.readFile("./blogs/blog.json", "utf-8");
    let blogs = JSON.parse(fileContent);
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    if (blogIndex === -1) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const deletedBlog = blogs.splice(blogIndex, 1);
    await fs.writeFile("./blogs/blog.json", JSON.stringify(blogs, null, 2));
    res.json({
      message: "Blog deleted successfully",
      blog: deletedBlog[0],
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});
app.put("/admin/blog/:id", async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const { title, date, content } = req.body;
    const fileContent = await fs.readFile("./blogs/blog.json", "utf-8");
    let blogs = JSON.parse(fileContent);
    const blogIndex = blogs.findIndex((b) => b.id === blogId);
    if (blogIndex === -1) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blogs[blogIndex] = {
      ...blogs[blogIndex],
      title,
      date,
      content,
    };

    await fs.writeFile("./blogs/blog.json", JSON.stringify(blogs, null, 2));

    res.json({
      message: "Blog updated successfully",
      blog: blogs[blogIndex],
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});
app.post("/admin/blog", async (req, res) => {
  try {
    const { title, date, content } = req.body;
    const fileContent = await fs.readFile("./blogs/blog.json", "utf-8");
    let blogs = JSON.parse(fileContent);
    const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
    const newBlog = {
      id: newId,
      title,
      date,
      content,
    };
    blogs.push(newBlog);
    await fs.writeFile("./blogs/blog.json", JSON.stringify(blogs, null, 2));
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating blog" });
  }
});
const PORT = 3000;
// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
