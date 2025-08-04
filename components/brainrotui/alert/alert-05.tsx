import { CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap, X } from "lucide-react"

export default function Alert05() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">New Feature Available</h3>
            <p className="text-[13px] text-blue-600 dark:text-blue-300">
              Check out our new dashboard analytics feature.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}