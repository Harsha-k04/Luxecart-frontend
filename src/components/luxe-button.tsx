import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LuxeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  children: ReactNode;
}

const buttonStyles = (
  variant: "primary" | "secondary" | "outline",
  size: "sm" | "md" | "lg",
  className?: string
) =>
  cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/80":
        variant === "secondary",
      "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground":
        variant === "outline",
    },
    {
      "h-9 px-4 text-sm rounded-md": size === "sm",
      "h-11 px-6 text-base rounded-lg": size === "md",
      "h-14 px-8 text-lg rounded-lg": size === "lg",
    },
    className
  );

export const LuxeButton = forwardRef<HTMLButtonElement, LuxeButtonProps>(
  ({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
    const classes = buttonStyles(variant, size, className);

    if (asChild && children) {
      // When asChild is true, we expect a single child element and clone it with our classes
      const child = children as React.ReactElement<{ className?: string }>;
      if (typeof child === "object" && "props" in child) {
        const { cloneElement } = require("react");
        return cloneElement(child, {
          className: cn(classes, child.props.className),
        });
      }
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

LuxeButton.displayName = "LuxeButton";
