"use client";

import { Link } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { withBasePath } from "@/lib/base-path";

const navItems: {
  href: string;
  label: string;
  external?: boolean;
}[] = [
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
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Map<string, HTMLElement>>(new Map());

  const updateIndicator = useCallback(() => {
    const container = navRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const activeItem = navItems.find(
      (item) => !item.external && isActive(pathname, item.href),
    );

    if (!activeItem) {
      indicator.style.opacity = "0";
      return;
    }

    const activeEl = linkRefs.current.get(activeItem.href);
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    indicator.style.transform = `translateX(${activeRect.left - containerRect.left}px)`;
    indicator.style.width = `${activeRect.width}px`;
    indicator.style.opacity = "1";
  }, [pathname]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(frame);
  }, [pathname, updateIndicator]);

  useLayoutEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  const setLinkRef = (href: string) => (el: HTMLElement | null) => {
    if (el) {
      linkRefs.current.set(href, el);
    } else {
      linkRefs.current.delete(href);
    }
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-xl text-primary fixed top-0 w-full z-50 border-b border-tertiary/20">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-[1280px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-primary tracking-tighter hover:text-primary-container transition-colors"
        >
          {profile.brand}
        </Link>

        <div
          ref={navRef}
          className="hidden md:flex relative gap-4 font-mono text-[13px] font-medium tracking-wider"
        >
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const className = active
              ? "text-primary font-bold pb-1"
              : "text-on-surface-variant hover:text-primary transition-colors pb-1";

            if (item.external) {
              return (
                <a key={item.label} href={item.href} className={className}>
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                ref={setLinkRef(item.href)}
                className={className}
              >
                {item.label}
              </Link>
            );
          })}

          <span ref={indicatorRef} aria-hidden="true" className="nav-indicator" />
        </div>

        <a
          href={withBasePath("/cv.pdf")}
          className="hidden md:inline-flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 font-mono text-[13px] font-medium uppercase tracking-wider hover:bg-primary transition-colors rounded-none"
        >
          <MaterialIcon name="download" filled />
          DOWNLOAD_CV
        </a>

        {menuOpen ? (
          <button
            type="button"
            className="md:hidden text-primary p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="關閉選單"
            aria-expanded="true"
          >
            <MaterialIcon name="close" filled />
          </button>
        ) : (
          <button
            type="button"
            className="md:hidden text-primary p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="開啟選單"
            aria-expanded="false"
          >
            <MaterialIcon name="menu" filled />
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-tertiary/20 bg-surface/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-3 font-mono text-[13px] font-medium tracking-wider">
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const className = active
              ? "text-primary font-bold border-l-2 border-primary pl-2"
              : "text-on-surface-variant hover:text-primary pl-2";

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
