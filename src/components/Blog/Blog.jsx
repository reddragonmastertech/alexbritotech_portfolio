import { useState, useEffect, useMemo } from 'react'
import BlogPostCard from './BlogPostCard'
import { FaSearch } from 'react-icons/fa'

function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([])
  
  // Sample blog posts data
  const blogPosts = useMemo(() => [
    {
      id: 1,
      title: 'Building Responsive Websites with TailwindCSS',
      slug: 'building-responsive-websites-tailwindcss',
      excerpt: 'Learn how to create fully responsive websites quickly and efficiently using TailwindCSS utility classes.',
      content: 'Full article content goes here...',
      date: 'May 15, 2025',
      readTime: 5,
      author: 'Gia Si',
      category: 'Web Development',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=TailwindCSS',
      tags: ['TailwindCSS', 'CSS', 'Responsive Design']
    },
    {
      id: 2,
      title: 'Introduction to Three.js for Web Developers',
      slug: 'introduction-to-threejs',
      excerpt: 'Discover how to incorporate 3D graphics into your web projects using the powerful Three.js library.',
      content: 'Full article content goes here...',
      date: 'April 28, 2025',
      readTime: 8,
      author: 'Gia Si',
      category: '3D Graphics',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Three.js',
      tags: ['Three.js', 'WebGL', '3D', 'JavaScript']
    },
    {
      id: 3,
      title: 'Optimizing React Performance',
      slug: 'optimizing-react-performance',
      excerpt: 'Tips and techniques to improve your React application performance and provide a smoother user experience.',
      content: 'Full article content goes here...',
      date: 'April 10, 2025',
      readTime: 6,
      author: 'Gia Si',
      category: 'React',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=React',
      tags: ['React', 'Performance', 'JavaScript']
    },
    {
      id: 4,
      title: 'Getting Started with GSAP Animations',
      slug: 'getting-started-with-gsap',
      excerpt: 'Learn how to create smooth, professional animations using the GSAP library in your web projects.',
      content: 'Full article content goes here...',
      date: 'March 22, 2025',
      readTime: 7,
      author: 'Gia Si',
      category: 'Animations',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=GSAP',
      tags: ['GSAP', 'Animations', 'JavaScript']
    },
    {
      id: 5,
      title: 'Building a Portfolio with React and Vite',
      slug: 'building-portfolio-react-vite',
      excerpt: 'Step-by-step guide to creating a modern developer portfolio using React and Vite build tools.',
      content: 'Full article content goes here...',
      date: 'March 5, 2025',
      readTime: 10,
      author: 'Gia Si',
      category: 'React',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Portfolio',
      tags: ['React', 'Vite', 'Portfolio']
    },
    {
      id: 6,
      title: 'Modern CSS Techniques Every Developer Should Know',
      slug: 'modern-css-techniques',
      excerpt: 'Explore the latest CSS features and techniques that can improve your web development workflow.',
      content: 'Full article content goes here...',
      date: 'February 18, 2025',
      readTime: 6,
      author: 'Gia Si',
      category: 'CSS',
      coverImage: 'https://placehold.co/600x400/0f172a/0ea5e9?text=Modern+CSS',
      tags: ['CSS', 'Web Development']
    }
  ], [])
  
  // Extract unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))]
  
  // Filter posts based on category and search term
  useEffect(() => {
    setFilteredPosts(
      blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
      })
    )
  }, [activeCategory, searchTerm, blogPosts])
  
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
            Thoughts, tutorials, and insights about web development, design, and technology.
            Sharing knowledge and experiences from my journey as a developer.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {category === 'all' ? 'All Posts' : category}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-md border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:focus:ring-blue-400"
              />
            </div>
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
                No posts found matching your criteria. Try adjusting your search.
              </motion.p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Blog