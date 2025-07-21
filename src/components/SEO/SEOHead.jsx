import { useEffect } from 'react';

const SEOHead = ({ 
  title = "GiaSi Portfolio - Full Stack Developer",
  description = "Professional Full Stack Developer specializing in Java, Spring Boot, React, and modern web technologies.",
  keywords = "portfolio, full stack developer, java developer, react developer, spring boot, javascript, web development",
  image = "/logo.png",
  url = "https://giasinguyen.vercel.app/",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    
    // Update Twitter tags
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    updateMetaTag('twitter:url', url, true);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

// Predefined SEO configurations for different pages
export const SEO_CONFIGS = {
  home: {
    title: "GiaSi Portfolio - Full Stack Developer | React, Java, Spring Boot",
    description: "Welcome to GiaSi's portfolio. Professional Full Stack Developer with expertise in Java, Spring Boot, React, and modern web technologies. Explore my projects and skills.",
    keywords: "portfolio, full stack developer, java developer, react developer, spring boot, javascript, web development, software engineer",
    url: "https://giasi-portfolio.vercel.app/"
  },
  
  about: {
    title: "About Me - GiaSi Portfolio | Full Stack Developer",
    description: "Learn about GiaSi, a passionate Full Stack Developer with experience in Java, Spring Boot, React, and modern web technologies. Discover my journey and expertise.",
    keywords: "about, full stack developer, java developer, react developer, software engineer, programming experience",
    url: "https://giasi-portfolio.vercel.app/about"
  },
  
  projects: {
    title: "Projects - GiaSi Portfolio | Web Development Showcase",
    description: "Explore GiaSi's portfolio of web development projects. Full stack applications built with Java, Spring Boot, React, and modern technologies.",
    keywords: "projects, portfolio, web development, java projects, react projects, spring boot, full stack applications",
    url: "https://giasi-portfolio.vercel.app/projects"
  },
  
  blog: {
    title: "Blog - GiaSi Portfolio | Web Development Insights",
    description: "Read GiaSi's blog posts about web development, programming tutorials, and insights on Java, React, Spring Boot, and modern web technologies.",
    keywords: "blog, web development, programming tutorials, java, react, spring boot, javascript, coding tips",
    url: "https://giasi-portfolio.vercel.app/blog"
  },
  
  resume: {
    title: "Resume - GiaSi Portfolio | Full Stack Developer CV",
    description: "View GiaSi's professional resume and CV. Full Stack Developer with expertise in Java, Spring Boot, React, and modern web development technologies.",
    keywords: "resume, cv, full stack developer, java developer, react developer, software engineer, professional experience",
    url: "https://giasi-portfolio.vercel.app/resume"
  },
  
  contact: {
    title: "Contact - GiaSi Portfolio | Get In Touch",
    description: "Get in touch with GiaSi for web development projects, collaborations, or job opportunities. Professional Full Stack Developer available for hire.",
    keywords: "contact, hire developer, full stack developer, web development services, java developer, react developer",
    url: "https://giasi-portfolio.vercel.app/contact"
  }
};

export default SEOHead;
