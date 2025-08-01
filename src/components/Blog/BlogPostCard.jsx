import { FaCalendarAlt, FaTag, FaClock, FaExternalLinkAlt, FaBookmark, FaHeart, FaShare } from "react-icons/fa";
import { HiOutlineBookmark, HiOutlineHeart, HiOutlineShare } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

function BlogPostCard({ post, index, viewMode = "grid" }) {
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(post.url || window.location.href);
    }
  };

  const handleClick = () => {
    if (post.url) {
      window.open(post.url, '_blank');
    }
  };

  // Grid View (Default)
  if (viewMode === "grid") {
    return (
      <motion.article
        className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8 }}
        onClick={handleClick}
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.span 
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <FaTag className="mr-2" />
              {post.category}
            </motion.span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <motion.button
              onClick={handleBookmark}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              {isBookmarked ? <FaBookmark className="text-yellow-400" /> : <HiOutlineBookmark />}
            </motion.button>
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <HiOutlineShare />
            </motion.button>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
              post.url 
                ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
            }`}>
              {post.url ? '• Published' : '• Coming Soon'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Meta Information */}
          <div className="flex items-center justify-between mb-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-green-500" />
                <span>{post.readTime} min</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {isLiked ? <FaHeart className="text-red-500" /> : <HiOutlineHeart />}
                <span className="text-xs">{likeCount}</span>
              </motion.button>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              {post.author?.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {post.author?.name || 'Author'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {post.author?.role || 'Writer'}
                </p>
              </div>
            </div>
            
            <motion.div
              className="flex items-center text-blue-500 dark:text-blue-400 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm mr-2">
                {post.url ? 'Read Article' : 'Coming Soon'}
              </span>
              {post.url && <FaExternalLinkAlt className="text-xs" />}
            </motion.div>
          </div>
        </div>
      </motion.article>
    );
  }

  // List View
  return (
    <motion.article
      className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-500 hover:shadow-xl cursor-pointer"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.6 }}
      whileHover={{ x: 8 }}
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
          <motion.img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <FaTag className="mr-1" />
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center space-x-6 mb-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-green-500" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <HiOutlineHeart className="text-red-500" />
                <span>{likeCount}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    +{post.tags.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-4">
              {/* Author */}
              <div className="flex items-center space-x-3">
                {post.author?.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {post.author?.name || 'Author'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {post.author?.role || 'Writer'}
                  </p>
                </div>
              </div>

              {/* Status */}
              <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                post.url 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
              }`}>
                {post.url ? '• Published' : '• Coming Soon'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={handleBookmark}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-yellow-500 transition-colors"
              >
                {isBookmarked ? <FaBookmark className="text-yellow-500" /> : <HiOutlineBookmark />}
              </motion.button>
              
              <motion.button
                onClick={handleLike}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
              >
                {isLiked ? <FaHeart className="text-red-500" /> : <HiOutlineHeart />}
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors"
              >
                <HiOutlineShare />
              </motion.button>

              <motion.div
                className="flex items-center text-blue-500 dark:text-blue-400 font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors ml-4"
                whileHover={{ x: 5 }}
              >
                <span className="text-sm mr-2">
                  {post.url ? 'Read Article' : 'Preview Soon'}
                </span>
                {post.url && <FaExternalLinkAlt className="text-xs" />}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default BlogPostCard;