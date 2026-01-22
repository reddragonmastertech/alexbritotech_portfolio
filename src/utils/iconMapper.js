import iconsData from '../data/icons.json'

// Import all icons from react-icons
import { 
  SiSpringboot, 
  SiReact, 
  SiTailwindcss, 
  SiMysql, 
  SiMongodb, 
  SiDocker, 
  SiGit,
  SiIntellijidea,
  SiPostman,
  SiMariadb,
  SiFramer,
  SiCloudinary,
  SiVercel,
  SiGithub,
  SiJavascript,
  SiTypescript,
  SiNeo4J,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiAngular,
  SiPostcss,
  SiSass,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiDjango,
  SiFastapi,
  SiRuby,
  SiRubyonrails,
  SiGraphql,
  SiExpo,
  SiFlutter,
  SiDart,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiOpenai,
  SiAnthropic,
  SiGoogle,
  SiLangchain,
  SiKubernetes,
  SiTerraform,
  SiNetlify,
  SiWebpack,
  // SiAmazonaws,
  // SiMicrosoftazure,
  SiGooglecloud,
  SiGithubactions
} from 'react-icons/si'

import { 
  FaDatabase, 
  FaMobileAlt, 
  FaCloud, 
  FaRocket, 
  FaJava, 
  FaCube, 
  FaBox, 
  FaCode, 
  FaBrain, 
  FaLaptopCode, 
  FaNodeJs, 
  FaNetworkWired
} from 'react-icons/fa'

// Create icon registry
const iconRegistry = {
  // Simple Icons (si)
  SiSpringboot,
  SiReact,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiIntellijidea,
  SiPostman,
  SiMariadb,
  SiFramer,
  SiCloudinary,
  SiVercel,
  SiGithub,
  SiJavascript,
  SiTypescript,
  SiNeo4J,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiAngular,
  SiPostcss,
  SiSass,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiPython,
  SiDjango,
  SiFastapi,
  SiRuby,
  SiRubyonrails,
  SiGraphql,
  SiExpo,
  SiFlutter,
  SiDart,
  SiPostgresql,
  SiRedis,
  SiFirebase,
  SiSupabase,
  SiOpenai,
  SiAnthropic,
  SiGoogle,
  SiLangchain,
  SiKubernetes,
  SiTerraform,
  SiNetlify,
  SiWebpack,
  // SiAmazonaws,
  // SiMicrosoftazure,
  SiGooglecloud,
  SiGithubactions,
  // Font Awesome (fa)
  FaDatabase,
  FaMobileAlt,
  FaCloud,
  FaRocket,
  FaJava,
  FaCube,
  FaBox,
  FaCode,
  FaBrain,
  FaLaptopCode,
  FaNodeJs,
  FaNetworkWired
}

// Build category icon map from JSON
export const categoryIconMap = Object.keys(iconsData.categoryIcons).reduce((map, key) => {
  const iconInfo = iconsData.categoryIcons[key]
  if (iconInfo.type === 'image') {
    // Return image path for PNG icons
    map[key] = { type: 'image', src: `/icons/${iconInfo.image}` }
  } else {
    const IconComponent = iconRegistry[iconInfo.component]
    if (IconComponent) {
      map[key] = IconComponent
    }
  }
  return map
}, {})

// Build tech icon map from JSON
export const techIconMap = Object.keys(iconsData.techIcons).reduce((map, key) => {
  const iconInfo = iconsData.techIcons[key]
  if (iconInfo.type === 'image') {
    // Return image path for PNG icons
    map[key] = { type: 'image', src: `/icons/${iconInfo.image}` }
  } else {
    const IconComponent = iconRegistry[iconInfo.component]
    if (IconComponent) {
      map[key] = IconComponent
    }
  }
  return map
}, {})

// Default fallback icon
export const defaultIcon = FaCode
