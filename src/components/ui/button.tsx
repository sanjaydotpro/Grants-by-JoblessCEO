import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-blue-600/90 text-white hover:bg-blue-500/80 backdrop-blur-md border border-blue-400/30 shadow-lg hover:shadow-xl transition-all duration-300",
        destructive:
          "bg-destructive/80 text-destructive-foreground hover:bg-destructive/60 backdrop-blur-md border border-destructive/20",
        outline:
          "border-2 border-blue-400/50 bg-background/10 hover:bg-blue-500/20 hover:border-blue-300/70 text-foreground hover:text-blue-100 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300",
        outlineNone:
          "bg-background/20 hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-md",
        secondary:
          "bg-gradient-to-r from-gray-600/80 to-gray-700/80 text-white hover:from-gray-500/60 hover:to-gray-600/60 backdrop-blur-md border border-gray-400/30 shadow-lg hover:shadow-xl transition-all duration-300",
        ghost:
          "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-md",
        link: "text-primary underline-offset-4 hover:underline backdrop-blur-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
