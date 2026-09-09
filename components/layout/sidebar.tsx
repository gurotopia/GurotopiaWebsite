"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ElementType } from "react";
import { useTheme } from "next-themes";
import {
  IconHome,
  IconBook,
  IconBrandWindows,
  IconBrandDebian,
  IconBrandApple,
  IconSettings,
  IconHelp,
  IconExternalLink,
  IconSun,
  IconMoon,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { FaGithub, FaDiscord } from "react-icons/fa6";

const navItems = [
  { href: "/", label: "Overview", icon: IconHome },
  { href: "/introduction", label: "Introduction", icon: IconBook },
];

const guidesItems = [
  { href: "/installation/windows", label: "Windows Install", icon: IconBrandWindows },
  { href: "/installation/macos", label: "macOS Install", icon: IconBrandApple },
  { href: "/installation/linux", label: "Linux Install", icon: IconBrandDebian },
  { href: "/configuration", label: "Configuration", icon: IconSettings },
  { href: "/faq/build-errors", label: "FAQ", icon: IconHelp },
];

const externalLinks = [
  { href: "https://github.com/gurotopia", label: "GitHub", icon: FaGithub },
  { href: "https://discord.gg/zzWHgzaF7J", label: "Discord", icon: FaDiscord },
];

// @note renders a single nav link with active indicator and tabler icon
function NavItem({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: ElementType;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className={`relative flex items-center gap-2 py-1.5 text-[14px] transition-colors ${
          isActive
            ? "text-foreground font-semibold"
            : "text-muted-foreground hover:text-foreground/80"
        }`}
      >
        {isActive && (
          <span className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-[2px] h-[16px] bg-foreground rounded-full transition-colors" />
        )}
        <Icon size={16} stroke={1.75} className="shrink-0" />
        {label}
      </Link>
    </li>
  );
}

// @note external link with brand icon plus outbound arrow
function ExternalItem({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: ElementType;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 py-1.5 text-[14px] text-muted-foreground hover:text-foreground/80 transition-colors"
      >
        <Icon size={16} className="shrink-0" />
        <span className="min-w-0 flex-1">{label}</span>
        <IconExternalLink size={12} stroke={1.75} className="opacity-40 shrink-0" />
      </a>
    </li>
  );
}

// @note theme toggle button
function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-1.5 text-muted-foreground hover:text-foreground/80 hover:bg-muted rounded-md transition-all"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <IconSun size={14} stroke={1.75} />
      ) : (
        <IconMoon size={14} stroke={1.75} />
      )}
    </button>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* logo */}
      <div className="pt-12 md:pt-16 pb-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/logo.png"
            width={28}
            height={28}
            alt="Gurotopia"
          />
          <span className="text-[15px] font-semibold text-foreground transition-colors">
            Gurotopia
          </span>
        </Link>
      </div>

      {/* nav */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5 mb-6 pl-3">
          {navItems.map((item) => (
            <NavItem key={item.href} {...item} onClick={() => setOpen(false)} />
          ))}
        </ul>

        <p className="pl-3 mb-2 text-[11px] font-medium text-foreground/70 uppercase tracking-widest transition-colors">
          Guides
        </p>
        <ul className="space-y-0.5 mb-6 pl-3">
          {guidesItems.map((item) => (
            <NavItem key={item.href} {...item} onClick={() => setOpen(false)} />
          ))}
        </ul>

        <p className="pl-3 mb-2 text-[11px] font-medium text-foreground/70 uppercase tracking-widest transition-colors">
          Links
        </p>
        <ul className="space-y-0.5 pl-3">
          {externalLinks.map((item) => (
            <ExternalItem key={item.href} {...item} />
          ))}
        </ul>
      </nav>

      {/* footer */}
      <div className="py-4 flex items-center justify-between">
        <span className="text-[12px] text-muted-foreground transition-colors">
          early development
        </span>
        <ThemeToggle />
      </div>
    </>
  );

  return (
    <>
      {/* mobile topbar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-6 h-14 bg-background/90 backdrop-blur-md border-b border-border/60 transition-colors">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/logo.png"
            width={24}
            height={24}
            alt="Gurotopia"
          />
          <span className="text-[14px] font-semibold text-foreground">Gurotopia</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-muted text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <IconX size={18} stroke={1.75} /> : <IconMenu2 size={18} stroke={1.75} />}
          </button>
        </div>
      </div>

      {/* mobile backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/10 dark:bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* mobile dropdown */}
      <aside
        className={`fixed top-14 left-0 right-0 z-40 max-h-[calc(100vh-3.5rem)] overflow-y-auto flex flex-col bg-background/95 backdrop-blur-md border-b border-border/60 px-6 pb-4 transition-all duration-200 md:hidden ${
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="pt-3">
          <ul className="space-y-0.5 mb-4 pl-3">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} onClick={() => setOpen(false)} />
            ))}
          </ul>
          <p className="pl-3 mb-2 text-[11px] font-medium text-foreground/70 uppercase tracking-widest transition-colors">
            Guides
          </p>
          <ul className="space-y-0.5 mb-4 pl-3">
            {guidesItems.map((item) => (
              <NavItem key={item.href} {...item} onClick={() => setOpen(false)} />
            ))}
          </ul>
          <p className="pl-3 mb-2 text-[11px] font-medium text-foreground/70 uppercase tracking-widest transition-colors">
            Links
          </p>
          <ul className="space-y-0.5 pl-3">
            {externalLinks.map((item) => (
              <ExternalItem key={item.href} {...item} />
            ))}
          </ul>
        </nav>
      </aside>

      {/* desktop sidebar */}
      <aside className="hidden md:flex flex-col w-[220px] shrink-0 sticky top-0 h-screen overflow-y-auto">
        {sidebarContent}
      </aside>
    </>
  );
}
