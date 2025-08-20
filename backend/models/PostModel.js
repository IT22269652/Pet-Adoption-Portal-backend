import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // Store image URL or path
  description: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);
export default Post;