import { docs } from "@/.source/server";
import { loader } from "fumadocs-core/source";
import { createElement } from "react";
import {
  IconBook,
  IconHelp,
  IconSettings,
  IconDeviceDesktop,
  IconTool,
  IconBrandWindows,
  IconBrandDebian,
  IconBrandApple,
} from "@tabler/icons-react";

// @note maps icon names to tabler components for fumadocs sidebar
const icons = {
  BookOpen: IconBook,
  CircleHelp: IconHelp,
  Settings: IconSettings,
  Monitor: IconDeviceDesktop,
  Wrench: IconTool,
  Windows: IconBrandWindows,
  MacOS: IconBrandApple,
  Linux: IconBrandDebian,
};

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return;
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons]);
    }
  },
});
