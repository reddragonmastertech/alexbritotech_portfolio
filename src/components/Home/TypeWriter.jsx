import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

function TypeWriter({ texts, speed = 100, delay = 1500 }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const cursorRef = useRef(null)
  
  useEffect(() => {
    // Cursor blinking animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    })

    // Typing animation logic
    const timer = setTimeout(() => {
      const currentText = texts[index]
      
      if (isDeleting) {
        // Deleting text
        setDisplayedText(currentText.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
        
        // When deletion is complete
        if (charIndex <= 1) {
          setIsDeleting(false)
          setIndex((prevIndex) => (prevIndex + 1) % texts.length)
        }
      } else {
        // Typing text
        setDisplayedText(currentText.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
        
        // When typing is complete
        if (charIndex >= currentText.length) {
          // Wait before starting to delete
          setTimeout(() => {
            setIsDeleting(true)
          }, delay)
          return
        }
      }
    }, isDeleting ? speed / 2 : speed) // Delete faster than type
    
    return () => clearTimeout(timer)
  }, [texts, index, charIndex, isDeleting, speed, delay])

  return (
    <div className="inline-flex items-center">
      <span className="blue-gradient-text">{displayedText}</span>
      <span 
        ref={cursorRef} 
        className="ml-1 w-1 h-8 bg-sky-500"
      ></span>
    </div>
  )
}

export default TypeWriter