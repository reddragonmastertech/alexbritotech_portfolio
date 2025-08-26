import { useState, useMemo, useCallback } from "react";
import BlogPostCard from "./BlogPostCard";
import { FaSearch, FaTimes, FaRocket, FaClock, FaTag, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiViewGrid, HiViewList, HiSparkles } from "react-icons/hi";
import useBlogPosts from "../../hooks/useBlogPosts";
import { motion, AnimatePresence } from "framer-motion";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("date");
  const [showAll, setShowAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { loading, error, categories, filteredPosts } = useBlogPosts(
    activeCategory,
    searchTerm
  );

  // Enhanced sorting with memoization and performance optimization
  const sortedPosts = useMemo(() => {
    if (!filteredPosts?.length) return [];
    
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

  // Limit posts display - show only when expanded
  const displayedPosts = useMemo(() => {
    if (!showAll) return []; // Hide all posts by default
    return sortedPosts;
  }, [sortedPosts, showAll]);

  // Use useCallback to prevent unnecessary re-renders
  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setActiveCategory("all");
    setSortBy("date");
    setShowAll(false);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setShowAll(false); // Reset to show limited when category changes
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setShowAll(false); // Reset to show limited when searching
  }, []);

  // Toggle show all posts
  const toggleShowAll = useCallback(() => {
    setShowAll(prev => !prev);
  }, []);

  // Toggle filters visibility
  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  if (loading) {
    return (
      <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-slate-700/50 rounded-2xl animate-pulse" />
              <div className="w-48 h-8 bg-slate-700/50 rounded-xl animate-pulse" />
            </div>
            <div className="space-y-4">
              <div className="w-96 h-12 bg-slate-700/50 rounded-lg mx-auto animate-pulse" />
              <div className="w-64 h-6 bg-slate-600/50 rounded-lg mx-auto animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-slate-800/30 rounded-2xl p-6 animate-pulse">
                <div className="w-full h-48 bg-slate-700/50 rounded-xl mb-4" />
                <div className="space-y-3">
                  <div className="w-3/4 h-6 bg-slate-700/50 rounded" />
                  <div className="w-full h-4 bg-slate-600/50 rounded" />
                  <div className="w-1/2 h-4 bg-slate-600/50 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="section-padding pt-28 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl mb-4">Error loading blog posts</p>
          <p className="text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="section-padding pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-slate-700/50 mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaRocket className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold text-slate-300">
              Latest Articles
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Tech <span className="gradient-text">Blog</span>
          </motion.h1>

          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto mb-8 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p
            className="text-slate-300 text-lg max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Insights, tutorials, and thoughts on software development, 
            technology trends, and best practices in modern web development.
          </motion.p>

          {/* Toggle Filters Button */}
          <motion.button
            onClick={toggleFilters}
            className="inline-flex items-center gap-2 glass-effect border border-slate-700/50 text-slate-300 hover:text-blue-400 hover:border-blue-500/50 px-6 py-3 rounded-xl transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <HiSparkles className="text-sm" />
            <span>Filters & Search</span>
            {showFilters ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
          </motion.button>
        </motion.div>

        {/* Filter Controls - Collapsible */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-effect rounded-2xl p-6 border border-slate-700/30">
                {/* Search Bar */}
                <div className="relative max-w-lg mx-auto mb-8">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-12 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
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

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-slate-300 font-semibold mb-4 flex items-center gap-2">
                    <FaTag className="text-blue-400" />
                    Categories
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => handleCategoryChange(category.value)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                          activeCategory === category.value
                            ? "bg-blue-600/30 border border-blue-400/60 text-blue-300"
                            : "bg-slate-700/30 border border-slate-600/30 text-slate-300 hover:border-slate-500/50 hover:text-slate-200"
                        }`}
                      >
                        {category.label}
                        {category.count > 0 && (
                          <span className="ml-2 text-xs opacity-70">
                            ({category.count})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* View Controls */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-blue-500/70"
                    >
                      <option value="date">Latest</option>
                      <option value="title">Title</option>
                      <option value="readTime">Read Time</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-600/30 text-blue-400"
                          : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <HiViewGrid className="text-lg" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-600/30 text-blue-400"
                          : "text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <HiViewList className="text-lg" />
                    </button>
                  </div>

                  {(activeCategory !== "all" || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 transition-colors"
                    >
                      <FaTimes />
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show/Hide Articles Button - Always visible when there are posts */}
        {sortedPosts.length > 0 && (
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={toggleShowAll}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 border-2 border-transparent hover:border-white/20 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-2 hover:scale-105 shadow-xl"
            >
              {showAll ? (
                <>
                  <FaChevronUp className="text-lg animate-bounce" />
                  Hide Articles
                </>
              ) : (
                <>
                  <FaChevronDown className="text-lg animate-bounce" />
                  Show Articles ({sortedPosts.length} articles)
                </>
              )}
            </button>
            
            <p className="text-slate-400 text-sm mt-4">
              {showAll ? 
                'Click to hide articles list' : 
                `${sortedPosts.length} articles available to read`
              }
            </p>
          </motion.div>
        )}

        {/* Posts Count */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-slate-400 text-sm">
            {showAll ? `Showing all ${displayedPosts.length}` : 'Articles hidden'} of {sortedPosts.length} articles
            {activeCategory !== 'all' && ` in "${categories.find(cat => cat.value === activeCategory)?.label}" category`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Blog Posts */}
        {!showAll ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass-effect rounded-2xl p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaRocket className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">Articles Hidden</h3>
              <p className="text-slate-400 mb-6">
                Click "Show Articles" button above to view all available articles.
              </p>
            </div>
          </motion.div>
        ) : sortedPosts.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass-effect rounded-2xl p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaRocket className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-4">No Articles Found</h3>
              <p className="text-slate-400 mb-6">
                {searchTerm || activeCategory !== "all"
                  ? "No articles match your current filters. Try adjusting your search or category selection."
                  : "No articles available at the moment. Check back soon!"}
              </p>
              {(activeCategory !== "all" || searchTerm) && (
                <button onClick={clearFilters} className="btn-secondary">
                  <FaTimes className="mr-2" /> Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              className={`grid gap-8 mb-12 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
              layout
            >
              {displayedPosts.map((post, index) => (
                <BlogPostCard
                  key={`${post.slug}-${activeCategory}-${searchTerm}`}
                  post={post}
                  index={index}
                  viewMode={viewMode}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}

export default Blog;
