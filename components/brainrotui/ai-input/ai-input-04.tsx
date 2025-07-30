"use client"
import { ArrowUp, Mic, Paperclip } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea"

export default function AIInput_04() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 220,
  })
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = () => {
    if (!inputValue.trim()) return
    setInputValue("")
    adjustHeight(true)
  }

  return (
    <div className="w-full py-6">
      <div className="relative max-w-3xl w-full mx-auto">
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl">
          <Textarea
            placeholder="What's on your mind?"
            className={cn(
              "w-full bg-transparent rounded-2xl pl-6 pr-24",
              "placeholder:text-white/60 dark:placeholder:text-white/40",
              "border-none text-white dark:text-white",
              "overflow-y-auto resize-none",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "transition-all duration-200 ease-out",
              "leading-[1.3] py-4",
              "min-h-[56px] max-h-[220px]",
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
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Paperclip className="w-4 h-4 text-white/70" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Mic className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                inputValue.trim()
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg"
                  : "bg-white/10 text-white/40 cursor-not-allowed",
              )}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
