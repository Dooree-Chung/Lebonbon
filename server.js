const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;
const BLOG_POSTS_DIR = path.join(__dirname, "blog-posts");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to get the list of blog posts
app.get("/api/posts", (req, res) => {
  fs.readdir(BLOG_POSTS_DIR, (err, files) => {
    if (err) {
      res.status(500).json({ error: "Failed to read blog posts directory" });
      return;
    }
    const txtFiles = files
      .filter((file) => path.extname(file) === ".txt")
      .sort();
    res.json({ posts: txtFiles });
  });
});

// Serve the blog posts
app.get("/blog-posts/:filename", (req, res) => {
  const filePath = path.join(BLOG_POSTS_DIR, req.params.filename);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});