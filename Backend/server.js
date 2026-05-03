const express = require("express");
const fs = require("fs/promises");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/blogs", async (req, res) => {
  const fileContent = await fs.readFile("./blogs/blog.json");
  let blogs = JSON.parse(fileContent);
  console.log(blogs);
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
const PORT = 3000;
// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
