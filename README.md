# GiaSi Portfolio

![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue)
![Vite](https://img.shields.io/badge/Vite-6-green)
![Three.js](https://img.shields.io/badge/Three.js-0.176.0-orange)

Modern personal portfolio website built with React 19, Vite 6, TailwindCSS 4, and Three.js. Features 3D elements, animations, blog section, contact form, and dark/light mode.

![GiaSi Portfolio Screenshot](https://placehold.co/800x400/0f172a/0ea5e9?text=GiaSi+Portfolio)

## 🌟 Features

- ✅ Modern, responsive design
- ✅ Dark/Light mode toggle
- ✅ Animated page transitions
- ✅ Interactive 3D background with Three.js
- ✅ Blog section with search and filter functionality
- ✅ Contact form with validation
- ✅ PDF resume viewer
- ✅ Preloader for assets
- ✅ GitHub contributions calendar
- ✅ Project showcase with filter functionality

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **CSS Framework**: TailwindCSS 4
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: Framer Motion, GSAP
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM 7
- **Icons**: React Icons

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/giasi-portfolio.git
   cd giasi-portfolio
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

## 📋 Project Structure

```
giasi-portfolio/
├── public/               # Static assets
├── src/
│   ├── components/        
│   │   ├── About/        # About section components
│   │   ├── Blog/         # Blog section components
│   │   ├── Contact/      # Contact form components
│   │   ├── Home/         # Home page components
│   │   ├── Layout/       # Layout components (Navbar, Footer, etc.)
│   │   ├── Projects/     # Projects showcase components
│   │   └── Resume/       # Resume section components
│   ├── context/          # React context providers
│   ├── App.css           # Main CSS file
│   ├── App.jsx           # Main App component
│   ├── index.css         # Global CSS
│   └── main.jsx          # Entry point
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # TailwindCSS configuration
└── vite.config.js        # Vite configuration
```

## 🧰 Components

### Layout
- **Navbar**: Navigation with light/dark mode toggle
- **Footer**: Site footer with social links
- **Preloader**: Loading screen for initial load
- **Particles3D**: Interactive 3D background
- **PageTransition**: Animated transitions between pages

### Pages
- **Home**: Landing page with hero section
- **About**: About me section with skills
- **Projects**: Portfolio projects with filter
- **Blog**: Blog posts with search and categories
- **Contact**: Contact form with validation
- **Resume**: Resume/CV with education, experience, and skills

## 🎨 Customization

### Theme Colors
Edit the colors in the `tailwind.config.js` file:

```js
theme: {
  extend: {
    colors: {
      // Light mode colors
      light: {
        primary: '#3b82f6', // Change this to your primary color
        // ...other colors
      },
      // Dark mode colors
      dark: {
        primary: '#3b82f6', // Change this to your dark mode primary color
        // ...other colors
      }
    }
  }
}
```

### Content
Update your personal information in the respective component files.

## 📱 Responsive Design

The portfolio is fully responsive and works well on:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktops (1024px and up)
- Large screens (1440px and up)

## 📄 License

MIT License - feel free to use this template for your personal portfolio!

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)