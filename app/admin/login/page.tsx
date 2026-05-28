"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { Lock, Mail, AlertCircle, Server, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Failed to authenticate.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred. Please check server logs.");
    } finally {
      setLoading(false);
    }
  };

  const isDbError = error.toLowerCase().includes("database") || error.toLowerCase().includes("connection");

  return (
    <main 
      className="min-h-screen flex flex-col items-center justify-center py-12 px-6 relative select-none"
      style={{
        background: "radial-gradient(circle at 50% 50%, #151311 0%, #0e0d0c 100%)"
      }}
    >
      {/* Decorative ambient gold glow in background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none filter blur-[120px] opacity-15"
        style={{
          background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)"
        }}
      />

      <div className="w-full max-w-md z-10">
        {/* Back to site link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted hover:text-accent transition-colors duration-300 mb-8 no-underline group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Boutique</span>
        </Link>

        <RevealOnScroll className="w-full bg-card/60 backdrop-blur-2xl rounded-2xl shadow-card border border-border p-8 md:p-10 text-center relative overflow-hidden">
          {/* Subtle gold line on top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

          <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold block mb-2">
            Boutique Portal
          </span>
          <h1 className="text-3xl font-heading font-light text-foreground mb-4">
            House of Zamyaa
          </h1>

          {/* Diamond Luxury Divider */}
          <div className="flex items-center justify-center gap-3 my-6 opacity-60">
            <div className="h-[1px] w-12 bg-border" />
            <div className="w-1.5 h-1.5 bg-accent rotate-45" />
            <div className="h-[1px] w-12 bg-border" />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg p-4 text-xs text-left mb-6 flex gap-3 items-start animate-fade-in">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Authentication Failed</p>
                <p className="opacity-90 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Special Helper for DB Connection Issues */}
          {error && isDbError && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-xs text-left mb-6 flex gap-3 items-start">
              <Server size={16} className="shrink-0 mt-0.5 text-accent" />
              <div>
                <p className="font-semibold text-accent mb-2 uppercase tracking-wider">Troubleshooting Database:</p>
                <ul className="list-disc pl-4 space-y-1 text-muted">
                  <li>Ensure your local IP is whitelisted under "Network Access" in MongoDB Atlas.</li>
                  <li>Check if the credentials in <code className="bg-black/40 px-1 py-0.5 rounded border border-border">.env.local</code> are correct.</li>
                  <li>Verify if your database user has proper readWrite roles.</li>
                </ul>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-left">
            <div>
              <label className="block text-[10px] tracking-wider uppercase font-semibold text-muted mb-2">
                Email Address
              </label>
              <div className="relative" style={{ position: 'relative' }}>
                <Mail 
                  size={16} 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} 
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-lg pr-4 py-3 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 placeholder:text-muted/50"
                  style={{ paddingLeft: '44px' }}
                  placeholder="admin@zamyaa.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] tracking-wider uppercase font-semibold text-muted mb-2">
                Password
              </label>
              <div className="relative" style={{ position: 'relative' }}>
                <Lock 
                  size={16} 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} 
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-lg pr-4 py-3 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all duration-300 placeholder:text-muted/50"
                  style={{ paddingLeft: '44px' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-4 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-500 hover:shadow-[0_0_15px_rgba(201,168,76,0.2)]" 
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Enter Dashboard"}
            </Button>
          </form>

          <p className="text-muted/60 text-[10px] tracking-wider leading-relaxed mt-8">
            AUTHORIZED PERSONNEL ONLY
          </p>
        </RevealOnScroll>
      </div>
    </main>
  );
}
