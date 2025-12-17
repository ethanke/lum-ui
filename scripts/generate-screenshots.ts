#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env --allow-run

/**
 * Generates visual screenshots of all components
 * Uses headless browser to render and capture component examples
 */

import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

interface Component {
  name: string;
  category: string;
  code: string;
}

const COMPONENTS: Component[] = [
  // Core Components
  { name: "Button-Primary", category: "components", code: `Button({ text: "Click Me", variant: "primary" })` },
  { name: "Button-Secondary", category: "components", code: `Button({ text: "Cancel", variant: "secondary" })` },
  { name: "Button-Ghost", category: "components", code: `Button({ text: "Ghost", variant: "ghost" })` },
  { name: "Card", category: "components", code: `Card({ title: "Card Title", subtitle: "Subtitle", children: "<p class='text-zinc-400'>Card content goes here</p>" })` },
  { name: "Badge-Success", category: "components", code: `Badge({ text: "Success", color: "success", dot: true })` },
  { name: "Badge-Warning", category: "components", code: `Badge({ text: "Warning", color: "warning" })` },
  { name: "Alert-Success", category: "components", code: `Alert({ type: "success", title: "Success!", message: "Operation completed successfully" })` },
  { name: "Alert-Error", category: "components", code: `Alert({ type: "error", title: "Error", message: "Something went wrong" })` },
  { name: "Input", category: "components", code: `Input({ name: "email", label: "Email", placeholder: "you@example.com", icon: "mail" })` },
  { name: "Avatar", category: "components", code: `Avatar({ name: "John Doe", size: "lg" })` },
  { name: "Spinner", category: "components", code: `Spinner({ size: "lg", text: "Loading..." })` },
  { name: "StatCard", category: "components", code: `StatCard({ label: "Total Users", value: "1,234", status: "online", subtext: "+12% from last month" })` },
  
  // Charts
  { name: "LineChart", category: "charts", code: `LineChart({ data: [
    { label: "Jan", value: 100 },
    { label: "Feb", value: 150 },
    { label: "Mar", value: 130 },
    { label: "Apr", value: 180 },
    { label: "May", value: 200 }
  ], height: 250, color: "#FF4D8D" })` },
  { name: "BarChart", category: "charts", code: `BarChart({ data: [
    { label: "A", value: 120 },
    { label: "B", value: 180 },
    { label: "C", value: 150 },
    { label: "D", value: 200 }
  ], height: 250, color: "#8B5CF6" })` },
  { name: "DonutChart", category: "charts", code: `DonutChart({ data: [
    { label: "Desktop", value: 60, color: "#FF4D8D" },
    { label: "Mobile", value: 30, color: "#8B5CF6" },
    { label: "Tablet", value: 10, color: "#FF8C00" }
  ], size: 200 })` },
  { name: "ProgressBar", category: "charts", code: `ProgressBar({ value: 65, max: 100, label: "Progress", color: "#10B981" })` },
  { name: "GaugeChart", category: "charts", code: `GaugeChart({ value: 75, max: 100, size: 200, color: "#FF4D8D" })` },
  
  // Tables
  { name: "StatusBadge-Active", category: "tables", code: `StatusBadge({ status: "active", text: "Active" })` },
  { name: "StatusBadge-Inactive", category: "tables", code: `StatusBadge({ status: "inactive", text: "Inactive" })` },
  { name: "StatusDot", category: "tables", code: `StatusDot({ status: "online" }) + " Online"` },
];

function generateHTML(component: Component): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #0A0A0F;
      color: white;
      padding: 40px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      max-width: 600px;
      width: 100%;
    }
    :root {
      --surface-0: #0A0A0F;
      --surface-1: #12121A;
      --surface-2: #1A1A24;
      --surface-3: #24242F;
      --text-primary: #FFFFFF;
      --text-secondary: #D4D4D8;
      --text-muted: #A1A1AA;
      --border-default: rgba(255, 255, 255, 0.05);
      --border-hover: rgba(255, 77, 141, 0.2);
      --brand-primary: #FF4D8D;
      --brand-secondary: #8B5CF6;
      --brand-accent: #FF8C00;
    }
  </style>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: { primary: '#FF4D8D', secondary: '#8B5CF6', accent: '#FF8C00' },
            surface: { 0: '#0A0A0F', 1: '#12121A', 2: '#1A1A24', 3: '#24242F' }
          }
        }
      }
    }
  </script>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <div class="container">
    <script type="module">
      import * as ui from "https://jsr.io/@aspect/lum-ui/0.1.0/mod.ts";
      const { ${component.category === "components" ? "Button, Card, Badge, Alert, Input, Avatar, Spinner, StatCard" : component.category === "charts" ? "LineChart, BarChart, DonutChart, ProgressBar, GaugeChart" : "StatusBadge, StatusDot"} } = ui;
      
      const html = ${component.code};
      document.querySelector('.container').innerHTML = html;
    </script>
  </div>
</body>
</html>
  `;
}

async function captureScreenshot(component: Component) {
  console.log(`📸 Capturing: ${component.name}`);
  
  const html = generateHTML(component);
  const htmlPath = `screenshots/temp-${component.name}.html`;
  const screenshotPath = `screenshots/${component.name}.png`;
  
  // Write HTML file
  await Deno.writeTextFile(htmlPath, html);
  
  // Launch browser and capture
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  
  await page.goto(`file://${Deno.cwd()}/${htmlPath}`, {
    waitUntil: 'networkidle2'
  });
  
  // Wait for content to render
  await page.waitForTimeout(2000);
  
  // Take screenshot
  const element = await page.$('.container');
  if (element) {
    await element.screenshot({
      path: screenshotPath,
      omitBackground: false
    });
  }
  
  await browser.close();
  
  // Cleanup temp HTML
  await Deno.remove(htmlPath);
  
  console.log(`✅ Saved: ${screenshotPath}`);
}

async function generateAllScreenshots() {
  console.log("🎨 Generating Component Screenshots\n");
  
  // Create screenshots directory
  await Deno.mkdir("screenshots", { recursive: true });
  
  for (const component of COMPONENTS) {
    try {
      await captureScreenshot(component);
    } catch (error) {
      console.error(`❌ Failed to capture ${component.name}:`, error.message);
    }
  }
  
  console.log("\n✨ Screenshot generation complete!");
  console.log(`📁 Saved ${COMPONENTS.length} screenshots to screenshots/`);
}

if (import.meta.main) {
  await generateAllScreenshots();
}
