"use client";

import { motion } from "framer-motion";
import { Eye, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const blogPhotos = [
  "/images/bar_blog.jpg",
  "/images/laughing_blog.jpg",
  "/images/mother_blog.jpg",
  "/images/time_blog.jpg",
  "/images/books_blog.jpg",
  "/images/coffee_blog.jpg",
];

export default function BlogSlug() {
  const [relatedPost, setRelatedPost] = useState([]);
  const [storedImage, setStoredImage] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    const imageValue = localStorage.getItem("image");
    setStoredImage(JSON.parse(imageValue));
  }, [slug]);

  const getPost = async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/posts/${slug}`);
      return data;
    } catch (error) {
      console.error("Error fetching post:", error);
      return null;
    }
  };

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", `${slug}`],
    queryFn: () => getPost(),
    enabled: !!slug,
    staleTime: 30000,
    keepPreviousData: true,
  });

  const getrelatedPosts = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/posts/`);
      setRelatedPost(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getrelatedPosts();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const subsetPosts =
    post && post.id
      ? relatedPost.filter((element) => element.id !== post.id).slice(0, 3)
      : [];

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <BeatLoader color="#E85C3F" size={30} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 bg-white">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white py-12"
          >
            <div className="max-w-4xl mx-auto px-4">
              {/* Back to Blogs Link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Link
                  href="/blogs"
                  className="inline-flex items-center font-semibold group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="relative text-[#E85C3F] group-hover:text-[#d54e34] transition-colors duration-200">
                    Back to blogs
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#d54e34] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                  </span>
                </Link>
              </motion.div>

              {/* Blog Contents */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                {post.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-gray-600 mb-8 border-b border-gray-200 pb-6"
              >
                <Eye className="h-5 w-5" />
                <span>{post.views} views</span>
              </motion.div>
              {storedImage !== "" && (
                <motion.img
                  src={storedImage}
                  alt="Blog Post"
                  className="w-full h-96 object-cover rounded-lg mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                />
              )}
              <div className="max-w-3xl mx-auto p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-lg max-w-none"
                >
                  <p className="text-gray-700 leading-relaxed text-lg text-justify">
                    {post.body}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="max-w-6xl mx-auto px-4 mt-10">
              <div className="text-3xl font-bold mb-10">Related Articles</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subsetPosts.map((post, index) => {
                  const randomImage = blogPhotos[index % blogPhotos.length];
                  return (
                    <motion.div
                      key={post.id}
                      initial="initial"
                      whileInView="whileInView"
                      variants={fadeIn}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{
                        scale: 1.05,
                        y: -10,
                      }}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
                    >
                      <Image
                        src={randomImage}
                        alt="Blog Post"
                        className="rounded-lg mb-4"
                        width={600}
                        height={300}
                      />
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
                        {post.body}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Eye className="h-4 w-4" />
                          <span>{post.views} views</span>
                        </div>
                        <Link href={`/blogs/${post.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              localStorage.removeItem("image");
                              localStorage.setItem(
                                "image",
                                JSON.stringify(randomImage),
                              );
                            }}
                            className="bg-[#E85C3F] text-white px-6 py-2 rounded-full hover:bg-[#d54e34] transition-colors duration-200"
                          >
                            Read More
                          </motion.button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.article>
        </div>
      )}
    </>
  );
}
