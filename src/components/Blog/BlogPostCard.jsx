import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaTag } from 'react-icons/fa'

function BlogPostCard({ post, index }) {
  return (
    <motion.div 
      className="card overflow-hidden hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-4">
            <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
              {post.category}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 blue-gradient-text">{post.title}</h3>
        
        <div className="flex items-center mb-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center mr-4">
            <FaCalendarAlt className="mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <FaTag className="mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>
        
        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <span className="text-blue-500 dark:text-blue-400 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-300">
            Read More →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogPostCard