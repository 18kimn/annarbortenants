"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./HomeCarousel.module.css";

type ImageCarouselProps = {
  images: {
    path: string;
    caption: string;
  }[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () =>
    setActiveStep((prev) => (prev + 1) % maxSteps);
  const handleBack = () =>
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);

  if (!images.length) {
    return <div className={styles.placeholder} aria-hidden />;
  }

  return (
    <figure className={styles.figure}>
      <div className={styles.imageFrame}>
        <AnimatePresence>
          <motion.div
            key={images[activeStep].path}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className={styles.imageWrapper}
          >
            <Image
              src={"/home/" + images[activeStep].path}
              alt={images[activeStep].caption}
              fill
              sizes="(max-width: 900px) 90vw, 500px"
              style={{ objectFit: "cover" }}
            />
            {images.map((img, index) =>
              Math.abs(activeStep - index) <= 1 ? (
                <link
                  rel="preload"
                  as="image"
                  href={"/home/" + img.path}
                  key={img.path}
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
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`${styles.dot} ${
                i === activeStep ? styles.dotActive : ""
              }`}
            />
          ))}
        </div>
      </div>
      <figcaption className={styles.caption}>
        {images[activeStep].caption}
      </figcaption>
    </figure>
  );
}
