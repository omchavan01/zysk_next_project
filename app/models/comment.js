import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  user: { type: String, required: true },
  user_image: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
