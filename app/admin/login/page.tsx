"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

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
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-[8%]">
      <RevealOnScroll className="w-full max-w-md bg-card rounded-[40px] shadow-card border border-border p-8 md:p-12 text-center select-none">
        <span className="text-xs tracking-[0.25em] uppercase text-accent font-semibold block mb-4">
          Boutique Portal
        </span>
        <h1 className="text-4xl font-heading font-light text-foreground mb-8">
          Admin Sign In
        </h1>

        {error && (
          <div className="bg-red-500/10 text-red-500 rounded-xl py-3 px-4 text-xs font-semibold mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <div>
            <label className="block text-xs uppercase font-bold text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              placeholder="admin@zamyaa.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none"
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </Button>
        </form>

        <p className="text-muted text-xs leading-relaxed mt-8">
          Authorized personnel only. Contact system administrator for credential assistance.
        </p>
      </RevealOnScroll>
    </main>
  );
}
