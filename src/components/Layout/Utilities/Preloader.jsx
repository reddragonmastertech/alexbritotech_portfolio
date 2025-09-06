import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

const Preloader = memo(function Preloader() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isMobile ? 0.3 : 0.5 }}
    >
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      )}

      <div className="relative z-10 text-center">
        {/* Logo with mobile-optimized animations */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
        >
          <div className="w-50 h-50 rounded-b-lg flex items-center justify-center pl-10">
            <img
              src="/logo-bg.png"
              alt="GiaSi Dev Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <motion.h2
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: isMobile ? 0.2 : 0.3,
              duration: isMobile ? 0.4 : 0.6,
            }}
          >
            Nguyen Tran Gia Si
          </motion.h2>
        </motion.div>

        {/* Loading Animation */}
        <div className="relative">
          <motion.div
            className="flex items-center justify-center space-x-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="w-64 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="text-slate-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Preparing your experience...
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
});

export default Preloader;
