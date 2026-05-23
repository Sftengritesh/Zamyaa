import Link from "next/link";
import Button from "@/components/ui/Button";
import { Edit, Eye, FolderPlus, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8 select-none">
      <div>
        <h1 className="text-4xl font-heading font-light text-foreground mb-2">
          Boutique Management Overview
        </h1>
        <p className="text-muted text-sm font-body">
          Welcome back to the House of Zamyaa admin panel. Manage your products, collections and home sliders easily.
        </p>
      </div>

      {/* Stats cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-[28px] p-6 shadow-card">
          <span className="text-[10px] tracking-wider uppercase text-accent font-semibold block mb-2">
            Catalog Status
          </span>
          <h3 className="text-3xl font-heading text-foreground mb-4">Content Studio</h3>
          <p className="text-muted text-sm mb-6 leading-relaxed">
            Quickly add, edit, or delete dress pieces, sizes, pricing and inventory listings.
          </p>
          <Link href="/studio">
            <Button variant="primary" className="px-6 py-2.5 text-[10px] w-full">
              Open Sanity Studio
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-[28px] p-6 shadow-card">
          <span className="text-[10px] tracking-wider uppercase text-accent font-semibold block mb-2">
            Design Organization
          </span>
          <h3 className="text-3xl font-heading text-foreground mb-4">Collections</h3>
          <p className="text-muted text-sm mb-6 leading-relaxed">
            Create or edit seasonal edits and collection cover images shown on website.
          </p>
          <Link href="/studio/desk/collection">
            <Button variant="outline" className="px-6 py-2.5 text-[10px] w-full">
              Manage Collections
            </Button>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-[28px] p-6 shadow-card">
          <span className="text-[10px] tracking-wider uppercase text-accent font-semibold block mb-2">
            Site Appearance
          </span>
          <h3 className="text-3xl font-heading text-foreground mb-4">Home Sliders</h3>
          <p className="text-muted text-sm mb-6 leading-relaxed">
            Configure homepage hero images, texts, descriptions, and CTA links.
          </p>
          <Link href="/studio/desk/banner">
            <Button variant="outline" className="px-6 py-2.5 text-[10px] w-full">
              Manage Banners
            </Button>
          </Link>
        </div>
      </div>

      {/* Action links */}
      <div className="bg-card border border-border rounded-[32px] p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-heading text-foreground mb-2">Quick Page Setup</h3>
          <p className="text-muted text-sm leading-relaxed">
            Need to update store email address, boutique operating hours or Instagram profile link?
          </p>
        </div>
        <Link href="/studio/desk/siteSettings">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Open Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
