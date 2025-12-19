#!/usr/bin/env -S deno run --allow-read --allow-write
/**
 * Documentation Site Generator
 * 
 * Generates the complete documentation site including:
 * - Landing page (index.html)
 * - Component showcase (showcase.html)
 * 
 * Outputs to ./docs/ directory for GitHub Pages deployment
 */

import { generateShowcase } from "./generate-showcase.ts";
import { Head } from "../src/layouts.ts";
import { Button, Card } from "../src/components.ts";
import { icons } from "../src/icons.ts";

const OUTPUT_DIR = Deno.args[0] || "./docs";

function generateLandingPage(): string {
  return `<!DOCTYPE html>
<html lang="en">
${Head({ 
  title: "lum-ui - Modern UI Component Library for Deno",
  description: "Server-side rendered UI components for Deno + HTMX + Alpine.js. Zero build step, pure TypeScript template strings."
})}
<body class="bg-[#0A0A0F] min-h-screen">
  <div class="max-w-7xl mx-auto px-4 py-16">
    
    <!-- Hero Section -->
    <div class="text-center mb-20">
      <h1 class="text-6xl font-bold text-white mb-6">
        <span class="bg-gradient-to-r from-[#FF8C00] via-[#FF4D8D] to-[#8B5CF6] bg-clip-text text-transparent">
          lum-ui
        </span>
      </h1>
      <p class="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
        Modern, lightweight UI component library for Deno + HTMX + Alpine.js
      </p>
      <p class="text-lg text-zinc-500 mb-10 max-w-3xl mx-auto">
        Server-side rendered components with template strings. Zero build step. 
        Pure TypeScript. Perfect for building fast, modern web applications.
      </p>
      <div class="flex justify-center gap-4 flex-wrap">
        ${Button({ text: "View Showcase", href: "/showcase.html", variant: "primary", icon: "chart" })}
        ${Button({ text: "Install from JSR", href: "https://jsr.io/@ethanke/lum-ui", variant: "secondary", icon: "externalLink" })}
        ${Button({ text: "GitHub", href: "https://github.com/ethanke/lum-ui", variant: "ghost", icon: "github" })}
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-3 gap-6 mb-20">
      ${Card({
        title: "🎨 Template Strings",
        children: "<p class='text-zinc-400'>No JSX, pure TypeScript. Server-side rendered components using template strings.</p>"
      })}
      ${Card({
        title: "🚀 Zero Build Step",
        children: "<p class='text-zinc-400'>Works directly with Deno. No bundlers, no transpilers, no configuration needed.</p>"
      })}
      ${Card({
        title: "🎯 HTMX + Alpine.js",
        children: "<p class='text-zinc-400'>Minimal JavaScript, maximum interactivity. Perfect for modern web apps.</p>"
      })}
      ${Card({
        title: "🌈 Customizable Theme",
        children: "<p class='text-zinc-400'>Dark-first design with gradient aesthetics. Fully customizable CSS variables.</p>"
      })}
      ${Card({
        title: "📊 Built-in Charts",
        children: "<p class='text-zinc-400'>Pure SVG charts with no external dependencies. Line, Bar, Donut, Gauge, and more.</p>"
      })}
      ${Card({
        title: "🎪 Rich Components",
        children: "<p class='text-zinc-400'>50+ components for dashboards, forms, data visualization, and more.</p>"
      })}
    </div>

    <!-- Quick Start -->
    <div class="bg-[var(--surface-1)]/50 rounded-md border border-[var(--border-default)] p-8 mb-20">
      <h2 class="text-2xl font-bold text-white mb-6">Quick Start</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Installation</h3>
          <pre class="bg-[#1A1A24] rounded-md p-4 overflow-x-auto"><code class="text-green-400">deno add @ethanke/lum-ui</code></pre>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">Basic Usage</h3>
          <pre class="bg-[#1A1A24] rounded-md p-4 overflow-x-auto"><code class="text-blue-400">import { Button, Card } from "jsr:@ethanke/lum-ui@^0.1.0";

const html = Card({
  title: "Welcome",
  children: \`\${Button({ text: "Click me", variant: "primary" })}\`
});</code></pre>
        </div>
      </div>
    </div>

    <!-- Links -->
    <div class="text-center space-y-4">
      <div class="flex justify-center gap-6 flex-wrap">
        <a href="https://jsr.io/@ethanke/lum-ui" class="text-[#FF4D8D] hover:underline">JSR Package</a>
        <a href="https://github.com/ethanke/lum-ui" class="text-[#FF4D8D] hover:underline">GitHub Repository</a>
        <a href="/showcase.html" class="text-[#FF4D8D] hover:underline">Component Showcase</a>
        <a href="https://github.com/ethanke/lum-ui/wiki" class="text-[#FF4D8D] hover:underline">Documentation</a>
      </div>
      <p class="text-zinc-500 text-sm">
        MIT License © <a href="https://github.com/ethanke" class="text-[#FF4D8D] hover:underline">Aspect</a>
      </p>
    </div>
    
  </div>
</body>
</html>`;
}

async function main() {
  console.log("📚 Generating documentation site...\n");
  
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });
  
  // Generate landing page
  const landingPage = generateLandingPage();
  await Deno.writeTextFile(`${OUTPUT_DIR}/index.html`, landingPage);
  console.log(`✅ Landing page generated at ${OUTPUT_DIR}/index.html`);
  
  // Generate showcase page
  const showcaseHtml = generateShowcase();
  await Deno.writeTextFile(`${OUTPUT_DIR}/showcase.html`, showcaseHtml);
  console.log(`✅ Showcase page generated at ${OUTPUT_DIR}/showcase.html`);
  
  // Create .nojekyll file for GitHub Pages
  await Deno.writeTextFile(`${OUTPUT_DIR}/.nojekyll`, "");
  
  console.log(`\n✅ Documentation site generated in ${OUTPUT_DIR}/`);
}

main();

