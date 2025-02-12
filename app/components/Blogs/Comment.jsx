"use client";

import { motion, AnimatePresence, delay } from "framer-motion";
import { Trash2, Edit2, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { showToastFromComponent } from "@/app/lib/toastUtils";
import { BeatLoader } from "react-spinners";

const Comment = ({ slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editCommentError, setEditCommentError] = useState("");

  const { data: session } = useSession();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments?postId=${slug}`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [slug]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/comments", {
        postId: slug,
        text: data.comment,
        user: session?.user?.username || session?.user?.name,
        image: session?.user?.image,
      });
      showToastFromComponent("success", "Comment added !!", 3000);
      setComments([...comments, response.data]);
      setLoading(false);
    } catch (error) {
      showToastFromComponent("error", "Comment not added !!", 3000);
      setLoading(false);
    }
    reset();
  };

  const handleEdit = async (id) => {
    if (!editCommentText.trim()) {
      setEditCommentError("Comment is required");
      setTimeout(() => {
        setEditCommentError("");
      }, 1500);
      return;
    }
    if (editCommentText.length < 10) {
      setEditCommentError(
        "Minimum length of the comment should be atleast 10 characters",
      );
      setTimeout(() => {
        setEditCommentError("");
      }, 1500);
      return;
    }
    try {
      const response = await axios.put("/api/comments", {
        id: id,
        text: editCommentText,
      });

      showToastFromComponent("success", "Comment edited !!", 3000);
      setComments(
        comments.map((comment) =>
          comment._id === editCommentId ? response.data : comment,
        ),
      );
      setEditCommentId(null);
      setEditCommentText("");
    } catch (error) {
      showToastFromComponent("error", "Comment not edited !!", 3000);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/comments?id=${id}`);
      showToastFromComponent("success", "Comment deleted !!", 3000);
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      showToastFromComponent("error", "Comment not deleted !!", 3000);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 md:px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6"
        >
          Comments ({comments.length})
        </motion.h2>

        {/* Comment Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          className="mb-6 sm:mb-8"
        >
          <div className="group relative">
            <textarea
              placeholder="Write a comment..."
              autoComplete="off"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg border hover:border-light-orange focus:border-2 focus:border-light-orange ${
                errors.message ? "border-red-500" : "border-gray-300"
              } focus:ring-light-orange outline-none`}
              {...register("comment", {
                required: "Comment is required",
                minLength: {
                  value: 10,
                  message:
                    "Minimum length of the comment should be atleast 10 characters",
                },
              })}
            />
            {errors.comment && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.comment.message}
              </motion.span>
            )}
          </div>
          <div className="flex justify-end py-3 sm:py-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex items-center gap-2 bg-light-orange text-white px-4 sm:px-6
                       py-2 sm:py-2.5 rounded-full hover:bg-dark-orange
                       transition-colors duration-200 shadow-sm
                       hover:shadow-md text-base"
            >
              {loading ? (
                <BeatLoader color="#fff" size={10} />
              ) : (
                <>
                  <span>Post Comment</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        {/* Comments List */}
        <motion.div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50
                         transition-all duration-200 border border-transparent
                         hover:border-gray-100"
              >
                {/* User Image */}
                <div className="flex-shrink-0">
                  <div
                    className="relative overflow-hidden rounded-full
                            border-2 border-transparent hover:border-light-orange
                            transition-all duration-200 w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <Image
                      src={
                        comment.user_image ||
                        "/images/default_profile_photo.jpg"
                      }
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Comment Content */}
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {comment.user}
                    </h3>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setEditCommentId(comment._id);
                          setEditCommentText(comment.content);
                        }}
                        className="text-gray-400 hover:text-light-orange
                             transition-colors duration-200 text-sm sm:text-base"
                      >
                        <Edit2 className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(comment._id)}
                        className="text-gray-400 hover:text-red-500
                             transition-colors duration-200 text-sm sm:text-base"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Editable Comment Text */}
                  <motion.div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {editCommentId === comment._id ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-grow flex-col gap-1"
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="flex-grow flex flex-col sm:flex-row gap-3"
                        >
                          <motion.textarea
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            rows={4}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`w-full px-4 py-3 rounded-lg border hover:border-light-orange focus:border-2 focus:border-light-orange ${
                              editCommentError
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:ring-light-orange outline-none`}
                          />
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(comment._id)}
                            className="self-end bg-light-orange text-white px-4 sm:px-5
                     py-2 sm:py-2.5 rounded-full hover:bg-dark-orange
                     transition-colors duration-200 text-base"
                          >
                            {loading ? (
                              <BeatLoader color="#fff" size={10} />
                            ) : (
                              "Save"
                            )}
                          </motion.button>
                        </motion.div>

                        {/* Error Message Animation */}
                        {editCommentError && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-red-500 text-sm mt-1"
                          >
                            {editCommentError}
                          </motion.span>
                        )}
                      </motion.div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 text-base"
                      >
                        {comment.content}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Comment;
