"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "Atelier" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/studio") || pathname?.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: scrolled
            ? "rgba(250, 248, 245, 0.95)"
            : "linear-gradient(to bottom, rgba(250, 248, 245, 0.8) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: scrolled ? "18px 6%" : "28px 6%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "padding 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {/* Left nav */}
          <ul
            style={{
              gap: "40px",
              listStyle: "none",
              alignItems: "center",
            }}
            className="hidden md:flex"
          >
            {navLinks.slice(0, 2).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: pathname === link.href ? "var(--color-accent)" : "rgba(28, 27, 26, 0.85)",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                    position: "relative",
                  }}
                  className="hover-underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Brand wordmark — center */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 300,
              letterSpacing: "0.35em",
              color: "var(--color-foreground)",
              textDecoration: "none",
              userSelect: "none",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            ZAMYAA
          </Link>

          {/* Right nav */}
          <div
            style={{
              gap: "32px",
              alignItems: "center",
            }}
            className="hidden md:flex"
          >
            <Link
              href={navLinks[2].href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: pathname === navLinks[2].href ? "var(--color-accent)" : "rgba(28, 27, 26, 0.85)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              className="hover-underline"
            >
              {navLinks[2].label}
            </Link>

            <Link
              href="/search"
              style={{ color: "rgba(28, 27, 26, 0.7)", transition: "color 0.3s ease" }}
              className="hover:text-accent"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={1.5} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(28, 27, 26, 0.85)",
              cursor: "pointer",
              padding: "4px",
              marginLeft: "auto",
            }}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "rgba(250, 248, 245, 0.98)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
            }}
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                position: "absolute",
                top: "32px",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                letterSpacing: "0.35em",
                color: "var(--color-foreground)",
              }}
            >
              ZAMYAA
            </motion.div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px", width: "80%", maxWidth: "300px" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
              <div style={{ width: "5px", height: "5px", background: "var(--color-accent)", transform: "rotate(45deg)" }} />
              <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            </div>

            {[...navLinks, { href: "/search", label: "Search" }].map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ marginBottom: "32px" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(36px, 8vw, 52px)",
                    fontWeight: 300,
                    letterSpacing: "0.05em",
                    color: pathname === link.href ? "var(--color-accent)" : "var(--color-foreground)",
                    textDecoration: "none",
                    display: "block",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Bottom socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                position: "absolute",
                bottom: "40px",
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              @zamyaa.by.jyoti
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
