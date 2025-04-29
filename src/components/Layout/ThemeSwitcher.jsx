import { useContext } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { ThemeContext } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

function ThemeSwitcher() {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  
  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      aria-label={darkMode ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
    >
      <div className="relative w-5 h-5">
        {darkMode ? (
          <motion.div
            key="moon"
            initial={{ scale: 0.6, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaMoon className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ scale: 0.6, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaSun className="w-5 h-5" />
          </motion.div>
        )}
      </div>
    </button>
  )
}

export default ThemeSwitcher