import Link from "next/link";
import Button from "@/components/ui/Button";
import { Edit, Eye, FolderPlus, Settings, ShoppingBag, Layers, Sliders, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-10 select-none animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-border/80 pb-6">
        <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-2">
          Dashboard
        </span>
        <h1 className="text-3xl md:text-4xl font-heading font-light text-foreground mb-3">
          Atelier Overview
        </h1>
        <p className="text-muted text-sm font-body max-w-2xl leading-relaxed">
          Welcome to the House of Zamyaa boutique management portal. Curate and customize your digital storefront, seasonal edits, and catalog displays.
        </p>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Products Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-card hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
              <ShoppingBag size={20} />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold block mb-1">
              Store Catalog
            </span>
            <h3 className="text-2xl font-heading text-foreground mb-3 font-light">Products</h3>
            <p className="text-muted text-xs mb-8 leading-relaxed">
              Curate, edit, and update the collection of ethnic dresses, configure sizing options, modify pricing and manage inventory.
            </p>
          </div>
          <Link href="/studio/desk/product" className="no-underline">
            <Button variant="primary" className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-widest uppercase">
              <span>Open Catalog Studio</span>
              <ChevronRight size={12} />
            </Button>
          </Link>
        </div>

        {/* Collections Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-card hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
              <Layers size={20} />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold block mb-1">
              Lookbooks
            </span>
            <h3 className="text-2xl font-heading text-foreground mb-3 font-light">Collections</h3>
            <p className="text-muted text-xs mb-8 leading-relaxed">
              Organize products into themed collections or seasonal lookbooks. Set collection covers and banner headers.
            </p>
          </div>
          <Link href="/studio/desk/collection" className="no-underline">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-widest uppercase border-border hover:border-accent hover:text-accent">
              <span>Manage Collections</span>
              <ChevronRight size={12} />
            </Button>
          </Link>
        </div>

        {/* Banners Card */}
        <div className="bg-card/40 backdrop-blur-md border border-border rounded-xl p-6 shadow-card hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black transition-all duration-500">
              <Sliders size={20} />
            </div>
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold block mb-1">
              Homepage Slides
            </span>
            <h3 className="text-2xl font-heading text-foreground mb-3 font-light">Home Banners</h3>
            <p className="text-muted text-xs mb-8 leading-relaxed">
              Design the home landing page presentation. Configure hero slider images, editorial headings, and CTA button links.
            </p>
          </div>
          <Link href="/studio/desk/banner" className="no-underline">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-widest uppercase border-border hover:border-accent hover:text-accent">
              <span>Edit Slides & Banners</span>
              <ChevronRight size={12} />
            </Button>
          </Link>
        </div>

      </div>

      {/* Global Settings & Quick Actions */}
      <div className="bg-card/30 backdrop-blur-md border border-border rounded-xl p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-accent/20 transition-all duration-300">
        <div className="space-y-2">
          <h3 className="text-2xl font-heading text-foreground font-light">Global Boutique Settings</h3>
          <p className="text-muted text-xs leading-relaxed max-w-xl">
            Update store contact email, operational hours, social media links (Instagram, WhatsApp), and metadata options for SEO optimization.
          </p>
        </div>
        <Link href="/studio/desk/siteSettings" className="no-underline shrink-0">
          <Button variant="outline" className="flex items-center gap-2 py-3 border-border hover:border-accent hover:text-accent text-[10px] tracking-widest uppercase">
            <Settings size={14} />
            <span>Open Global Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
