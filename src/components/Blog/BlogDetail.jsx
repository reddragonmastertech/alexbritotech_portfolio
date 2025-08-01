import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaClock, FaUser, FaTag, FaCalendarAlt, FaEye, FaShare, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa'
import { HiBookOpen, HiSparkles } from 'react-icons/hi'
import useBlogPosts from '../../hooks/useBlogPosts'

function BlogDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { posts } = useBlogPosts()
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    if (posts.length > 0) {
      const foundPost = posts.find(p => p.slug === slug)
      setPost(foundPost)
      setIsLoading(false)
    }
  }, [posts, slug])

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('#article-content')
      if (article) {
        const scrollTop = window.scrollY
        const docHeight = article.offsetHeight
        const winHeight = window.innerHeight
        const scrollPercent = scrollTop / (docHeight - winHeight)
        const scrollPercentRounded = Math.round(scrollPercent * 100)
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatContent = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mb-6 text-gray-900">$1</h1>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mb-4 mt-8 text-gray-900">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 leading-relaxed">')
      .replace(/^(.)/g, '<p class="mb-4 text-gray-700 leading-relaxed">$1')
      .replace(/(.)\n$/g, '$1</p>')
  }

  const sharePost = (platform) => {
    const url = window.location.href
    const title = post?.title

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }

    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
  }

  if (isLoading) {
    return (
      <main className="min-h-screen pt-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen pt-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </button>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          style={{ width: `${readingProgress}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8 group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </motion.button>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium">
              <HiBookOpen className="mr-2" />
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <FaUser className="text-sm" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-sm" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-sm" />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="text-sm" />
              <span>1.2k views</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag, index) => (
              <motion.span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <FaTag className="mr-1 text-xs" />
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.article
          id="article-content"
          className="prose prose-lg max-w-none mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          />
        </motion.article>

        {/* Share Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HiSparkles className="text-purple-500 text-xl" />
              <h3 className="text-2xl font-bold text-gray-900">Enjoyed this article?</h3>
            </div>
            <p className="text-gray-600 mb-6">Share it with your network and help others discover great content!</p>
            
            <div className="flex items-center justify-center gap-4">
              <motion.button
                onClick={() => sharePost('twitter')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter />
                Twitter
              </motion.button>
              <motion.button
                onClick={() => sharePost('linkedin')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin />
                LinkedIn
              </motion.button>
              <motion.button
                onClick={() => sharePost('facebook')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook />
                Facebook
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {posts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={relatedPost.coverImage}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FaClock />
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.section>
      </div>
    </main>
  )
}

export default BlogDetail
