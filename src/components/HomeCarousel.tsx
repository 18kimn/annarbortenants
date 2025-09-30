'use client'

import {useState} from 'react'
import Image from 'next/image'
import {Box, IconButton, MobileStepper, Paper} from '@mui/material'
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material'
import {motion, AnimatePresence} from 'framer-motion'

type ImageCarouselProps = {
  images: {
    path: string
    caption: string
  }[]
}

export default function ImageCarousel({images}: ImageCarouselProps) {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const handleNext = () =>
    setActiveStep((prev) => (prev + 1) % maxSteps)
  const handleBack = () =>
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps)

  if (!images.length) {
    return
  }

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        margin: 'auto',
        p: 2,
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {/* Image + Animation */}
      <Box
        sx={{
          position: 'relative',
          height: 400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[activeStep].path}
            initial={{opacity: 0, x: 50}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -50}}
            transition={{duration: 0.4}}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              src={'/home/' + images[activeStep].path}
              alt={images[activeStep].caption}
              fill
              style={{objectFit: 'cover', borderRadius: '12px'}}
            />
            {images.map((img, index) =>
              Math.abs(activeStep - index) <= 1 ? (
                <link
                  rel="preload"
                  as="image"
                  href={'/home/' + images[activeStep].path}
                  key={img.path}
                />
              ) : null,
            )}
          </motion.div>
        </AnimatePresence>
      </Box>

      <Box sx={{p: 2, textAlign: 'center'}}>
        <em>{images[activeStep].caption}</em>
      </Box>

      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <IconButton onClick={handleNext} size="large">
            <KeyboardArrowRight />
          </IconButton>
        }
        backButton={
          <IconButton onClick={handleBack} size="large">
            <KeyboardArrowLeft />
          </IconButton>
        }
        sx={{
          justifyContent: 'space-between',
          background: 'transparent',
        }}
      />
    </Paper>
  )
}
