// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Loading...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const containerClasses = fullScreen 
    ? 'min-h-screen flex items-center justify-center'
    : 'flex items-center justify-center py-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        {/* Animated spinner */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-slate-700 border-t-sky-500 rounded-full mx-auto`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Loading message */}
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm"
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
};

// Skeleton loader for content
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`bg-slate-700 rounded h-4 mb-3 ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
};

// Card skeleton for project/blog cards
export const CardSkeleton = ({ className = '' }) => {
  return (
    <div className={`bg-slate-800 rounded-lg p-6 animate-pulse ${className}`}>
      {/* Image placeholder */}
      <div className="bg-slate-700 rounded-lg h-48 mb-4" />
      
      {/* Title placeholder */}
      <div className="bg-slate-700 rounded h-6 mb-3" />
      
      {/* Description placeholder */}
      <div className="space-y-2 mb-4">
        <div className="bg-slate-700 rounded h-4" />
        <div className="bg-slate-700 rounded h-4 w-3/4" />
      </div>
      
      {/* Tags placeholder */}
      <div className="flex gap-2">
        <div className="bg-slate-700 rounded-full h-6 w-16" />
        <div className="bg-slate-700 rounded-full h-6 w-20" />
        <div className="bg-slate-700 rounded-full h-6 w-14" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
