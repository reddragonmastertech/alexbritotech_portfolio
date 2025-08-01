import { useEffect, useState } from 'react'
 
import { motion } from 'framer-motion'

function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="preloader-spinner mx-auto mb-4"></div>
        <motion.h2 
          className="text-2xl font-bold blue-gradient-text mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          GiaSi Portfolio
        </motion.h2>
        <motion.p 
          className="text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Welcome to My-Portfolio...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Preloader