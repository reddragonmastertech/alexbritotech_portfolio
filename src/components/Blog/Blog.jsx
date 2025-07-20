import { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { FaSearch } from "react-icons/fa";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { CardSkeleton } from "../UI/LoadingSpinner";
import { motion } from "framer-motion";

function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Use custom hook to load blog posts
  const { posts, loading, error, categories, filteredPosts } = useBlogPosts(activeCategory, searchTerm);

  // Show loading state
  if (loading) {
    return (
      <main className="section-padding pt-28">
        <div className="max-w-7xl mx-auto">
          {/* Title skeleton */}
          <div className="mb-12 text-center">
            <div className="bg-slate-700 rounded h-12 w-48 mx-auto mb-4 animate-pulse" />
            <div className="bg-slate-700 rounded h-4 w-80 mx-auto animate-pulse" />
          </div>

          {/* Search and filter skeleton */}
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="bg-slate-700 rounded-lg h-12 w-full max-w-md animate-pulse" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-slate-700 rounded-full h-10 w-16 animate-pulse" />
              ))}
            </div>
          </div>

          {/* Blog cards skeleton */}
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
          <div className="text-center">
            <p className="text-red-500 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-padding pt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="blue-gradient-text">Blog</span>
          </h1>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-8"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, design, and
            technology trends.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                  activeCategory === category
                    ? "bg-sky-500 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogPostCard key={post.id} post={post} index={index} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-600 dark:text-slate-400 text-lg"
              >
                No posts found matching your criteria. Try adjusting your
                search.
              </motion.p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Blog;
