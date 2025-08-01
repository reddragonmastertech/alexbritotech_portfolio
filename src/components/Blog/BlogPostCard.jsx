import { FaCalendarAlt, FaTag, FaClock, FaExternalLinkAlt, FaBookmark, FaHeart, FaShare } from "react-icons/fa";
import { HiOutlineBookmark, HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BlogPostCard({ post, index = 0, viewMode = "grid", className = "" }) {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || Math.floor(Math.random() * 100) + 10);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share && post.url) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: post.url,
      });
    } else {
      navigator.clipboard.writeText(post.url || window.location.href);
    }
  };

  const handleClick = () => {
    if (post.slug) {
      navigate(`/blog/${post.slug}`);
    }
  };

  // Grid View (Default) - Enhanced for light mode
  if (viewMode === "grid") {
    return (
      <motion.article
        className={`group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer transform hover:-translate-y-2 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
      >
        {/* Enhanced Image Section */}
        <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-blue-100 to-purple-100">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
              <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <FaTag className="text-blue-600 text-2xl" />
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-sm font-semibold rounded-full shadow-lg border border-blue-200">
              {post.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleBookmark}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200 hover:bg-blue-50 transition-colors"
            >
              {isBookmarked ? (
                <FaBookmark className="text-blue-600 text-sm" />
              ) : (
                <HiOutlineBookmark className="text-gray-600 text-sm" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200 hover:bg-blue-50 transition-colors"
            >
              <HiOutlineShare className="text-gray-600 text-sm" />
            </button>
          </div>

          {/* Read Time */}
          <div className="absolute bottom-4 right-4">
            <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-lg border border-gray-200">
              <FaClock className="text-gray-500 text-xs" />
              <span className="text-gray-700 text-sm font-medium">{post.readTime} phút</span>
            </div>
          </div>
        </div>

        {/* Enhanced Content Section */}
        <div className="p-8">
          {/* Date */}
          <div className="flex items-center gap-2 mb-4 text-gray-500">
            <FaCalendarAlt className="text-sm" />
            <time className="text-sm font-medium">
              {new Date(post.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full border border-gray-200 font-medium">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group/like"
            >
              {isLiked ? (
                <FaHeart className="text-red-500 text-sm" />
              ) : (
                <HiOutlineHeart className="text-sm group-hover/like:text-red-500" />
              )}
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
              <span className="text-sm">Đọc thêm</span>
              <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // List View - Enhanced for light mode  
  return (
    <motion.article
      className={`group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-xl cursor-pointer ${className}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-80 flex-shrink-0">
          <div className="aspect-video md:aspect-square overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
                <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <FaTag className="text-blue-600 text-2xl" />
                </div>
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-sm font-semibold rounded-full shadow-lg border border-blue-200">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 text-gray-500">
              <FaCalendarAlt className="text-sm" />
              <time className="text-sm font-medium">
                {new Date(post.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleBookmark}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                {isBookmarked ? (
                  <FaBookmark className="text-blue-600 text-sm" />
                ) : (
                  <HiOutlineBookmark className="text-gray-400 text-sm" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
              >
                <HiOutlineShare className="text-gray-400 text-sm" />
              </button>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-2">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 4).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 font-medium"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 4 && (
                <span className="px-3 py-1 bg-gray-50 text-gray-500 text-sm rounded-full border border-gray-200 font-medium">
                  +{post.tags.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group/like"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500 text-sm" />
                ) : (
                  <HiOutlineHeart className="text-sm group-hover/like:text-red-500" />
                )}
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <div className="flex items-center gap-2 text-gray-500">
                <FaClock className="text-sm" />
                <span className="text-sm font-medium">{post.readTime} phút đọc</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
              <span className="text-sm">Đọc thêm</span>
              <FaExternalLinkAlt className="text-xs group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogPostCard;