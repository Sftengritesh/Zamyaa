import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 px-[8%] text-center">
      <div className="max-w-md">
        <span className="text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-4 animate-pulse">
          404 Error
        </span>
        <h1 className="text-6xl md:text-8xl font-heading font-light text-foreground mb-6">
          Lost Silhouette
        </h1>
        <p className="text-muted font-body text-base leading-relaxed mb-10">
          The masterpiece collection or boutique design page you are trying to view does not exist or has been archived.
        </p>
        <Link href="/">
          <Button variant="primary">Return to Homepage</Button>
        </Link>
      </div>
    </main>
  );
}
