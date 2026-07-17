"use client";

import { Fingerprint, Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

export function AcmeHero() {
  return (
    <div className="container max-w-5xl mx-auto">
      <header className="relative pt-4">
        <nav className="flex items-center justify-between rounded-xl bg-background py-2 px-4 shadow-lg border">
          <div className="flex items-center space-x-6">
            <a href="#" className="text-base font-semibold">
              Acme
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Docs
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Components
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
              >
                Blog
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Moon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Sun className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Log in
            </Button>
            <Button size="sm" className="hidden md:flex">
              Get Started
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col p-6 space-y-6">
                  <div className="flex items-center space-x-6">
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      Docs
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      Components
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      Pricing
                    </a>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors"
                    >
                      Blog
                    </a>
                  </div>
                  <Separator />
                  <div className="flex flex-col space-y-4">
                    <Button variant="ghost" className="justify-start w-full">
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      Log in
                    </Button>
                    <Button className="justify-start w-full">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>

        <div className="relative mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-6">
              <Fingerprint className="h-3 w-3" />
              <span>New: Acme v3.0 released</span>
            </div>
            <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Build faster with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Acme
              </span>{" "}
              Components
            </h1>
            <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Beautifully designed, accessible components built with Radix UI
              and Tailwind CSS. Copy-paste into your apps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Components
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-16 relative"
          >
            <div className="relative rounded-xl border bg-card shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center text-xs text-muted-foreground font-mono">
                  acme-hero.tsx
                </div>
              </div>
              <div className="p-8 font-mono text-sm overflow-x-auto">
                <pre className="text-foreground">
{`import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <Button>Get Started</Button>
  )
}`}
                </pre>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 flex items-center justify-center gap-8 opacity-60"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">50+</div>
              <div className="text-sm text-muted-foreground">Components</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Open Source</div>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">∞</div>
              <div className="text-sm text-muted-foreground">Customizable</div>
            </div>
          </motion.div>
        </div>
      </header>
    </div>
  );
}