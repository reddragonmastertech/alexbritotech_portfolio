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
    if (!Array.isArray(projects)) return [];
    return filter === 'all' 
      ? projects 
      : projects.filter(project => project && project.category === filter);
  }, [projects, filter]);

  return {
    projects,
    loading,
    error,
    filteredProjects
  };
};

/**
 * Get unique categories from projects with counts
 * @param {Array} projects - Array of project objects
 * @returns {Array} Array of category objects with value, label, and count
 */
export const getProjectCategories = (projects) => {
  if (!Array.isArray(projects) || projects.length === 0) {
    return [{ value: 'all', label: 'All Projects', count: 0 }];
  }

  const categoriesMap = projects.reduce((acc, project) => {
    if (project && project.category) {
      acc[project.category] = (acc[project.category] || 0) + 1;
    }
    return acc;
  }, {});

  const categoryObjects = [
    { value: 'all', label: 'All Projects', count: projects.length }
  ];

  Object.entries(categoriesMap).forEach(([category, count]) => {
    categoryObjects.push({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
      count
    });
  });

  return categoryObjects;
};
