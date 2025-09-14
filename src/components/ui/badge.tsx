import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background backdrop-blur-sm bg-opacity-80",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/80 text-primary-foreground hover:bg-primary/60 backdrop-blur-md",
        secondary:
          "border-transparent bg-secondary/80 text-secondary-foreground hover:bg-secondary/60 backdrop-blur-md",
        destructive:
          "border-transparent bg-destructive/80 text-destructive-foreground hover:bg-destructive/60 backdrop-blur-md",
        outline: "text-foreground border-border/50 bg-background/20 backdrop-blur-md hover:bg-accent/20",
        category:
          "border-transparent bg-blue-500/80 text-white hover:bg-blue-500/60 backdrop-blur-md",
        issuer:
          "border-transparent bg-green-500/80 text-white hover:bg-green-500/60 backdrop-blur-md",
        feature:
          "border-transparent bg-yellow-500/80 text-black hover:bg-yellow-500/60 backdrop-blur-md",
        employment:
          "border-transparent bg-red-500/80 text-white hover:bg-red-500/60 backdrop-blur-md",
        income:
          "border-transparent bg-purple-500/80 text-white hover:bg-purple-500/60 backdrop-blur-md",
        fees: "border-transparent bg-pink-500/80 text-white hover:bg-pink-500/60 backdrop-blur-md",
        valueBack:
          "border-transparent bg-indigo-500/80 text-white hover:bg-indigo-500/60 backdrop-blur-md",
        interestRate:
          "border-transparent bg-teal-500/80 text-white hover:bg-teal-500/60 backdrop-blur-md",
        age: "border-transparent bg-orange-500/80 text-white hover:bg-orange-500/60 backdrop-blur-md",
        cibilScore:
          "border-transparent bg-gray-500/80 text-white hover:bg-gray-500/60 backdrop-blur-md",
        collaborator:
          "border-transparent bg-lime-500/80 text-black hover:bg-lime-500/60 backdrop-blur-md",
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
