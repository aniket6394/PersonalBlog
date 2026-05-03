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
      content: blogs.content,
      date: blogs.date,
    })),
  });
});
const PORT = 3000;
// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
