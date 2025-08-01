import { useContext } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../../context/ThemeContext'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

function ThemeSwitcher() {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-3 rounded-full overflow-hidden
        bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-700
        text-amber-600 dark:text-amber-400
        hover:from-blue-200 hover:to-indigo-200 dark:hover:from-slate-700 dark:hover:to-slate-600
        border border-slate-300 dark:border-slate-600
        shadow-sm hover:shadow-md dark:shadow-slate-900/20
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-amber-400 focus:ring-offset-2
        transform hover:scale-105 active:scale-95
      `}
      aria-label={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="moon"
              initial={{ 
                scale: 0.5, 
                opacity: 0, 
                rotate: -180,
                y: 10 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
                y: 0 
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0, 
                rotate: 180,
                y: -10 
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaMoon className="w-5 h-5 drop-shadow-sm" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ 
                scale: 0.5, 
                opacity: 0, 
                rotate: -180,
                y: 10 
              }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
                y: 0 
              }}
              exit={{ 
                scale: 0.5, 
                opacity: 0, 
                rotate: 180,
                y: -10 
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeInOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <FaSun className="w-5 h-5 drop-shadow-sm" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Background animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            background: darkMode 
              ? "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(251, 191, 36, 0.2) 0%, transparent 70%)"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </button>
  )
}

export default ThemeSwitcher