"use client"

import { AnimatePresence, motion } from "motion/react"
import { X, Plus } from "lucide-react"
import { useState } from "react"

const availableTags = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Framer Motion",
  "Node.js",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Vercel",
  "Firebase",
  "Supabase",
  "Prisma",
] as const

const animations = {
  container: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  tag: {
    initial: { opacity: 0, scale: 0.8, x: -20 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.8, x: 20 },
    hover: { scale: 1.05, y: -1 },
  },
  suggestion: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" },
  },
} as const

export default function Input06() {
  const [selectedTags, setSelectedTags] = useState<string[]>(["React", "TypeScript"])
  const [showSuggestions, setShowSuggestions] = useState(false)

  function addTag(tag: string) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  function removeTag(tag: string) {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const availableToAdd = availableTags.filter((tag) => !selectedTags.includes(tag))

  return (
    <motion.div
      variants={animations.container}
      initial="initial"
      animate="animate"
      className="flex w-full flex-col items-center justify-center gap-6"
    >
      <div className="w-full max-w-md">
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <AnimatePresence>
            {selectedTags.map((tag, index) => (
              <motion.div
                key={tag}
                variants={animations.tag}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                <span>{tag}</span>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => removeTag(tag)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X className="h-3 w-3" />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>

          {selectedTags.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-zinc-500 dark:text-zinc-400 text-sm self-center"
            >
              No tags selected
            </motion.p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="mt-3 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
        >
          <Plus className="h-4 w-4" />
          {showSuggestions ? "Hide suggestions" : "Add tags"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showSuggestions && availableToAdd.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full max-w-md overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
              {availableToAdd.map((tag, index) => (
                <motion.button
                  key={tag}
                  variants={animations.suggestion}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => addTag(tag)}
                  className="px-3 py-1 text-sm text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600 rounded-full hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
