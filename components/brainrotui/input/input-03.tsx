"use client"

import { AnimatePresence, motion } from "motion/react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"

const MAX_QUANTITY = 10
const MIN_QUANTITY = 0

const animations = {
  container: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  number: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  button: {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
  bounce: {
    initial: { y: 0 },
    bounce: { y: [-5, 0], transition: { duration: 0.3 } },
  },
} as const

export default function Input03() {
  const [quantity, setQuantity] = useState(1)
  const [isBouncing, setIsBouncing] = useState(false)

  function handleIncrement() {
    if (quantity < MAX_QUANTITY) {
      setQuantity(quantity + 1)
      triggerBounce()
    }
  }

  function handleDecrement() {
    if (quantity > MIN_QUANTITY) {
      setQuantity(quantity - 1)
      triggerBounce()
    }
  }

  function triggerBounce() {
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 300)
  }

  return (
    <motion.div
      variants={animations.container}
      initial="initial"
      animate="animate"
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <motion.div
        variants={isBouncing ? animations.bounce : undefined}
        initial="initial"
        animate={isBouncing ? "bounce" : "initial"}
        className="flex items-center gap-4 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-lg border border-zinc-200 dark:border-zinc-800"
      >
        <motion.button
          variants={animations.button}
          whileHover="hover"
          whileTap="tap"
          onClick={handleDecrement}
          disabled={quantity <= MIN_QUANTITY}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </motion.button>

        <div className="flex items-center gap-4">
          <div className="text-center min-w-[60px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={quantity}
                variants={animations.number}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-100"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{quantity === 1 ? "item" : "items"}</p>
          </div>
        </div>

        <motion.button
          variants={animations.button}
          whileHover="hover"
          whileTap="tap"
          onClick={handleIncrement}
          disabled={quantity >= MAX_QUANTITY}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </motion.div>

      
    </motion.div>
  )
}
