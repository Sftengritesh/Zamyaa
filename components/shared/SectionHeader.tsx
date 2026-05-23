import { cn } from "@/lib/utils";
import RevealOnScroll from "./RevealOnScroll";

interface SectionHeaderProps {
  label?: string;
  title: string;
  viewAllLink?: string;
  viewAllText?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  viewAllLink,
  viewAllText = "View All",
  centered = false,
}: SectionHeaderProps) {
  return (
    <RevealOnScroll className={cn("mb-12 md:mb-16", centered && "text-center")}>
      <div className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4",
        centered && "items-center md:items-center md:justify-center"
      )}>
        <div>
          {label && (
            <span className="text-xs tracking-[0.2em] uppercase text-accent font-medium block mb-2">
              {label}
            </span>
          )}
          <h2 className="text-4xl md:text-[70px] font-heading font-light leading-[1.1] text-foreground">
            {title}
          </h2>
        </div>
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-xs tracking-[0.12em] uppercase text-accent font-semibold no-underline hover:text-accent-light transition-colors self-start md:self-end"
          >
            {viewAllText}
          </a>
        )}
      </div>
    </RevealOnScroll>
  );
}
