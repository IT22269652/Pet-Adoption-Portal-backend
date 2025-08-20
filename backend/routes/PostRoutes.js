import express from "express";
import { createPost, getAllPosts, getPost, updatePost, deletePost } from "../controller/PostController.js"; // Confirm this path
import upload from "../middleware/uploadMiddleware.js"; // Confirm this path

const router = express.Router();

router.post("/posts", upload.single("image"), createPost); // 'image' matches the input name in form
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPost);
router.put("/posts/:id", upload.single("image"), updatePost);
router.delete("/posts/:id", deletePost);

export default router;