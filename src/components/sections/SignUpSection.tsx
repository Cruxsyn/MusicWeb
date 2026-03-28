"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function SignUpSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as {
        success: boolean;
        message: string;
      };

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="signup" className="relative overflow-hidden bg-brown-rich py-16 md:py-24">
      {/* Golden gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 160, 23, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture */}
      <div className="noise-overlay" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <SectionHeading title="Stay Updated" light />

        <ScrollReveal delay={0.2}>
          <p className="mb-10 text-lg text-cream/70 md:text-xl">
            Be the first to know about new music, tour dates, and exclusive merch
            drops.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <CheckCircle className="h-12 w-12 text-gold" strokeWidth={1.5} />
                <p className="text-2xl font-heading text-gold">You&apos;re in!</p>
                <p className="text-cream/60">
                  We&apos;ll keep you posted on everything Tate Butts.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="signup-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-describedby={error ? "signup-error" : undefined}
                  className="flex-1 rounded-full border border-gold/40 bg-cream/10 px-6 py-3 text-cream placeholder:text-cream/40 outline-none transition-colors duration-200 focus:border-gold focus:ring-1 focus:ring-gold/50"
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full bg-amber px-8 py-3 font-medium text-cream transition-colors duration-200 hover:bg-gold disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Sign up for updates"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="animate-pulse">...</span>
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <motion.p
              id="signup-error"
              role="alert"
              className="mt-4 text-sm text-red-400"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {error}
            </motion.p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
