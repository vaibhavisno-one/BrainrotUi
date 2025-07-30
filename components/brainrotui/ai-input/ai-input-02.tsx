"use client"
import { Send, Mic, Plus } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"

export default function AIInput02() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 200,
  })
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    setInputValue("")
    adjustHeight(true)
  }

  return (
    <div className="w-full py-4">
      <div className="relative max-w-4xl w-full mx-auto">
        <div className="relative border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 transition-colors overflow-hidden">
          <div className="flex items-start gap-3 p-4">
            <button
              type="button"
              className="flex-shrink-0 mt-0.5 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-500" />
            </button>
            <Textarea
              placeholder="Type a message..."
              className={cn(
                "flex-1 bg-transparent border-none p-0 m-0",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                "text-gray-900 dark:text-gray-100",
                "resize-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                "transition-all duration-150 ease-out",
                "leading-[1.4]",
                "min-h-[24px] max-h-[160px]",
                "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
              )}
              ref={textareaRef}
              value={inputValue}
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
            <div className="flex items-start gap-1 mt-0.5 flex-shrink-0">
              <button
                type="button"
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Mic className="w-4 h-4 text-gray-500" />
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className={cn(
                  "p-1.5 rounded-lg transition-all duration-200",
                  inputValue.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed",
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
