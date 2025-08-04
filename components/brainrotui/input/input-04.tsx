"use client"

import { motion } from "motion/react"
import { Star } from "lucide-react"
import { useState } from "react"

const MAX_RATING = 5

const animations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  star: {
    initial: { opacity: 0, scale: 0.5, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 180 },
    hover: { scale: 1.1, rotate: 5 },
  },
  shake: {
    initial: { x: 0 },
    shake: { x: [-3, 3, -3, 3, 0], transition: { duration: 0.4 } },
  },
} as const

export default function Input04() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isShaking, setIsShaking] = useState(false)

  function handleStarClick(starIndex: number) {
    if (rating === starIndex + 1) {
      // If clicking the same star, remove rating
      setRating(0)
    } else {
      setRating(starIndex + 1)
    }
  }

  function triggerShake() {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 400)
  }

  return (
    <motion.div
      variants={animations.container}
      initial="initial"
      animate="animate"
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <motion.div
        variants={isShaking ? animations.shake : undefined}
        initial="initial"
        animate={isShaking ? "shake" : "initial"}
        className="flex items-center gap-2"
      >
        {Array.from({ length: MAX_RATING }, (_, i) => {
          const isActive = i < (hoverRating || rating)
          return (
            <motion.button
              key={i}
              variants={animations.star}
              initial="initial"
              animate="animate"
              whileHover="hover"
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              className="relative p-1"
            >
              <Star
                className={`h-8 w-8 transition-colors duration-200 ${
                  isActive ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-600"
                }`}
              />
            </motion.button>
          )
        })}
      </motion.div>

      <motion.div
        key={rating}
        variants={animations.container}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
          {rating === 0 && "Rate your experience"}
          {rating === 1 && "Poor"}
          {rating === 2 && "Fair"}
          {rating === 3 && "Good"}
          {rating === 4 && "Very Good"}
          {rating === 5 && "Excellent"}
        </p>
        {rating > 0 && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {rating} out of {MAX_RATING} stars
          </p>
        )}
      </motion.div>
    </motion.div>
  )
}
