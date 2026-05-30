import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-body text-xs font-semibold uppercase tracking-[0.15em] border border-transparent rounded-none px-10 py-4 transition-all duration-300 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent",
          variant === "primary" && [
            "bg-accent text-background border border-accent hover:bg-transparent hover:text-accent",
          ],
          variant === "outline" && [
            "border-border text-foreground hover:border-accent hover:text-accent hover:bg-accent/5",
          ],
          variant === "ghost" && "bg-transparent text-foreground hover:text-accent border-none px-4 py-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
