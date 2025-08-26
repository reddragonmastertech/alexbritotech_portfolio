import { useState, useMemo } from "react";
import BlogPostCard from "./BlogPostCard";
import { FaSearch, FaTimes, FaRocket, FaClock, FaTag } from "react-icons/fa";
import { HiViewGrid, HiViewList, HiSparkles } from "react-icons/hi";
import useBlogPosts from "../../hooks/useBlogPosts";
import { motion, AnimatePresence } from "framer-motion";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");

  const { posts, loading, error, categories, filteredPosts } = useBlogPosts(
    activeCategory,
    searchTerm
  );

  // Enhanced sorting with memoization
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "readTime":
          return a.readTime - b.readTime;
        case "date":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, [filteredPosts, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
    setSortBy("date");
  };

  const hasActiveFilters =
    searchTerm || activeCategory !== "all" || sortBy !== "date";

  // Enhanced loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-2xl animate-pulse glass-effect" />
              <div className="w-48 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl animate-pulse" />
            </div>
            <div className="w-96 h-6 bg-slate-700 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-4 bg-slate-600 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="glass-effect rounded-3xl p-8 mb-12 border border-slate-700/50 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 h-14 bg-slate-700 rounded-xl animate-pulse" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-14 bg-slate-700 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass-effect rounded-3xl p-6 shadow-lg border border-slate-700/50"
              >
                <div className="w-full h-48 bg-slate-700 rounded-2xl mb-6 animate-pulse" />
                <div className="space-y-4">
                  <div className="w-3/4 h-6 bg-slate-700 rounded-lg animate-pulse" />
                  <div className="w-full h-4 bg-slate-600 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-slate-600 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Enhanced error state
  if (error) {
    return (
      <main className="min-h-screen pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-3xl p-12 text-center shadow-2xl border border-red-500/20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg glass-effect">
              <FaTimes className="text-red-400 text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-100 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-400 text-lg mb-8 leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-8"
          >
            <FaRocket className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-slate-300">
              Blog & Insights
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            My{" "}
            <span className="gradient-text">
              Articles
            </span>
          </h1>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto mb-4">
            Explore articles about technology, programming and development experiences from my journey.
          </p>
          <div className="flex items-center justify-center gap-2 text-slate-500">
            <HiSparkles className="text-violet-400" />
            <span className="text-sm font-medium">
              {posts.length} Shared Posts
            </span>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-effect rounded-3xl p-8 mb-12 border border-slate-700/50 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-slate-100 placeholder-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Categories */}
              <div className="flex gap-2 items-center">
                <FaTag className="text-slate-400 text-sm" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-slate-100 font-medium"
                >
                  <option value="all">Tất cả</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex gap-2 items-center">
                <FaClock className="text-slate-400 text-sm" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-slate-100 font-medium"
                >
                  <option value="date">Mới nhất</option>
                  <option value="title">Tiêu đề</option>
                  <option value="readTime">Thời gian đọc</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-slate-800/50 rounded-xl p-1 border border-slate-600">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiViewGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <HiViewList className="w-5 h-5" />
                </button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={clearFilters}
                  className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl transition-all duration-300 font-medium"
                >
                  Xóa bộ lọc
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        {sortedPosts.length > 0 ? (
          <motion.div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
            layout
          >
            <AnimatePresence>
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  <BlogPostCard post={post} viewMode={viewMode} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaSearch className="text-4xl text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-100 mb-4">
              Không tìm thấy bài viết
            </h3>
            <p className="text-slate-400 text-lg mb-8">
              {searchTerm || activeCategory !== "all"
                ? "Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn"
                : "Hiện tại chưa có bài viết nào được đăng tải"}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default Blog;
