#!/usr/bin/env -S deno run --allow-read --allow-write
/**
 * Component Showcase Generator
 * 
 * Generates a showcase page with rendered component examples
 * This creates a static HTML page for GitHub Pages deployment
 */

// Import components from local source
import { Button, Card, Badge, Alert, Avatar, Spinner, Input, StatCard } from "../src/components.ts";
import { LineChart, BarChart, DonutChart, ProgressBar, Sparkline, GaugeChart } from "../src/charts.ts";
import { Table, StatusBadge, StatusDot, ActivityList } from "../src/tables.ts";
import { MetricCard, ChartCard, StatusIndicator, ProgressRing, AlertBanner, MetricGrid } from "../src/metrics.ts";
import { Head, PageHeader, Grid, Section, Container, Stack } from "../src/layouts.ts";
import { cssVariables, tailwindConfig, gradients, glass, effects } from "../src/theme.ts";
import { icons, icon } from "../src/icons.ts";

const OUTPUT_DIR = Deno.args[0] || "./showcase";

export function generateShowcase(): string {
  return `<!DOCTYPE html>
<html lang="en">
${Head({ title: "lum-ui Component Showcase", description: "Visual showcase of all lum-ui components" })}
<body class="bg-[#0A0A0F] min-h-screen">
  <div class="max-w-7xl mx-auto px-4 py-12">
    
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold text-white mb-4">
        <span class="bg-gradient-to-r from-[#FF8C00] via-[#FF4D8D] to-[#8B5CF6] bg-clip-text text-transparent">
          lum-ui
        </span>
        Component Showcase
      </h1>
      <p class="text-zinc-400 text-lg max-w-2xl mx-auto">
        A visual reference of all components available in the lum-ui library.
        Every component shown here is generated server-side using template strings.
      </p>
      <div class="flex justify-center gap-4 mt-6">
        ${Button({ text: "← Back to Home", href: "./index.html", variant: "ghost" })}
        ${Button({ text: "View on JSR", href: "https://jsr.io/@ethanke/lum-ui", variant: "primary", icon: "externalLink" })}
        ${Button({ text: "GitHub", href: "https://github.com/ethanke/lum-ui", variant: "secondary", icon: "github" })}
      </div>
    </div>

    <!-- Buttons Section -->
    ${Section("Buttons", `
      <p class="text-zinc-400 mb-6">Buttons come in multiple variants and sizes.</p>
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium text-zinc-500 mb-3">Variants</h4>
          <div class="flex flex-wrap gap-3">
            ${Button({ text: "Primary", variant: "primary" })}
            ${Button({ text: "Secondary", variant: "secondary" })}
            ${Button({ text: "Ghost", variant: "ghost" })}
            ${Button({ text: "Danger", variant: "danger" })}
          </div>
        </div>
        <div>
          <h4 class="text-sm font-medium text-zinc-500 mb-3">Sizes</h4>
          <div class="flex flex-wrap items-center gap-3">
            ${Button({ text: "Small", size: "sm" })}
            ${Button({ text: "Medium", size: "md" })}
            ${Button({ text: "Large", size: "lg" })}
          </div>
        </div>
        <div>
          <h4 class="text-sm font-medium text-zinc-500 mb-3">With Icons</h4>
          <div class="flex flex-wrap gap-3">
            ${Button({ text: "Add Item", icon: "plus" })}
            ${Button({ text: "Download", icon: "download", iconPosition: "right" })}
            ${Button({ text: "Settings", icon: "cog", variant: "secondary" })}
          </div>
        </div>
      </div>
    `)}

    <!-- Badges Section -->
    ${Section("Badges", `
      <p class="text-zinc-400 mb-6">Status indicators and labels.</p>
      <div class="flex flex-wrap gap-3">
        ${Badge({ text: "Default" })}
        ${Badge({ text: "Success", color: "success" })}
        ${Badge({ text: "Warning", color: "warning" })}
        ${Badge({ text: "Error", color: "error" })}
        ${Badge({ text: "Info", color: "info" })}
        ${Badge({ text: "Brand", color: "brand" })}
        ${Badge({ text: "With Dot", color: "success", dot: true })}
      </div>
    `)}

    <!-- Alerts Section -->
    ${Section("Alerts", `
      <p class="text-zinc-400 mb-6">Notification banners for different states.</p>
      <div class="space-y-4">
        ${Alert({ type: "success", title: "Success", message: "Your changes have been saved successfully." })}
        ${Alert({ type: "warning", title: "Warning", message: "Please review your settings before continuing." })}
        ${Alert({ type: "error", title: "Error", message: "Something went wrong. Please try again." })}
        ${Alert({ type: "info", message: "This is an informational message without a title." })}
      </div>
    `)}

    <!-- Cards Section -->
    ${Section("Cards", `
      <p class="text-zinc-400 mb-6">Container components for grouping content.</p>
      ${Grid(`
        ${Card({
          title: "Basic Card",
          subtitle: "With title and subtitle",
          children: "<p class='text-zinc-400'>Card content goes here. Cards are versatile containers for any content.</p>"
        })}
        ${Card({
          title: "With Status",
          status: { text: "Active", color: "success" },
          children: "<p class='text-zinc-400'>Cards can display status badges in the header.</p>"
        })}
        ${Card({
          title: "With Icon",
          icon: icons.chart,
          children: "<p class='text-zinc-400'>Add visual interest with icons.</p>"
        })}
        ${StatCard({ label: "Total Users", value: "12,543", subtext: "+12% from last month", status: "online" })}
      `, 2)}
    `)}

    <!-- Inputs Section -->
    ${Section("Inputs", `
      <p class="text-zinc-400 mb-6">Form input components.</p>
      <div class="max-w-md space-y-4">
        ${Input({ name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true })}
        ${Input({ name: "search", placeholder: "Search...", icon: "search" })}
        ${Input({ name: "disabled", label: "Disabled Input", value: "Cannot edit", disabled: true })}
      </div>
    `)}

    <!-- Avatars Section -->
    ${Section("Avatars", `
      <p class="text-zinc-400 mb-6">User avatars with fallback initials.</p>
      <div class="flex items-center gap-4">
        ${Avatar({ name: "John Doe", size: "sm" })}
        ${Avatar({ name: "Jane Smith", size: "md" })}
        ${Avatar({ email: "user@example.com", size: "lg" })}
        ${Avatar({ src: "https://i.pravatar.cc/150?img=3", name: "Photo", size: "lg" })}
      </div>
    `)}

    <!-- Status Indicators Section -->
    ${Section("Status Indicators", `
      <p class="text-zinc-400 mb-6">Various ways to show status.</p>
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          ${StatusDot({ status: "online" })} Online
          ${StatusDot({ status: "offline" })} Offline  
          ${StatusDot({ status: "warning" })} Warning
          ${StatusDot({ status: "error" })} Error
        </div>
        <div class="flex flex-wrap gap-3">
          ${StatusBadge({ status: "healthy", text: "Healthy" })}
          ${StatusBadge({ status: "warning", text: "Degraded" })}
          ${StatusBadge({ status: "error", text: "Down" })}
          ${StatusBadge({ status: "unknown", text: "Unknown" })}
        </div>
        <div class="flex items-center gap-6">
          ${StatusIndicator({ status: "healthy", label: "API" })}
          ${StatusIndicator({ status: "warning", label: "Database" })}
          ${StatusIndicator({ status: "error", label: "Cache" })}
        </div>
      </div>
    `)}

    <!-- Charts Section -->
    ${Section("Charts", `
      <p class="text-zinc-400 mb-6">Pure SVG charts with no external dependencies.</p>
      ${Grid(`
        ${ChartCard({
          title: "Line Chart",
          subtitle: "Trend over time",
          children: LineChart({
            data: [
              { label: "Jan", value: 30 },
              { label: "Feb", value: 45 },
              { label: "Mar", value: 35 },
              { label: "Apr", value: 60 },
              { label: "May", value: 55 },
              { label: "Jun", value: 80 },
            ],
            height: 200,
          })
        })}
        ${ChartCard({
          title: "Bar Chart",
          subtitle: "Category comparison",
          children: BarChart({
            data: [
              { label: "Chrome", value: 65 },
              { label: "Firefox", value: 20 },
              { label: "Safari", value: 10 },
              { label: "Edge", value: 5 },
            ],
            height: 200,
          })
        })}
      `, 2)}
      
      ${Grid(`
        ${ChartCard({
          title: "Donut Chart",
          children: DonutChart({
            data: [
              { label: "Desktop", value: 60, color: "#FF4D8D" },
              { label: "Mobile", value: 30, color: "#8B5CF6" },
              { label: "Tablet", value: 10, color: "#FF8C00" },
            ],
            size: 180,
          })
        })}
        ${ChartCard({
          title: "Gauge Chart",
          children: `
            <div class="flex justify-center">
              ${GaugeChart({ value: 73, max: 100, label: "Performance", size: 160 })}
            </div>
          `
        })}
        ${ChartCard({
          title: "Progress Bars",
          children: `
            <div class="space-y-4">
              ${ProgressBar({ value: 75, label: "CPU Usage", showLabel: true })}
              ${ProgressBar({ value: 45, label: "Memory", color: "purple", showLabel: true })}
              ${ProgressBar({ value: 90, label: "Disk", color: "orange", showLabel: true })}
            </div>
          `
        })}
        ${ChartCard({
          title: "Sparklines",
          children: `
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Traffic</span>
                ${Sparkline({ data: [10, 25, 15, 30, 45, 35, 55, 40, 60], width: 120, height: 30 })}
              </div>
              <div class="flex items-center justify-between">
                <span class="text-zinc-400">Revenue</span>
                ${Sparkline({ data: [20, 18, 25, 30, 28, 35, 40, 38, 45], width: 120, height: 30, color: "#10B981" })}
              </div>
            </div>
          `
        })}
      `, 4)}
    `)}

    <!-- Metrics Section -->
    ${Section("Metric Cards", `
      <p class="text-zinc-400 mb-6">Dashboard metric display components.</p>
      ${MetricGrid({
        children: `
          ${MetricCard({ title: "Total Revenue", value: "$124,592", change: 12.5, changeLabel: "vs last month" })}
          ${MetricCard({ title: "Active Users", value: "8,942", change: -3.2, changeLabel: "vs last week" })}
          ${MetricCard({ title: "Conversion Rate", value: "3.24%", change: 0.8, changeLabel: "vs yesterday" })}
          ${MetricCard({ title: "Avg Response", value: "145ms", subtitle: "P95 latency" })}
        `
      })}
    `)}

    <!-- Tables Section -->
    ${Section("Tables", `
      <p class="text-zinc-400 mb-6">Data table with sortable columns.</p>
      ${Table({
        columns: [
          { key: "name", label: "Name" },
          { key: "status", label: "Status" },
          { key: "role", label: "Role" },
          { key: "lastActive", label: "Last Active" },
        ],
        data: [
          { name: "Alice Johnson", status: StatusBadge({ status: "healthy", text: "Active" }), role: "Admin", lastActive: "2 min ago" },
          { name: "Bob Smith", status: StatusBadge({ status: "warning", text: "Away" }), role: "User", lastActive: "1 hour ago" },
          { name: "Carol White", status: StatusBadge({ status: "error", text: "Offline" }), role: "User", lastActive: "3 days ago" },
        ],
      })}
    `)}

    <!-- Activity List -->
    ${Section("Activity Lists", `
      <p class="text-zinc-400 mb-6">Timeline-style activity feeds.</p>
      <div class="max-w-xl">
        ${ActivityList({
          items: [
            { icon: icons.user, title: "New user registered", description: "alice@example.com joined the platform", time: "2 minutes ago", color: "success" },
            { icon: icons.code, title: "Deployment completed", description: "v2.3.1 deployed to production", time: "15 minutes ago", color: "info" },
            { icon: icons.exclamation, title: "High CPU usage detected", description: "Server cpu-01 at 95% utilization", time: "1 hour ago", color: "warning" },
          ]
        })}
      </div>
    `)}

    <!-- Icons Section -->
    ${Section("Icons", `
      <p class="text-zinc-400 mb-6">50+ Heroicons-style SVG icons.</p>
      <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-4">
        ${Object.keys(icons).slice(0, 48).map(name => `
          <div class="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-[#1A1A24] transition-colors group">
            <div class="text-zinc-400 group-hover:text-[#FF4D8D] transition-colors">${icons[name as keyof typeof icons]}</div>
            <span class="text-xs text-zinc-500 truncate max-w-full">${name}</span>
          </div>
        `).join("")}
      </div>
    `)}

    <!-- Theme Section -->
    ${Section("Theme & Utilities", `
      <p class="text-zinc-400 mb-6">Gradient and glass morphism utilities.</p>
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium text-zinc-500 mb-3">Gradients</h4>
          <div class="flex flex-wrap gap-4">
            <div class="w-32 h-20 rounded-md bg-gradient-to-r ${gradients.brand}"></div>
            <div class="w-32 h-20 rounded-md bg-gradient-to-r ${gradients.brandSubtle}"></div>
            <div class="w-32 h-20 rounded-md bg-gradient-to-b ${gradients.dark}"></div>
          </div>
        </div>
        <div>
          <h4 class="text-sm font-medium text-zinc-500 mb-3">Glass Morphism</h4>
          <div class="${glass.base} ${glass.hover} rounded-md p-6 max-w-sm">
            <p class="text-white">Glass card with backdrop blur and subtle border.</p>
          </div>
        </div>
      </div>
    `)}

    <!-- Footer -->
    <div class="mt-16 pt-8 border-t border-white/5 text-center">
      <p class="text-zinc-500 text-sm">
        Generated by lum-ui showcase generator • 
        <a href="https://jsr.io/@ethanke/lum-ui" class="text-[#FF4D8D] hover:underline">View on JSR</a>
      </p>
    </div>
    
  </div>
</body>
</html>`;
}

async function main() {
  console.log("🎨 Generating component showcase...\n");
  
  await Deno.mkdir(OUTPUT_DIR, { recursive: true });
  
  const html = generateShowcase();
  await Deno.writeTextFile(`${OUTPUT_DIR}/index.html`, html);
  
  // Create .nojekyll file for GitHub Pages
  await Deno.writeTextFile(`${OUTPUT_DIR}/.nojekyll`, "");
  
  console.log(`✅ Showcase generated at ${OUTPUT_DIR}/index.html`);
}

// Only run main if this is the entry point
if (import.meta.main) {
  main();
}
