import { useState, useEffect, useMemo } from "react";

/**
 * Custom hook to load and manage blog posts data
 * @returns {Object} { posts, loading, error, categories, filteredPosts }
 */
const useBlogPosts = (activeCategory = "all", searchTerm = "") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        // Dynamic import for better code splitting
        const { default: blogData } = await import("../data/blogPosts.json");
        setPosts(blogData);
        setError(null);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  // Extract unique categories with counts
  const categories = useMemo(() => {
    if (!Array.isArray(posts) || posts.length === 0) {
      return [{ value: 'all', label: 'All Posts', count: 0 }];
    }

    const categoriesMap = posts.reduce((acc, post) => {
      if (post && post.category) {
        acc[post.category] = (acc[post.category] || 0) + 1;
      }
      return acc;
    }, {});

    const categoryObjects = [
      { value: 'all', label: 'All Posts', count: posts.length }
    ];

    Object.entries(categoriesMap).forEach(([category, count]) => {
      categoryObjects.push({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        count
      });
    });

    return categoryObjects;
  }, [posts]);

  // Filter posts based on category and search term
  const filteredPosts = useMemo(() => {
    if (!Array.isArray(posts)) return [];
    
    let filtered = posts;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post && post.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm && searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post &&
          (post.title?.toLowerCase().includes(searchLower) ||
          post.excerpt?.toLowerCase().includes(searchLower) ||
          (Array.isArray(post.tags) && post.tags.some((tag) => tag && tag.toLowerCase().includes(searchLower))))
      );
    }

    return filtered;
  }, [posts, activeCategory, searchTerm]);

  return {
    posts,
    loading,
    error,
    categories,
    filteredPosts,
  };
};

export default useBlogPosts;

/**
 * Get blog post by slug
 * @param {string} slug - Post slug
 * @returns {Object} { post, loading, error }
 */
export const useBlogPost = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        const { default: blogData } = await import("../data/blogPosts.json");
        const foundPost = blogData.find((p) => p.slug === slug);

        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError("Post not found");
          setPost(null);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post");
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  return { post, loading, error };
};
