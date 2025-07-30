import { CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Alert04() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
            <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">Storage Almost Full</h3>
            <p className="text-[13px] text-amber-600 dark:text-amber-300">
              You're using 90% of your storage space. Consider upgrading.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}