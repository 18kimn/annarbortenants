'use client'

import {useState} from 'react'
import Image from 'next/image'
import {IconButton} from '@mui/material'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material'
import {motion, AnimatePresence} from 'framer-motion'
import styles from './HomeCarousel.module.css'
import {imageSrc} from '@/sanity/image'
import type {CarouselSlide} from '@/sanity/types'

export default function HomeCarousel({
  slides,
}: {
  slides: CarouselSlide[]
}) {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = slides.length

  const handleNext = () =>
    setActiveStep((prev) => (prev + 1) % maxSteps)
  const handleBack = () =>
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps)

  if (!maxSteps) {
    return <div className={styles.placeholder} aria-hidden />
  }

  const activeSlide = slides[activeStep]
  const activeSrc = imageSrc(activeSlide.image, 1000)

  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <AnimatePresence>
          <motion.div
            key={activeSrc}
            initial={{opacity: 0, x: 30}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -30}}
            transition={{duration: 0.35}}
            className={styles.imageWrapper}
          >
            <Image
              src={activeSrc}
              alt={
                activeSlide.image?.alt ?? activeSlide.caption ?? ''
              }
              fill
              sizes="(max-width: 900px) 90vw, 500px"
              style={{objectFit: 'cover'}}
            />
            {slides.map((slide, index) =>
              Math.abs(activeStep - index) <= 1 ? (
                <link
                  rel="preload"
                  as="image"
                  href={imageSrc(slide.image, 1000)}
                  key={slide._key ?? index}
                />
              ) : null,
            )}
          </motion.div>
        </AnimatePresence>

        <IconButton
          onClick={handleBack}
          aria-label="Previous image"
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          size="small"
        >
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          aria-label="Next image"
          className={`${styles.navButton} ${styles.navButtonRight}`}
          size="small"
        >
          <KeyboardArrowRight />
        </IconButton>

        <div className={styles.dots}>
          {slides.map((slide, index) => (
            <button
              key={slide._key ?? index}
              onClick={() => setActiveStep(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`${styles.dot} ${
                index === activeStep ? styles.dotActive : ''
              }`}
            />
          ))}
        </div>
      </div>
      <figcaption className={styles.caption}>
        {activeSlide.caption}
      </figcaption>
    </figure>
  )
}
