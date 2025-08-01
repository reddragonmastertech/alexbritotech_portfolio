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
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl animate-pulse" />
              <div className="w-48 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl animate-pulse" />
            </div>
            <div className="w-96 h-6 bg-gray-300 rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="w-64 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse" />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-24 h-14 bg-gray-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 animate-pulse" />
                <div className="space-y-4">
                  <div className="w-3/4 h-6 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
                  <div className="w-2/3 h-4 bg-gray-100 rounded animate-pulse" />
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
      <main className="min-h-screen pt-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border border-red-100"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <FaTimes className="text-white text-3xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-600 text-lg mb-8 leading-relaxed">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-6">
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-sm border mb-8 bg-white/80 border-white/30"
          >
            <FaRocket className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold text-slate-700">
              Blog & Insights
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mb-8 rounded-full" />

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-4">
            Khám phá những bài viết về công nghệ, lập trình và kinh nghiệm phát
            triển từ hành trình của tôi.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <HiSparkles className="text-purple-500" />
            <span className="text-sm font-medium">
              {posts.length} bài viết được chia sẻ
            </span>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-12 border border-white/20 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 items-center">
              {/* Categories */}
              <div className="flex gap-2 items-center">
                <FaTag className="text-gray-500 text-sm" />
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700 font-medium"
                >
                  <option value="all">Tất cả</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex gap-2 items-center">
                <FaClock className="text-gray-500 text-sm" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700 font-medium"
                >
                  <option value="date">Mới nhất</option>
                  <option value="title">Tên A-Z</option>
                  <option value="readTime">Thời gian đọc</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <HiViewGrid className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <HiViewList className="text-lg" />
                </button>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 font-medium border border-red-200"
                >
                  <FaTimes className="inline mr-2" />
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Tìm kiếm: "{searchTerm}"
                </span>
              )}
              {activeCategory !== "all" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  Danh mục: {activeCategory}
                </span>
              )}
              {sortBy !== "date" && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Sắp xếp: {sortBy === "title" ? "Tên A-Z" : "Thời gian đọc"}
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Blog Posts Grid/List */}
        {sortedPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết nào
            </h3>
            <p className="text-gray-600 mb-8">
              Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để xem thêm kết quả
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {sortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    layout: { duration: 0.3 },
                  }}
                >
                  <BlogPostCard
                    post={post}
                    viewMode={viewMode}
                    className="h-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Footer */}
        {sortedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center text-gray-500"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 rounded-full border border-gray-200">
              <HiSparkles className="text-purple-500" />
              <span className="font-medium">
                Hiển thị {sortedPosts.length} trên tổng số {posts.length} bài
                viết
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default Blog;
