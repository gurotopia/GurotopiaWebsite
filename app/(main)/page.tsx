"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { OverviewContainer } from "@/components/layout/overview-container";
import {
  IconCopy,
  IconCheck,
  IconBolt,
  IconCode,
  IconShieldCheck,
  IconDevices,
} from "@tabler/icons-react";
import { FaGithub, FaStar } from "react-icons/fa6";

function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/repos/gurotopia/gurotopia")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.stargazers_count === "number") setStars(d.stargazers_count);
      })
      .catch(() => {});
  }, []);
  return stars;
}

// @note feature card for the why section
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-card p-4 transition-colors hover:bg-secondary">
      <div className="mb-3 flex size-11 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
        {icon}
      </div>
      <p className="text-[13px] font-semibold text-foreground mb-1 transition-colors">{title}</p>
      <p className="text-[12px] text-muted-foreground leading-relaxed transition-colors">
        {description}
      </p>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function OverviewPage() {
  const [cmdCopied, setCmdCopied] = useState(false);
  const stars = useGitHubStars();

  const handleCmdCopy = () => {
    navigator.clipboard.writeText("git clone https://github.com/gurotopia/gurotopia").then(() => {
      setCmdCopied(true);
      setTimeout(() => setCmdCopied(false), 1500);
    });
  };

  return (
    <OverviewContainer>
      <div className="max-w-[720px] px-6 pt-14 pb-12 space-y-10 overflow-hidden">
        {/* hero */}
        <motion.div className="space-y-6" initial="hidden" animate="show">
          <motion.div custom={0} variants={fadeUp}>
            <h1 className="text-[32px] leading-[1.15] font-bold tracking-tight text-foreground transition-colors">
              Gurotopia Docs.
              <br />
              <span className="text-muted-foreground">Built from scratch.</span>
            </h1>
          </motion.div>

          <motion.div custom={1} variants={fadeUp} className="flex items-center gap-2.5 flex-wrap">
            {/* clone pill */}
            <button
              onClick={handleCmdCopy}
              className="group flex items-center h-9 rounded-lg bg-foreground text-[13px] font-[family-name:var(--font-mono)] text-background hover:bg-foreground/90 transition-colors overflow-hidden"
            >
              <span className="flex items-center gap-2 px-3.5">
                <span className="text-background/50">$</span>
                git clone github.com/gurotopia/gurotopia
              </span>
              <span className="flex items-center justify-center w-9 h-9 border-l border-background/15 text-background/50 group-hover:text-background/80 transition-colors">
                {cmdCopied ? (
                  <IconCheck size={14} stroke={1.75} />
                ) : (
                  <IconCopy size={14} stroke={1.75} />
                )}
              </span>
            </button>

            {/* github */}
            <a
              href="https://github.com/gurotopia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-9 px-3.5 rounded-lg bg-card text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <FaGithub size={16} />
              GitHub
              {stars !== null && stars > 0 && (
                <span className="flex items-center gap-1 text-[12px] text-muted-foreground ml-0.5 transition-colors">
                  <FaStar size={11} className="text-muted-foreground" />
                  {stars}
                </span>
              )}
            </a>
          </motion.div>

          <motion.div custom={1.5} variants={fadeUp} className="w-full rounded-xl overflow-hidden">
            <Image
              src="https://raw.githubusercontent.com/YoruAkio/ProjectAssets/refs/heads/main/akio/guro/gurotopia_banner.png"
              alt="Gurotopia Banner"
              width={1200}
              height={630}
              className="w-full h-auto block select-none scale-[1.2]"
              draggable={false}
            />
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            className="space-y-3 text-[15px] leading-relaxed text-muted-foreground transition-colors"
          >
            <p>
              <strong className="text-foreground pr-1 transition-colors">Gurotopia</strong> is an
              open-source Growtopia Private Server written in modern C/C++. Not another leaked fork
              — clean code, a unique compiler, and active community maintenance.
            </p>
            <p>
              These docs cover everything: setting up on Windows or Linux, server configuration, and
              troubleshooting common build issues.
            </p>
          </motion.div>
        </motion.div>

        {/* why gurotopia */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[15px] font-semibold text-foreground transition-colors whitespace-nowrap">
              Why Gurotopia
            </span>
            <div className="h-px flex-1 bg-border transition-colors" />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FeatureCard
              icon={<IconBolt size={22} stroke={1.75} />}
              title="Lightweight"
              description="Compiler + SSL + SQL under 1GB. No bloated deps."
            />
            <FeatureCard
              icon={<IconCode size={22} stroke={1.75} />}
              title="Modern C++"
              description="Clean architecture, readable code, proper abstractions."
            />
            <FeatureCard
              icon={<IconShieldCheck size={22} stroke={1.75} />}
              title="From Scratch"
              description="Not based on leaked code. Genuinely original work."
            />
            <FeatureCard
              icon={<IconDevices size={22} stroke={1.75} />}
              title="Cross-Platform"
              description="Windows, macOS, and major Linux distros, out of the box."
            />
          </div>
        </motion.div>

        {/* next steps */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show">
          <p className="text-[14px] text-muted-foreground transition-colors">
            Ready to get started? Pick your platform:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/installation/windows"
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-card text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Windows →
            </Link>
            <Link
              href="/installation/macos"
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-card text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              macOS →
            </Link>
            <Link
              href="/installation/linux"
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-card text-[13px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Linux →
            </Link>
            <Link
              href="/introduction"
              className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-[13px] text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              Full Docs →
            </Link>
          </div>
        </motion.div>
      </div>
    </OverviewContainer>
  );
}
