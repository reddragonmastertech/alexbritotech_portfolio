import { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { CardSkeleton } from "../UI/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("date"); // date, title, readTime
  const [showFilters, setShowFilters] = useState(false);
  
  // Use custom hook to load blog posts
  const { posts, loading, error, categories, filteredPosts } = useBlogPosts(activeCategory, searchTerm);

  // Sort posts based on sortBy
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'readTime':
        return a.readTime - b.readTime;
      case 'date':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Clear search and filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
    setSortBy("date");
  };

  // Show loading state
  if (loading) {
    return (
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced title skeleton */}
          <div className="mb-16 text-center">
            <div className="bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-600 rounded-xl h-16 w-64 mx-auto mb-6 animate-pulse" />
            <div className="bg-slate-300 dark:bg-slate-700 rounded-lg h-6 w-96 mx-auto mb-4 animate-pulse" />
            <div className="bg-slate-300 dark:bg-slate-700 rounded-lg h-4 w-48 mx-auto animate-pulse" />
          </div>

          {/* Enhanced search and filter skeleton */}
          <div className="mb-12 space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="bg-slate-300 dark:bg-slate-700 rounded-xl h-14 flex-1 max-w-md animate-pulse" />
              <div className="flex gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-slate-300 dark:bg-slate-700 rounded-full h-12 w-20 animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced blog cards skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Show error state
  if (error) {
    return (
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl p-12 border border-red-200 dark:border-red-800"
          >
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200 dark:border-red-800">
              <FaTimes className="text-red-500 text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-600 dark:text-red-400 text-lg mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
          <main className="section-padding pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
            My Blog
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Dive into my thoughts, tutorials, and insights about web development, design patterns, 
            cutting-edge technologies, and the ever-evolving digital landscape.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {posts?.length || 0} Articles
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              {categories?.length - 1 || 0} Categories
            </span>
          </div>
        </motion.div>

        {/* Enhanced Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Search articles, topics, technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex bg-white dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-500 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <HiViewGrid />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-500 text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <HiViewList />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Latest First</option>
                  <option value="title">Alphabetical</option>
                  <option value="readTime">Quick Reads</option>
                </select>

                {/* Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                    className={`p-3 rounded-lg transition-colors ${
                    showFilters
                      ? "bg-blue-500 text-white"
                      : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-600"
                  }`}
                >
                  <FaFilter />
                </button>
              </div>
            </div>

            {/* Category Filters - Collapsible */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-slate-200 dark:border-slate-700 mt-6">
                    <div className="flex flex-wrap gap-3">
                      {categories?.map((category) => (
                        <motion.button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 capitalize ${
                            activeCategory === category
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600"
                          }`}
                        >
                          {category === 'all' ? 'All Articles' : category}
                          {activeCategory === category && (
                            <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full"></span>
                          )}
                        </motion.button>
                      ))}
                      {(searchTerm || activeCategory !== "all") && (
                        <button
                          onClick={clearFilters}
                          className="px-6 py-3 rounded-full text-sm font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Results Summary */}
        {(searchTerm || activeCategory !== "all") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400">
              Found <span className="font-bold text-blue-500">{sortedPosts.length}</span> articles
              {searchTerm && (
                <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
              {activeCategory !== "all" && (
                <span> in <span className="font-semibold capitalize">{activeCategory}</span></span>
              )}
            </p>
          </motion.div>
        )}

        {/* Blog Posts Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${activeCategory}-${sortBy}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-6"
            }
          >
            {sortedPosts.length > 0 ? (
              sortedPosts.map((post, index) => (
                <BlogPostCard 
                  key={post.id} 
                  post={post} 
                  index={index} 
                  viewMode={viewMode}
                />
              ))
            ) : (
              <div className="col-span-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-200 dark:border-slate-600">
                    <FaSearch className="text-slate-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    No articles found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto mb-8">
                    We couldn't find any articles matching your search criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Show All Articles
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

export default Blog;