import Post from "../models/PostModel.js";

export const createPost = async (req, res) => {
  try {
    const { name, type, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ""; // Store relative path
    if (!name || !type || !price || !description) {
      return res.status(400).json({ message: "All fields except image are required." });
    }
    const post = new Post({ name, type, price, image, description });
    await post.save();
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { name, type, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Keep existing image if no new file
    if (!name || !type || !price || !description) {
      return res.status(400).json({ message: "All fields except image are required." });
    }
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { name, type, price, image, description },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};