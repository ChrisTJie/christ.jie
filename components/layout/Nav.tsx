"use client";

import { Link } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
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
    { href: `mailto:${profile.contactEmail}`, label: "STX_04_CONTACT", external: true },
  ];

const navLinkBase =
  "shrink-0 whitespace-nowrap px-2 lg:px-3 pb-1 transition-all duration-200 motion-safe:hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-container/60 rounded-sm";

const cvButtonClass =
  "hidden md:inline-flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 font-mono text-[13px] font-medium uppercase tracking-wider rounded-none transition-all duration-200 ease-out hover:bg-primary hover:shadow-[0_0_20px_rgba(0,245,255,0.25)] motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container/60";

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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (media.matches) setMenuOpen(false);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const setLinkRef = (href: string) => (el: HTMLElement | null) => {
    if (el) {
      linkRefs.current.set(href, el);
    } else {
      linkRefs.current.delete(href);
    }
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-xl text-primary fixed top-0 w-full z-50 border-b border-tertiary/20">
      <div className="flex justify-between items-center gap-x-4 md:gap-x-6 lg:gap-x-10 px-4 md:px-8 lg:px-16 py-4 max-w-[1280px] mx-auto w-full min-w-0 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold text-primary tracking-tighter hover:text-primary-container transition-all duration-200 motion-safe:hover:drop-shadow-[0_0_8px_rgba(0,245,255,0.4)]"
        >
          {profile.brand}
        </Link>

        <div
          ref={navRef}
          className="hidden md:flex shrink-0 items-center gap-4 lg:gap-6 relative font-mono text-[13px] font-medium tracking-wider"
        >
          {navItems.map((item) => {
            const active = !item.external && isActive(pathname, item.href);
            const className = active
              ? `text-primary font-bold ${navLinkBase}`
              : `text-on-surface-variant hover:text-primary ${navLinkBase}`;

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
          className={`${cvButtonClass} shrink-0`}
        >
          <MaterialIcon name="download" filled />
          DOWNLOAD_CV
        </a>

        <button
          type="button"
          className="mobile-nav-toggle md:hidden shrink-0 relative flex h-11 w-11 items-center justify-center text-primary"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "關閉選單" : "開啟選單"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
        >
          <MaterialIcon
            name="menu"
            filled
            className={`mobile-nav-toggle-icon absolute text-[26px] ${menuOpen
              ? "scale-75 rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
              }`}
          />
          <MaterialIcon
            name="close"
            filled
            className={`mobile-nav-toggle-icon absolute text-[26px] ${menuOpen
              ? "scale-100 rotate-0 opacity-100"
              : "scale-75 -rotate-90 opacity-0"
              }`}
          />
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className="mobile-nav-panel md:hidden"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-panel-inner">
          <div className="mobile-nav-panel-content border-t border-tertiary/20 bg-surface/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-3 font-mono text-[13px] font-medium tracking-wider">
            {navItems.map((item, index) => {
              const active = !item.external && isActive(pathname, item.href);
              const className = `mobile-nav-item transition-all duration-200 motion-safe:hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.45)] ${active
                ? "text-primary font-bold border-l-2 border-primary pl-2"
                : "text-on-surface-variant hover:text-primary pl-2"
                }`;

              if (item.external) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={className}
                    style={{ "--nav-item-index": index } as CSSProperties}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
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
                  style={{ "--nav-item-index": index } as CSSProperties}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={withBasePath("/cv.pdf")}
              className="mobile-nav-item inline-flex items-center gap-2 bg-primary-container text-on-primary px-4 py-2 mt-2 w-fit transition-all duration-200 ease-out hover:bg-primary hover:shadow-[0_0_20px_rgba(0,245,255,0.25)] motion-safe:active:scale-[0.98]"
              style={{ "--nav-item-index": navItems.length } as CSSProperties}
              tabIndex={menuOpen ? 0 : -1}
            >
              <MaterialIcon name="download" filled />
              DOWNLOAD_CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
