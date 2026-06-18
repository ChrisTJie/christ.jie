"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { profile } from "@/content/profile";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { withBasePath } from "@/lib/base-path";

const navItems = [
  { href: "/", label: "STX_01_HOME" },
  { href: "/experience/", label: "STX_02_WORK" },
  { href: "/projects/", label: "STX_03_PROJECTS" },
  { href: "mailto:hello@christ.jie", label: "STX_04_CONTACT", external: true },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/" || pathname === "";
  return pathname.startsWith(href.replace(/\/$/, ""));
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-surface/80 backdrop-blur-xl text-primary fixed top-0 w-full z-50 border-b border-tertiary/20">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tighter hover:text-primary-container transition-colors"
        >
          {profile.brand}
        </Link>

        <div className="hidden md:flex gap-4 font-mono text-[13px] font-medium tracking-wider">
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const className = active
              ? "text-primary font-bold border-b-2 border-primary pb-1"
              : "text-on-surface-variant hover:text-primary transition-colors";

            if (item.external) {
              return (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              );
            }

            return (
              <Link key={item.label} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href={withBasePath("/cv.pdf")}
          className="hidden md:inline-flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 font-mono text-[13px] font-medium uppercase tracking-wider hover:bg-primary transition-colors rounded-none"
        >
          <MaterialIcon name="download" filled />
          DOWNLOAD_CV
        </a>

        <button
          type="button"
          className="md:hidden text-primary p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="開啟選單"
          aria-expanded={menuOpen}
        >
          <MaterialIcon name={menuOpen ? "close" : "menu"} filled />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-tertiary/20 bg-surface/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-3 font-mono text-[13px] font-medium tracking-wider">
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const className = active
              ? "text-primary font-bold"
              : "text-on-surface-variant hover:text-primary";

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={className}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={className}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={withBasePath("/cv.pdf")}
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 mt-2 w-fit"
          >
            <MaterialIcon name="download" filled />
            DOWNLOAD_CV
          </a>
        </div>
      )}
    </nav>
  );
}
