import { CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap, X } from "lucide-react"

export default function Alert06() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
          <div className="flex-1">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">You have 3 new notifications</p>
          </div>
          <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}