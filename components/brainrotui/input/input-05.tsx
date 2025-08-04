"use client"

import type React from "react"

import { motion } from "motion/react"
import { Volume2, VolumeX } from "lucide-react"
import { useState } from "react"

const animations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  thumb: {
    initial: { scale: 1 },
    hover: { scale: 1.2 },
    drag: { scale: 1.3 },
  },
  wave: {
    initial: { scaleY: 0.3 },
    animate: { scaleY: [0.3, 1, 0.3] },
  },
} as const

export default function Input05() {
  const [value, setValue] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value))
  }

  return (
    <motion.div
      variants={animations.container}
      initial="initial"
      animate="animate"
      className="flex w-full flex-col items-center justify-center gap-8"
    >
      <div className="flex items-center gap-6 w-full max-w-md">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-zinc-600 dark:text-zinc-400">
          {value === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </motion.div>

        <div className="relative flex-1">
          <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              style={{ width: `${value}%` }}
              animate={{ width: `${value}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <motion.div
            variants={animations.thumb}
            animate={isDragging ? "drag" : "initial"}
            whileHover="hover"
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-zinc-800 border-2 border-blue-500 rounded-full shadow-lg"
            style={{ left: `calc(${value}% - 12px)` }}
          />
        </div>

        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-lg font-medium text-zinc-900 dark:text-zinc-100 min-w-[3ch] text-center"
        >
          {value}
        </motion.span>
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            variants={animations.wave}
            animate={value > 0 ? "animate" : "initial"}
            transition={{
              duration: 0.8,
              repeat: value > 0 ? Number.POSITIVE_INFINITY : 0,
              delay: i * 0.1,
            }}
            className="w-1 h-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
            style={{ opacity: value > i * 20 ? 1 : 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  )
}
