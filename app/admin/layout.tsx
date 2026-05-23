import Link from "next/link";
import { LayoutDashboard, FileSpreadsheet, Layers, Sliders, Home, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Admin Sidebar Navigation */}
      <aside className="w-64 border-r border-border bg-card flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="p-8 border-b border-border-light text-center">
            <h2 className="font-heading text-xl tracking-[0.2em] text-foreground">
              ZAMYAA
            </h2>
            <span className="text-[10px] tracking-widest uppercase text-accent font-semibold block mt-1">
              Boutique Admin
            </span>
          </div>

          <nav className="p-6 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground text-sm font-semibold hover:bg-accent hover:text-black transition-colors no-underline"
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </Link>

            <Link
              href="/studio/desk/product"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground text-sm font-semibold hover:bg-accent hover:text-black transition-colors no-underline"
            >
              <FileSpreadsheet size={18} />
              <span>Manage Products</span>
            </Link>

            <Link
              href="/studio/desk/collection"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground text-sm font-semibold hover:bg-accent hover:text-black transition-colors no-underline"
            >
              <Layers size={18} />
              <span>Manage Collections</span>
            </Link>

            <Link
              href="/studio/desk/banner"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground text-sm font-semibold hover:bg-accent hover:text-black transition-colors no-underline"
            >
              <Sliders size={18} />
              <span>Homepage Banners</span>
            </Link>

            <Link
              href="/studio/desk/siteSettings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground text-sm font-semibold hover:bg-accent hover:text-black transition-colors no-underline"
            >
              <Sliders size={18} />
              <span>Global Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-border-light space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-muted hover:text-foreground text-xs font-semibold no-underline"
          >
            <Home size={16} />
            <span>Visit Live Website</span>
          </Link>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 text-xs font-semibold no-underline"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Container */}
      <main className="flex-grow p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
