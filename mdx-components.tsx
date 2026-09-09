import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Link from "next/link";
import {
  IconBrandApple,
  IconBrandDebian,
  IconBrandWindows,
  IconHelp,
  IconSettings,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const CARD_ICONS: Record<string, ReactNode> = {
  "Windows Installation": <IconBrandWindows size={16} stroke={1.75} />,
  "macOS Installation": <IconBrandApple size={16} stroke={1.75} />,
  "Linux Installation": <IconBrandDebian size={16} stroke={1.75} />,
  Configuration: <IconSettings size={16} stroke={1.75} />,
  FAQ: <IconHelp size={16} stroke={1.75} />,
};

function Card({
  icon,
  title,
  href,
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  href?: string;
  className?: string;
}) {
  const resolvedIcon = icon ?? (typeof title === "string" ? CARD_ICONS[title] : null);
  const classNames = cn(
    "flex items-center gap-2.5 rounded-lg bg-card px-4 py-2.5 text-sm font-medium leading-none text-foreground no-underline transition-colors hover:bg-secondary",
    className,
  );
  const content = (
    <>
      {resolvedIcon ? (
        <span className="inline-flex shrink-0 text-muted-foreground [&_svg]:block">
          {resolvedIcon}
        </span>
      ) : null}
      <span>{title}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classNames}>
        {content}
      </Link>
    );
  }

  return <div className={classNames}>{content}</div>;
}

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Card,
    ...components,
  };
}
