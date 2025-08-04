"use client"

import { AnimatePresence, motion } from "motion/react"
import { Check } from "lucide-react"
import { useState } from "react"

const colors = [
  { name: "Red", value: "#ef4444", bg: "bg-red-500" },
  { name: "Orange", value: "#f97316", bg: "bg-orange-500" },
  { name: "Yellow", value: "#eab308", bg: "bg-yellow-500" },
  { name: "Green", value: "#22c55e", bg: "bg-green-500" },
  { name: "Blue", value: "#3b82f6", bg: "bg-blue-500" },
  { name: "Purple", value: "#a855f7", bg: "bg-purple-500" },
  { name: "Pink", value: "#ec4899", bg: "bg-pink-500" },
  { name: "Gray", value: "#6b7280", bg: "bg-gray-500" },
] as const

const animations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  swatch: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: { scale: 1.1, y: -2 },
    tap: { scale: 0.95 },
  },
  ripple: {
    initial: { scale: 0, opacity: 0.8 },
    animate: { scale: 2, opacity: 0 },
  },
} as const

export default function Input02() {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [rippleKey, setRippleKey] = useState(0)

  function handleColorSelect(color: (typeof colors)[0]) {
    setSelectedColor(color)
    setRippleKey((prev) => prev + 1)
  }

  return (
    <motion.div
      variants={animations.container}
      initial="initial"
      animate="animate"
      className="flex w-full flex-col items-center justify-center gap-8"
    >
      <div className="grid grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <motion.button
            key={color.name}
            variants={animations.swatch}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => handleColorSelect(color)}
            className={`relative h-16 w-16 rounded-2xl ${color.bg} shadow-lg overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AnimatePresence>
              {selectedColor.name === color.name && (
                <>
                  <motion.div
                    key={`ripple-${rippleKey}`}
                    variants={animations.ripple}
                    initial="initial"
                    animate="animate"
                    className="absolute inset-0 bg-white rounded-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Check className="h-6 w-6 text-white drop-shadow-lg" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <motion.div
        key={selectedColor.name}
        variants={animations.container}
        initial="initial"
        animate="animate"
        className="text-center"
      >
        <div
          className="mx-auto mb-3 h-8 w-24 rounded-lg shadow-inner"
          style={{ backgroundColor: selectedColor.value }}
        />
        <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{selectedColor.name}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">{selectedColor.value}</p>
      </motion.div>
    </motion.div>
  )
}
