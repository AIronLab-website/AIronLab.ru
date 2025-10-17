"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-lg transform hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80 hover:shadow-lg transform hover:scale-105",
        outline: "border border-foreground/20 bg-transparent hover:bg-foreground/5 hover:border-foreground/40",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        accent: "bg-accent text-accent-foreground shadow hover:bg-accent/90 hover:shadow-lg transform hover:scale-105",
      },
      size: {
        default: "h-12 px-6 py-3", // 48px - exceeds 44px minimum ✅
        sm: "h-11 px-4 py-2 text-xs", // 44px minimum for touch ✅
        lg: "h-14 px-8 py-4 text-base", // 56px - exceeds minimum ✅
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]", // 44px minimum, responsive
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
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }; 