import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:border-slate-800 dark:focus:ring-slate-800",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80",
        secondary:
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        destructive:
          "border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-900/80",
        outline: "text-slate-950 dark:text-slate-50",
        category:
          "border-transparent bg-blue-200 text-slate-900 hover:bg-blue-200/80 dark:bg-blue-800 dark:text-slate-50 dark:hover:bg-blue-800/80",
        issuer:
          "border-transparent bg-green-200 text-slate-900 hover:bg-green-200/80 dark:bg-green-800 dark:text-slate-50 dark:hover:bg-green-800/80",
        feature:
          "border-transparent bg-yellow-200 text-slate-900 hover:bg-yellow-200/80 dark:bg-yellow-800 dark:text-slate-50 dark:hover:bg-yellow-800/80",
        employment:
          "border-transparent bg-red-200 text-slate-900 hover:bg-red-200/80 dark:bg-red-800 dark:text-slate-50 dark:hover:bg-red-800/80",
        income:
          "border-transparent bg-purple-200 text-slate-900 hover:bg-purple-200/80 dark:bg-purple-800 dark:text-slate-50 dark:hover:bg-purple-800/80",
        fees: "border-transparent bg-pink-200 text-slate-900 hover:bg-pink-200/80 dark:bg-pink-800 dark:text-slate-50 dark:hover:bg-pink-800/80",
        valueBack:
          "border-transparent bg-indigo-200 text-slate-900 hover:bg-indigo-200/80 dark:bg-indigo-800 dark:text-slate-50 dark:hover:bg-indigo-800/80",
        interestRate:
          "border-transparent bg-teal-200 text-slate-900 hover:bg-teal-200/80 dark:bg-teal-800 dark:text-slate-50 dark:hover:bg-teal-800/80",
        age: "border-transparent bg-orange-200 text-slate-900 hover:bg-orange-200/80 dark:bg-orange-800 dark:text-slate-50 dark:hover:bg-orange-800/80",
        cibilScore:
          "border-transparent bg-gray-200 text-slate-900 hover:bg-gray-200/80 dark:bg-gray-800 dark:text-slate-50 dark:hover:bg-gray-800/80",
        collaborator:
          "bg-lime-200 text-slate-900 hover:bg-lime-200/80 dark:bg-lime-800 dark:text-slate-50 dark:hover:bg-lime-800/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
