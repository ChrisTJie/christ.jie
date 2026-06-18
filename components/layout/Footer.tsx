import Link from "next/link";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="bg-surface-dim text-primary w-full py-10 border-t border-tertiary/10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 gap-4 max-w-[1280px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-primary-container transition-colors"
        >
          {profile.brand}
        </Link>
        <div className="flex gap-4 font-mono text-[13px] font-medium tracking-wider">
          <a
            href="https://github.com/christjie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary-container opacity-80 hover:opacity-100 transition-opacity"
          >
            TERMINAL
          </a>
          <a
            href="https://github.com/christjie/christ.jie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant hover:text-primary-container opacity-80 hover:opacity-100 transition-opacity"
          >
            SOURCE
          </a>
          <a
            href="mailto:hello@christ.jie"
            className="text-on-surface-variant hover:text-primary-container opacity-80 hover:opacity-100 transition-opacity"
          >
            LOGS
          </a>
        </div>
        <div className="text-on-surface-variant font-mono text-xs opacity-60">
          © {new Date().getFullYear()} {profile.name.toUpperCase()}. ALL RIGHTS
          RESERVED.
        </div>
      </div>
    </footer>
  );
}
