import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/giasinguyen',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/giasinguyen',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/giasinguyen',
      color: 'hover:text-sky-400'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:giasinguyentran@gmail.com',
      color: 'hover:text-red-400'
    }
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ]

  const contactInfo = [
    {
      icon: FaEnvelope,
      text: 'giasinguyentran@gmail.com',
      href: 'mailto:giasinguyentran@gmail.com'
    },
    {
      icon: FaPhone,
      text: '(+84) 34 899 6487',
      href: 'tel:+84348996487'
    },
    {
      icon: FaMapMarkerAlt,
      text: 'Go Vap District, Ho Chi Minh City',
      href: 'https://maps.google.com/?q=Go+Vap+District+Ho+Chi+Minh+City'
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-slate-950 to-black text-slate-100 relative overflow-hidden">
      {/* Background Effects - darker and more subtle */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/3 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl flex items-center justify-center font-bold text-white">
                GS
              </div>
              <h3 className="text-xl font-bold gradient-text">
                GiaSi Nguyen
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Full-stack developer passionate about creating innovative web solutions 
              and bringing ideas to life through clean, efficient code.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} hover:bg-slate-700/50 hover:scale-110 hover:shadow-lg`}
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-slate-100 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-slate-400 hover:text-slate-200 transition-colors duration-300 inline-flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-slate-100 mb-6">
              Get In Touch
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <motion.a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-slate-800/50 border border-slate-700/50 rounded-lg flex items-center justify-center group-hover:bg-slate-700/50 transition-colors duration-300">
                      <info.icon className="text-sm" />
                    </div>
                    <span className="text-sm">{info.text}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-slate-100 mb-6">
              Stay Updated
            </h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Subscribe to get notified about new projects and blog posts.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-l-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors duration-300"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-r-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs text-slate-500">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-slate-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm flex items-center gap-2">
              © {currentYear} GiaSi Nguyen. Made with 
              <motion.span
                className="text-red-400"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <FaHeart />
              </motion.span>
              in Vietnam
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center z-50 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.1,
          rotate: -90
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ 
          duration: 0.3,
          ease: "backOut"
        }}
        viewport={{ once: true }}
        aria-label="Scroll to top"
      >
        ↑
      </motion.button>
    </footer>
  )
}

export default Footer
