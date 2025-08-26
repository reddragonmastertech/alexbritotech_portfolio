import { useState, useEffect, useMemo } from 'react';

// Cache for projects data to avoid repeated loading
let projectsCache = null;
let cachePromise = null;

/**
 * Custom hook to load and manage projects data with caching
 * @returns {Object} { projects, loading, error, filteredProjects }
 */
export const useProjects = (filter = 'all') => {
  const [projects, setProjects] = useState(projectsCache || []);
  const [loading, setLoading] = useState(!projectsCache);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      // Return cached data if available
      if (projectsCache) {
        setProjects(projectsCache);
        setLoading(false);
        return;
      }

      // Avoid multiple simultaneous requests
      if (cachePromise) {
        try {
          const data = await cachePromise;
          setProjects(data);
          setLoading(false);
        } catch {
          setError('Failed to load projects');
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        // Create promise to prevent multiple requests
        cachePromise = import('../data/projects.json').then(module => module.default);
        const projectsData = await cachePromise;
        
        // Cache the data
        projectsCache = projectsData;
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
        setProjects([]);
        cachePromise = null; // Reset promise on error
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on category with memoization
  const filteredProjects = useMemo(() => {
    return filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);
  }, [projects, filter]);

  return {
    projects,
    loading,
    error,
    filteredProjects
  };
};

/**
 * Get unique categories from projects
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of unique categories
 */
export const getProjectCategories = (projects) => {
  const categories = ['all'];
  const uniqueCategories = [...new Set(projects.map(project => project.category))];
  return [...categories, ...uniqueCategories];
};
