"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { blogPhotos } from "../components/Blogs/data";

interface postValues {
  id: number;
  title: string;
  body: string;
  views: number;
}

const Blog: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const limit = 6;

  const getPosts = async ({
    queryKey,
  }: {
    queryKey: readonly [string, number];
  }): Promise<postValues[]> => {
    try {
      const [, pageNumber] = queryKey;
      const skip = (pageNumber - 1) * limit;
      const { data } = await axios.get(
        `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
      );
      return data.posts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page] as const,
    queryFn: getPosts,
    staleTime: 30000,
    placeholderData: (previousData) => previousData,
  });

  const getTotalPosts = async (): Promise<void> => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/posts/`);
      setTotalPosts(data.total);
    } catch (error) {
      console.error("Error fetching total number of posts:", error);
    }
  };

  useEffect(() => {
    getTotalPosts();
  }, []);

  const totalPages: number = Math.ceil(totalPosts / limit);

  const getVisiblePages = (): number[] => {
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      start = 1;
      end = Math.min(5, totalPages);
    } else if (page > totalPages - 3) {
      start = Math.max(1, totalPages - 4);
      end = totalPages;
    }

    return [...Array(end - start + 1)].map((_, index) => start + index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 bg-white py-20">
      <motion.h1
        className="lg:text-4xl text-3xl font-bold mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Latest Blog Posts
      </motion.h1>

      {/* 6 Blogs section */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-60vh">
          <BeatLoader color="#E85C3F" size={30} />
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(posts) &&
              posts.map((post, index) => {
                const randomImage = blogPhotos[index % blogPhotos.length];
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 border border-gray-100"
                  >
                    <Image
                      src={randomImage}
                      alt="Blog Post"
                      className="rounded-lg mb-4"
                      width={600}
                      height={300}
                    />
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 min-h-56">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 min-h-72">
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
                            localStorage.setItem(
                              "image",
                              JSON.stringify(randomImage)
                            );
                          }}
                          className="bg-light-orange text-white px-6 py-2 rounded-full hover:bg-dark-orange transition-colors duration-200"
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
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-16">
        {/* Previous Button */}
        <motion.button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          whileHover={page === 1 ? {} : { scale: 1.05 }}
          whileTap={page === 1 ? {} : { scale: 0.95 }}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              : "bg-light-orange text-white hover:bg-dark-orange"
          }`}
        >
          <ChevronLeft size={20} />
        </motion.button>

        {/* Page Numbers */}
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-2"
        >
          {getVisiblePages().map((pg) => (
            <motion.button
              key={pg}
              onClick={() => setPage(pg)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                page === pg
                  ? "bg-light-orange text-white border-2 border-light-orange font-bold"
                  : "bg-white text-light-orange hover:bg-dark-orange hover:text-white"
              }`}
            >
              {pg}
            </motion.button>
          ))}
        </motion.div>

        {/* Next Button */}
        <motion.button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          whileHover={page === totalPages ? {} : { scale: 1.05 }}
          whileTap={page === totalPages ? {} : { scale: 0.95 }}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
              : "bg-light-orange text-white hover:bg-dark-orange"
          }`}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Blog;
