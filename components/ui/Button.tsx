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
          "inline-flex items-center justify-center font-body text-xs font-semibold uppercase tracking-[0.15em] border border-transparent rounded-full px-10 py-[18px] transition-all duration-500 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent",
          variant === "primary" && [
            "bg-accent text-black shadow-button hover:translate-y-[-5px] hover:shadow-[0_20px_40px_oklch(0.68_0.1_70/0.45)]",
            "active:translate-y-0 active:shadow-button",
          ],
          variant === "outline" && [
            "border-border text-foreground hover:bg-accent hover:text-black hover:border-accent hover:translate-y-[-5px]",
            "active:translate-y-0",
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
