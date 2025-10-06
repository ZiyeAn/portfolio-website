"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./AnimatedTestimonials.module.css";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const rotationAngles = useMemo(() => {
    return testimonials.map((item, index) => {
      const seed = (item.src?.length ?? 0) + index * 17;
      const angle = ((seed % 21) + 21) % 21; // 0 - 20
      return angle - 10; // -10 to 10
    });
  }, [testimonials]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActive((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActive((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total === 0) {
      setActive(0);
      return;
    }
    if (active < total) return;
    setActive(active % total);
  }, [total, active]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay || total <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoplay, total]);

  if (total === 0) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.textColumn}>
        <motion.div
          key={active}
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: -20,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className={styles.contentBlock}
        >
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>{testimonials[active].name}</h3>
            {testimonials[active].designation ? (
              <p className={styles.meta}>{testimonials[active].designation}</p>
            ) : null}
          </div>
          <motion.p className={styles.quote}>
            {testimonials[active].quote.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{
                  filter: "blur(10px)",
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.02 * index,
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>
        </motion.div>
        <div className={styles.controls}>
          <button
            onClick={handlePrev}
            className={`${styles.controlButton} ${styles.controlButtonPrev}`}
            aria-label="Previous project"
          >
            <IconArrowLeft className={styles.controlIcon} />
          </button>
          <button
            onClick={handleNext}
            className={`${styles.controlButton} ${styles.controlButtonNext}`}
            aria-label="Next project"
          >
            <IconArrowRight className={styles.controlIcon} />
          </button>
        </div>
      </div>
      <div className={styles.imageColumn}>
        <div className={styles.imageStage}>
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  z: -100,
                  rotate: rotationAngles[index] ?? 0,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.95,
                  z: isActive(index) ? 0 : -100,
                  rotate: isActive(index)
                    ? 0
                    : rotationAngles[index] ?? 0,
                  zIndex: isActive(index)
                    ? 40
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? [0, -30, 0] : 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  z: 100,
                  rotate: rotationAngles[index] ?? 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  width={500}
                  height={500}
                  draggable={false}
                  className={`${styles.imageInner} ${styles.imageShadow}`}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
