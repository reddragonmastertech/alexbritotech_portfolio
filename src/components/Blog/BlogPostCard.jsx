import { FaCalendarAlt, FaTag, FaClock, FaExternalLinkAlt, FaBookmark, FaHeart, FaShare, FaArrowRight } from "react-icons/fa";
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

  // Grid View (Default) - Dark theme
  if (viewMode === "grid") {
    return (
      <motion.article
        className={`group glass-effect rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer transform hover:-translate-y-2 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleClick}
      >
        {/* Featured Image */}
        <div className="relative overflow-hidden h-56">
          <motion.img
            src={post.image || '/api/placeholder/400/300'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={handleBookmark}
              className={`w-10 h-10 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all duration-300 ${
                isBookmarked 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'bg-slate-800/50 border-slate-600 text-slate-300 hover:text-blue-400'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isBookmarked ? <FaBookmark className="text-sm" /> : <HiOutlineBookmark className="text-sm" />}
            </motion.button>
            
            <motion.button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-600 text-slate-300 hover:text-green-400 flex items-center justify-center transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <HiOutlineShare className="text-sm" />
            </motion.button>
          </div>

          {/* Read Time */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-900/50 backdrop-blur-sm rounded-full text-slate-300">
              <FaClock className="text-xs" />
              <span className="text-sm">{post.readTime} min</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta Information */}
          <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-xs" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTag className="text-xs" />
              <span>{post.category}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-400 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 bg-slate-700 text-slate-400 rounded text-xs">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                  isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                }`}
              >
                {isLiked ? <FaHeart className="text-sm" /> : <HiOutlineHeart className="text-sm" />}
                <span>{likeCount}</span>
              </button>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FaClock className="text-xs" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            <motion.div 
              className="flex items-center gap-2 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ x: 5 }}
            >
              <span>Read More</span>
              <FaArrowRight className="text-xs" />
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  // List View - Dark theme
  return (
    <motion.article
      className={`group glass-effect rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer ${className}`}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
          <motion.img
            src={post.image || '/api/placeholder/400/300'}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-blue-400 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Meta */}
            <div className="flex items-center gap-4 mb-3 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-xs" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-xs" />
                <span>{post.readTime} min</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-slate-100 mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-grow">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-violet-500/10 border border-violet-500/30 text-violet-400 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                    isLiked ? 'text-red-400' : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  {isLiked ? <FaHeart className="text-sm" /> : <HiOutlineHeart className="text-sm" />}
                  <span>{likeCount}</span>
                </button>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleBookmark}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                      isBookmarked 
                        ? 'text-blue-400' 
                        : 'text-slate-400 hover:text-blue-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isBookmarked ? <FaBookmark className="text-sm" /> : <HiOutlineBookmark className="text-sm" />}
                  </motion.button>

                  <motion.button
                    onClick={handleShare}
                    className="p-2 rounded-lg text-slate-400 hover:text-green-400 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <HiOutlineShare className="text-sm" />
                  </motion.button>
                </div>
              </div>

              <motion.div 
                className="flex items-center gap-2 text-blue-400 text-sm font-medium"
                whileHover={{ x: 5 }}
              >
                <span>Read Article</span>
                <FaArrowRight className="text-xs" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogPostCard;
