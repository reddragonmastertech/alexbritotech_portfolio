import { useState, useEffect } from 'react';

/**
 * Custom hook to load and manage projects data
 * @returns {Object} { projects, loading, error, filteredProjects }
 */
export const useProjects = (filter = 'all') => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Dynamic import for better code splitting
        const { default: projectsData } = await import('../data/projects.json');
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Filter projects based on category
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
