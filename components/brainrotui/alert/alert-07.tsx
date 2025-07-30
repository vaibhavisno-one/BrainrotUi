import { CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
export default function Alert07() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30">
            <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Upgrade Available</h3>
              <p className="text-[13px] text-purple-600 dark:text-purple-300">
                Unlock premium features with our Pro plan.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700">
                Upgrade Now
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}