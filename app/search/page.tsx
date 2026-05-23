"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Static list for client-side search simulation if Sanity backend results are not ready yet
  const dummyProductsList = [
    {
      _id: "s1",
      name: "Sunehary Dhoop Kurta Set",
      slug: "sunehary-dhoop-kurta-set",
      price: 8999,
      inStock: true,
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6MM5ZKpxO0oRAB-gV24JxamzG1SHDSciuOkOnTXfk4F3Jf4WY7ZVATOgcbJ0Ni8mEhqZ30JCAjhm0eFoAEu1iP3tvCCQA6zIUekz-1x3Tk-6lqGXRgzp-FMtRvTO2VCwIPhimoxPcTCLGEw701ihEpym03JbgVqavK6jjSFZCw72r3svvBdzwjk-9lV6tvoNxPsRsZWujbpbuWc4SkM-i4T1s3dcGhenpAB-3LmysqG5lhJ09mXyaI1Q5nsNKOOPaLbXBLR4wg3d3AQ",
      collection: { name: "Sunehary Dhoop" },
    },
    {
      _id: "d1",
      name: "Desi Dastaan Suit",
      slug: "desi-dastaan-suit",
      price: 11999,
      inStock: true,
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtv7eFs1zc_8Sr9r-O0Q4YmDQFpYwIo_cXfqUivDRtqXftB23nTe5BXuKLJFYtori7D6u2QsTN-gmFDe3-A2_K3ISqA0dZ0HjQLYVLGcZNKKgX7rkLPYusqhHcIpUZ1UWNoogJ5qgsxt1QDHPMOg53b_xhWSuicERzm86-oUldM8sFJ42zbEGybaLaKh2-RW_2G463a98HGBHdxETeQn-V0wlaVHpoIMS55jql82j4yTYBjXAp7DnTlb12HNIMH1N3XWrZqhkmDxpkDg",
      collection: { name: "Desi Dastaan" },
    },
    {
      _id: "n1",
      name: "Neel Pushp Scarf",
      slug: "neel-pushp-scarf",
      price: 4999,
      inStock: true,
      fallbackUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6eoJYbR6FzsqG_ui0Cd5plo8898YgoTCjxFwWCU2KUWWPbBMPvy30tlA1xALs6VAAUZHG9O3j9PSxK87DBq5j3XTdtyuAXf_HLnCkH9_za4YYd7kaowtlrgmEfyL1nPsY48SdjH1_U4I7VhBt6BYEluNgP7zh-rYvpyCIIKpBJZ6MK0SXVIqIj7trLDKalTRGpgVn8mOqETS87sYI2rNKh0pCFMjbwSn7VaQhPwcg8YK0tbIS9Tn3eOd-vqDVmB8JXPEsOrrh3_Axjw",
      collection: { name: "Neel Pushp" },
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      const filtered = dummyProductsList.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.collection.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="py-20 md:py-[100px] px-[8%] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="Bespoke Search"
          title="Find Your Masterpiece"
          centered
        />

        {/* Input bar */}
        <RevealOnScroll className="max-w-2xl mx-auto my-12">
          <form onSubmit={handleSearch} className="relative flex items-center bg-card rounded-full border border-border shadow-card overflow-hidden px-6 py-2">
            <Search className="text-accent flex-shrink-0 mr-4" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search collections, silhouttes, or styles..."
              className="w-full bg-transparent text-sm text-foreground placeholder-muted border-none outline-none py-3.5"
            />
            <Button type="submit" variant="primary" className="px-6 py-2.5 text-[10px]">
              Search
            </Button>
          </form>
        </RevealOnScroll>

        {/* Results grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted font-body text-sm">Searching the atelier archives...</p>
          </div>
        ) : searched ? (
          results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
              {results.map((product, index) => (
                <RevealOnScroll key={product._id} delay={index + 1}>
                  {/* Local adapt since these fallback products use fallbackUrl */}
                  <div className="group flex flex-col no-underline text-foreground select-none relative">
                    <a href={`/products/${product.slug}`} className="no-underline text-foreground block">
                      <div className="product-img-wrap aspect-[4/5] relative rounded-[32px_32px_10px_10px] overflow-hidden bg-card shadow-card group-hover:shadow-card-hover group-hover:translate-y-[-10px] transition-all duration-700 ease-[var(--ease-out-expo)]">
                        <img
                          src={product.fallbackUrl}
                          alt={product.name}
                          className="object-cover w-full h-full transition-transform duration-[1s] group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-6">
                        <span className="text-[10px] tracking-[0.15em] uppercase text-accent font-semibold block mb-1">
                          {product.collection.name}
                        </span>
                        <h3 className="text-[28px] font-heading font-normal text-foreground group-hover:text-accent transition-colors duration-300">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="font-body text-sm font-semibold">
                            {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-[32px] border border-border mt-16">
              <span className="text-4xl block mb-4">🔍</span>
              <h3 className="text-2xl font-heading text-foreground mb-4">No Masterpieces Match Your Search</h3>
              <p className="text-muted max-w-md mx-auto">
                Try searching for general terms like "kurta", "suit", "dastaan" or browse our seasonal edits in collections.
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-24">
            <p className="text-muted font-body text-sm">Discover beautiful ethnic silhouettes by typing above.</p>
          </div>
        )}
      </div>
    </main>
  );
}
