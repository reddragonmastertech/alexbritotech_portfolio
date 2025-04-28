import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold blue-gradient-text">GiaSi</h3>
            <p className="text-slate-400 text-sm mt-1">Building digital experiences</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a 
                href="https://linkedin.com/in/yourusername" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a 
                href="mailto:your.email@example.com" 
                className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
                aria-label="Email"
              >
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
            <p className="text-slate-400 text-sm">
              &copy; {year} GiaSi. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer