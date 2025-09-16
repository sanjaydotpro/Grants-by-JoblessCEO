import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-white/20 bg-gradient-to-br from-black/40 via-black/30 to-[#fc1e67]/20 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fc1e67]/50 focus-visible:ring-offset-2 focus-visible:border-[#fc1e67]/40 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-black/50 hover:via-black/40 hover:to-[#fc1e67]/30 focus-visible:bg-gradient-to-br focus-visible:from-black/60 focus-visible:via-black/50 focus-visible:to-[#fc1e67]/40 shadow-lg shadow-black/20 resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }