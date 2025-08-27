# GiaSi Dev Portfolio
<img width="2530" height="882" alt="GS_Profile" src="./public/portfolio.PNG" />

![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![Vite](https://img.shields.io/badge/Vite-6-green)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-purple)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

Modern personal portfolio website built with React 19, Vite 6, TailwindCSS 4, and advanced animations. Features responsive design, dark theme, smooth animations, blog section, contact form, and optimized performance for mobile devices.

## 🔗 Live Demo

**Production Site**: [https://nguyentrangiasi.id.vn](https://nguyentrangiasi.id.vn)
## 🌟 Features

- ✅ **Modern Design**: Clean, professional dark theme with glass morphism effects
- ✅ **Responsive Layout**: Optimized for mobile, tablet, and desktop devices
- ✅ **Smooth Animations**: Advanced Framer Motion scroll animations with alternating directional effects
- ✅ **Interactive Background**: CSS-based animated particles and gradient effects
- ✅ **Blog System**: Complete blog section with search, filter, and bookmark functionality
- ✅ **Contact Form**: Professional contact form with validation and toast notifications
- ✅ **PDF Resume Viewer**: Integrated resume viewer with download functionality
- ✅ **Performance Optimized**: Mobile-first approach with optimized animations and lazy loading
- ✅ **GitHub Integration**: Live GitHub contributions calendar
- ✅ **Project Showcase**: Dynamic project filtering with modern card layouts
- ✅ **SEO Ready**: Built-in SEO optimization with meta tags and Open Graph support

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **CSS Framework**: TailwindCSS 4
- **Animation Library**: Framer Motion 11
- **UI Components**: Custom components with glass morphism design
- **Form Handling**: React Hook Form with validation
- **Routing**: React Router DOM 7
- **Icons**: React Icons (FontAwesome, Heroicons)
- **Performance**: React.lazy, Suspense, mobile optimization
- **SEO**: React Helmet Async for meta tags

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/giasinguyen/giasi-dev-portfolio.git
   cd giasi-dev-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## 🎯 Recent Updates (August 2025)

### Major Performance Improvements
- **Removed Three.js dependency** for better mobile performance
- **Replaced 3D elements** with lightweight CSS animations
- **Optimized Framer Motion animations** with mobile detection
- **Enhanced scroll animations** with alternating left/right entrance effects

### Component Rebuild
- **Complete Contact component redesign** with dark theme and glass morphism
- **Full Blog system overhaul** with modern card layouts and interactions
- **Enhanced Projects showcase** with improved filtering and animations
- **Redesigned Footer** with better social media integration

### Mobile Optimization
- **Mobile-first animations** with reduced complexity for smaller screens
- **Performance monitoring** with real-time metrics
- **Avatar integration** in About section with floating badges
- **Optimized loading states** and error boundaries

## 🚀 Deployment

This project is automatically deployed to Vercel using GitHub Actions.

### Automatic Deployment
- **Production**: Pushes to `main` branch trigger automatic deployment
- **Preview**: Pull requests create preview deployments  
- **Domain**: [gia-si-portfolio.vercel.app](https://gia-si-portfolio.vercel.app)

### Manual Deployment
```bash
# Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

## 📋 Project Structure

```
giasi-dev-portfolio/
├── public/                    # Static assets
│   ├── documents/            # Resume PDF and documents
│   ├── avatar.jpg           # Profile avatar image
│   └── logo.png            # Brand logo
├── src/
│   ├── components/
│   │   ├── About/           # About section with avatar and skills
│   │   │   ├── About.jsx            # Main about component
│   │   │   └── GitHubContributions.jsx  # GitHub calendar
│   │   ├── Blog/            # Complete blog system
│   │   │   ├── Blog.jsx             # Blog listing with filters
│   │   │   ├── BlogDetail.jsx       # Individual blog post
│   │   │   └── BlogPostCard.jsx     # Modern blog cards
│   │   ├── Contact/         # Professional contact form
│   │   │   └── Contact.jsx          # Glass morphism contact form
│   │   ├── Home/            # Landing page components
│   │   │   ├── Home.jsx             # Main home component
│   │   │   ├── HeroModel.jsx        # CSS-based hero animation
│   │   │   └── TypeWriter.jsx       # Typewriter effect
│   │   ├── Layout/          # Layout and UI components
│   │   │   ├── Footer.jsx           # Modern footer with social links
│   │   │   ├── Navbar.jsx           # Navigation with theme toggle
│   │   │   ├── Particles3D.jsx      # CSS particle animation
│   │   │   ├── Preloader.jsx        # Loading screen
│   │   │   └── ThemeSwitcher.jsx    # Dark/light mode toggle
│   │   ├── Projects/        # Portfolio showcase
│   │   │   ├── Projects.jsx         # Project grid with filters
│   │   │   └── ProjectCard.jsx      # Individual project cards
│   │   ├── Resume/          # Resume section
│   │   │   └── Resume.jsx           # PDF viewer and resume data
│   │   ├── SEO/             # SEO optimization
│   │   │   ├── SEOHead.jsx          # Meta tags component
│   │   │   └── seoConfigs.js        # SEO configurations
│   │   └── UI/              # Reusable UI components
│   │       └── LoadingSpinner.jsx   # Loading indicators
│   ├── context/             # React context providers
│   │   └── ThemeContext.jsx         # Theme state management
│   ├── data/                # Static data
│   │   ├── blogPosts.json           # Blog posts data
│   │   └── projects.json            # Projects data
│   ├── hooks/               # Custom React hooks
│   │   ├── useBlogPosts.js          # Blog posts logic
│   │   └── useProjects.js           # Projects logic
│   ├── utils/               # Utility functions
│   │   └── pdfUtils.js              # PDF handling utilities
│   ├── App.css              # Main styles with glass morphism
│   ├── App.jsx              # Main App component
│   ├── index.css            # Global styles and animations
│   └── main.jsx             # Entry point with error boundary
├── eslint.config.js         # ESLint configuration
├── tailwind.config.js       # TailwindCSS with custom theme
├── vite.config.js           # Vite configuration
└── vercel.json             # Vercel deployment config
```

## 🧰 Components

### Layout Components
- **Navbar**: Modern navigation with smooth theme toggle and mobile menu
- **Footer**: Professional footer with social media links and newsletter signup
- **Preloader**: Elegant loading screen with progress indicator
- **Particles3D**: Lightweight CSS-based particle animation background
- **PageTransition**: Smooth page transitions with Framer Motion

### Page Components
- **Home**: Hero section with CSS-animated geometric shapes and typewriter effect
- **About**: Personal introduction with avatar, skills showcase, and GitHub contributions
- **Projects**: Dynamic project showcase with category filtering and alternating animations
- **Blog**: Complete blog system with search, categories, and bookmark functionality
- **Contact**: Professional contact form with validation and glass morphism design
- **Resume**: Interactive resume viewer with PDF download and structured experience data

### UI Components
- **Glass Morphism Cards**: Modern translucent design elements
- **Loading Spinners**: Custom loading indicators for different states
- **Animated Buttons**: Interactive buttons with hover effects
- **Scroll Animations**: Alternating left/right entrance animations

## 🎨 Animation Features

### Framer Motion Implementations
- **Scroll-triggered animations** with viewport detection
- **Alternating directional effects** (left/right entrance)
- **Staggered animations** for lists and grids
- **Mobile-optimized animations** with reduced complexity
- **Page transitions** with smooth fade effects

### Performance Optimizations
- **Mobile device detection** for animation complexity adjustment
- **Viewport-based triggers** to prevent unnecessary animations
- **Reduced motion support** for accessibility
- **Lazy loading** for heavy components

## 📱 Mobile Optimization

The portfolio is specifically optimized for mobile devices:
- **Touch-friendly interfaces** with appropriate hit targets
- **Simplified animations** on smaller screens
- **Optimized images** and assets
- **Fast loading times** with performance monitoring
- **Responsive typography** that scales properly
- **Mobile-first CSS** with progressive enhancement

## 🎨 Customization

### Theme Configuration
The portfolio uses a sophisticated dark theme with customizable elements:

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      // Dark theme palette
      slate: {
        900: '#0f172a', // Primary background
        800: '#1e293b', // Secondary background
        700: '#334155', // Border color
        // ... gradient variations
      },
      // Accent colors
      blue: {
        500: '#3b82f6', // Primary accent
        400: '#60a5fa', // Secondary accent
      },
      violet: {
        500: '#8b5cf6', // Gradient accent
      }
    },
    animation: {
      'gradient': 'gradient 15s ease infinite',
      'float': 'float 6s ease-in-out infinite',
      'particle': 'particle 20s linear infinite',
    }
  }
}
```

### Glass Morphism Effects
The portfolio features modern glass morphism design:

```css
.glass-effect {
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 116, 139, 0.2);
}
```

### Content Updates
Update your personal information in these key files:
- `src/data/projects.json` - Your project portfolio
- `src/data/blogPosts.json` - Blog articles
- `src/components/About/About.jsx` - Personal information and skills
- `public/documents/GiaSi_Resume.pdf` - Your resume PDF

## � Performance Features

### Optimization Techniques
- **Bundle size optimization** - Removed heavy Three.js dependencies
- **Code splitting** - React.lazy and Suspense for route-based splitting
- **Image optimization** - Proper image formats and lazy loading
- **Animation performance** - Hardware-accelerated CSS animations
- **Mobile-first approach** - Optimized animations for mobile devices

### Performance Monitoring
Built-in performance monitoring tracks:
- Page load times
- Memory usage
- Animation frame rates
- User interaction metrics

### SEO Optimization
- **Meta tags** - Dynamic meta tags for each page
- **Open Graph** - Social media sharing optimization
- **Structured data** - JSON-LD for better search engine understanding
- **Fast loading** - Optimized Core Web Vitals scores

## 📄 License

MIT License - feel free to use this template for your personal portfolio!

## 🙏 Acknowledgements

- [React 19](https://reactjs.org/) - Frontend framework
- [Vite 6](https://vitejs.dev/) - Build tool and dev server
- [TailwindCSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [React Router](https://reactrouter.com/) - Client-side routing
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Contact

- **Portfolio**: [https://gia-si-portfolio.vercel.app](https://gia-si-portfolio.vercel.app)
- **GitHub**: [https://github.com/giasinguyen](https://github.com/giasinguyen)
- **Email**: contact@giasinguyen.dev

---

Built with ❤️ by GiaSi Nguyen using modern web technologies
