import Comment from "@/app/models/comment.js";
import dbConnect from "@/app/lib/dbConnect.js";

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");
  const comments = await Comment.find({ postId });
  return Response.json(comments);
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newComment = await Comment.create({
      postId: body.postId,
      user: body.user,
      user_image: body.image,
      content: body.text,
    });
    console.log("Saving comment to MongoDB");
    if (!newComment) {
      return Response.json(
        { error: "Comment could not be created" },
        { status: 404 },
      );
    }
    return Response.json(newComment);
  } catch (error) {
    console.error(" Error saving comment:", error);
    return Response.json({ error: "Failed to save comment" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const commentId = searchParams.get("id");
    console.log("Deleting comment with ID:", commentId);
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return Response.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  await dbConnect();
  try {
    const body = await req.json();
    console.log("Updating comment with ID:", body.id);
    const updatedComment = await Comment.findByIdAndUpdate(
      body.id,
      { content: body.text },
      { new: true },
    );
    if (!updatedComment) {
      return Response.json({ error: "Comment not found" }, { status: 404 });
    }
    return Response.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return Response.json(
      { error: "Failed to update comment" },
      { status: 500 },
    );
  }
}
