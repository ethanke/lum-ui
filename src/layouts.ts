// lum-ui - Layout Components
// Page layouts and structural components

import { cssVariables, tailwindConfig } from "./theme.ts";

// Common head with dependencies
export interface HeadProps {
  title: string;
  description?: string;
  favicon?: string;
  themeColor?: string;
  cssVariablesOverride?: string;
  tailwindConfigOverride?: string;
}

/**
 * Common head element with all required dependencies
 * Includes Tailwind CSS, Alpine.js, and HTMX
 */
export function Head(props: HeadProps): string {
  const {
    title,
    description,
    favicon,
    themeColor = "#0A0A0F",
    cssVariablesOverride,
    tailwindConfigOverride,
  } = props;

  return `
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      ${description ? `<meta name="description" content="${description}">` : ""}
      ${favicon ? `<link rel="icon" type="image/svg+xml" href="${favicon}">` : ""}
      <meta name="theme-color" content="${themeColor}">

      <!-- Critical CSS - Prevents FOUC (Flash of Unstyled Content) -->
      <style>
        /* Base styles - applied before TailwindCSS loads */
        html { -webkit-tap-highlight-color: transparent; }
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background-color: var(--surface-0, #0A0A0F);
          color: white;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Alpine.js x-cloak - hide elements until Alpine initializes */
        [x-cloak] { display: none !important; }

        /* Prevent layout shift during load */
        * { box-sizing: border-box; }

        /* Critical layout styles */
        .min-h-screen { min-height: 100vh; }

        /* CSS Variables */
        ${cssVariablesOverride || cssVariables}
      </style>

      <!-- Preload critical resources for better performance -->
      <link rel="preload" href="https://cdn.tailwindcss.com" as="script">
      <link rel="dns-prefetch" href="https://unpkg.com">
      <link rel="preconnect" href="https://unpkg.com" crossorigin>

      <!-- TailwindCSS - Non-blocking load with immediate execution -->
      <script src="https://cdn.tailwindcss.com"></script>
      <script>${tailwindConfigOverride || tailwindConfig}</script>

      <!-- Alpine.js - Deferred for better performance -->
      <script defer src="https://unpkg.com/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>
      <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>

      <!-- HTMX - Loaded synchronously for immediate availability -->
      <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    </head>
  `;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: string;
}

export function PageHeader(props: PageHeaderProps): string {
  const { title, subtitle, actions } = props;
  return `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-white">${title}</h2>
        ${subtitle ? `<p class="text-[var(--text-muted)] mt-1">${subtitle}</p>` : ""}
      </div>
      ${actions ? `<div class="flex gap-2">${actions}</div>` : ""}
    </div>
  `;
}

export function Grid(children: string, cols = 4): string {
  const gridCols: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };
  return `<div class="grid ${gridCols[cols] || gridCols[4]} gap-4">${children}</div>`;
}

export function Section(title: string, children: string, subtitle?: string): string {
  return `
    <div class="bg-[var(--surface-1)]/50 rounded-md border border-[var(--border-default)] p-6 mb-6">
      <div class="mb-4">
        <h3 class="text-lg font-semibold text-white">${title}</h3>
        ${subtitle ? `<p class="text-[var(--text-muted)] text-sm mt-1">${subtitle}</p>` : ""}
      </div>
      ${children}
    </div>
  `;
}

/**
 * Simple flex container
 */
export function Flex(
  children: string,
  options: {
    direction?: "row" | "col";
    gap?: number;
    justify?: "start" | "end" | "center" | "between" | "around";
    align?: "start" | "end" | "center" | "stretch";
    wrap?: boolean;
  } = {}
): string {
  const {
    direction = "row",
    gap = 4,
    justify = "start",
    align = "center",
    wrap = false,
  } = options;

  const dirClass = direction === "col" ? "flex-col" : "flex-row";
  const justifyClass = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
  }[justify];
  const alignClass = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch",
  }[align];

  return `<div class="flex ${dirClass} gap-${gap} ${justifyClass} ${alignClass} ${
    wrap ? "flex-wrap" : ""
  }">${children}</div>`;
}

/**
 * Container with max-width constraint
 */
export function Container(
  children: string,
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "full" = "xl"
): string {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };
  return `<div class="mx-auto px-4 sm:px-6 lg:px-8 ${maxWidths[size]}">${children}</div>`;
}

/**
 * Stack: vertical layout with consistent spacing
 */
export function Stack(children: string, gap = 4): string {
  return `<div class="flex flex-col gap-${gap}">${children}</div>`;
}

/**
 * Card wrapper with hover effects
 */
export function CardWrapper(children: string, options: { href?: string; class?: string } = {}): string {
  const { href, class: extraClass = "" } = options;
  const baseClass = `block bg-[var(--surface-1)]/70 backdrop-blur-xl rounded-lg border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)] transition-all duration-200 p-6 ${extraClass}`;
  
  if (href) {
    return `<a href="${href}" class="${baseClass}">${children}</a>`;
  }
  return `<div class="${baseClass}">${children}</div>`;
}
