import { CheckCircle2, XCircle, AlertTriangle, Info, Bell, Zap, X } from "lucide-react"

export default function Alert02() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Payment Successful</h3>
            <p className="text-[13px] text-green-600 dark:text-green-300">
              Your payment has been processed successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}