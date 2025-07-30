"use client"
import { Zap, Mic, Sparkles } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"

export default function AIInput05() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 50,
    maxHeight: 200,
  })
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    setInputValue("")
    adjustHeight(true)
  }

  return (
    <div className="w-full py-8">
      <div className="relative max-w-2xl w-full mx-auto">
        <div
          className={cn(
            "relative transition-all duration-300 ease-out",
            isFocused ? "transform -translate-y-1 shadow-2xl" : "shadow-lg",
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-sm opacity-20"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700">
            <Textarea
              placeholder="✨ Ask me anything magical..."
              className={cn(
                "w-full bg-transparent rounded-3xl pl-6 pr-20",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "border-none text-gray-900 dark:text-gray-100",
                "overflow-y-auto resize-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "transition-all duration-200 ease-out",
                "leading-[1.4] py-4",
                "min-h-[50px] max-h-[200px]",
              )}
              ref={textareaRef}
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                setInputValue(e.target.value)
                adjustHeight()
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Mic className="w-4 h-4 text-gray-500" />
              </button>
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className={cn(
                  "p-2 rounded-xl transition-all duration-200 relative overflow-hidden",
                  inputValue.trim()
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed",
                )}
              >
                {inputValue.trim() ? <Sparkles className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
