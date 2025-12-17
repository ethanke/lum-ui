#!/usr/bin/env -S deno run --allow-read --allow-write --allow-net --allow-env --allow-run

/**
 * Generates visual screenshots of all components using Puppeteer
 * Renders actual components from JSR package
 */

import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

interface Component {
  name: string;
  category: string;
  code: string;
  imports: string;
}

const COMPONENTS: Component[] = [
  {
    name: "Button-Primary",
    category: "components",
    imports: "Button",
    code: `Button({ text: "Click Me", variant: "primary", icon: "check" })`,
  },
  {
    name: "Button-Secondary",
    category: "components",
    imports: "Button",
    code: `Button({ text: "Cancel", variant: "secondary" })`,
  },
  {
    name: "Button-Ghost",
    category: "components",
    imports: "Button",
    code: `Button({ text: "Ghost", variant: "ghost" })`,
  },
  {
    name: "Card",
    category: "components",
    imports: "Card",
    code: `Card({ title: "Dashboard Card", subtitle: "Latest metrics", children: '<p class="text-zinc-400 mt-2">This is an example card component with custom content.</p>' })`,
  },
  {
    name: "Badge-Success",
    category: "components",
    imports: "Badge",
    code: `Badge({ text: "Success", color: "success", dot: true })`,
  },
  {
    name: "Alert-Success",
    category: "components",
    imports: "Alert",
    code: `Alert({ type: "success", title: "Success!", message: "Operation completed successfully" })`,
  },
  {
    name: "Input",
    category: "components",
    imports: "Input",
    code: `Input({ name: "email", label: "Email Address", placeholder: "you@example.com", icon: "mail" })`,
  },
  {
    name: "Avatar",
    category: "components",
    imports: "Avatar",
    code: `Avatar({ name: "Alex Smith", size: "lg" })`,
  },
  {
    name: "Spinner",
    category: "components",
    imports: "Spinner",
    code: `Spinner({ size: "lg", text: "Loading..." })`,
  },
  {
    name: "StatCard",
    category: "components",
    imports: "StatCard",
    code: `StatCard({ label: "Total Users", value: "1,234", status: "online", subtext: "+12% from last month" })`,
  },
  {
    name: "LineChart",
    category: "charts",
    imports: "LineChart",
    code: `LineChart({ data: [
      { label: "Jan", value: 100 },
      { label: "Feb", value: 150 },
      { label: "Mar", value: 130 },
      { label: "Apr", value: 180 },
      { label: "May", value: 200 }
    ], height: 250, width: 600, color: "#FF4D8D", showGrid: true, showDots: true })`,
  },
  {
    name: "BarChart",
    category: "charts",
    imports: "BarChart",
    code: `BarChart({ data: [
      { label: "Mon", value: 120 },
      { label: "Tue", value: 180 },
      { label: "Wed", value: 150 },
      { label: "Thu", value: 200 },
      { label: "Fri", value: 170 }
    ], height: 250, width: 600, color: "#8B5CF6", showGrid: true })`,
  },
  {
    name: "DonutChart",
    category: "charts",
    imports: "DonutChart",
    code: `DonutChart({ data: [
      { label: "Desktop", value: 60, color: "#FF4D8D" },
      { label: "Mobile", value: 30, color: "#8B5CF6" },
      { label: "Tablet", value: 10, color: "#FF8C00" }
    ], size: 200 })`,
  },
  {
    name: "ProgressBar",
    category: "charts",
    imports: "ProgressBar",
    code: `ProgressBar({ value: 65, max: 100, label: "Upload Progress", color: "#10B981", showPercentage: true })`,
  },
  {
    name: "GaugeChart",
    category: "charts",
    imports: "GaugeChart",
    code: `GaugeChart({ value: 75, max: 100, size: 200, color: "#FF4D8D", label: "Performance" })`,
  },
  {
    name: "StatusBadge-Active",
    category: "tables",
    imports: "StatusBadge",
    code: `StatusBadge({ status: "active", text: "Active Service" })`,
  },
  {
    name: "StatusBadge-Inactive",
    category: "tables",
    imports: "StatusBadge",
    code: `StatusBadge({ status: "inactive", text: "Inactive" })`,
  },
  {
    name: "StatusDot",
    category: "tables",
    imports: "StatusDot",
    code: `'<div class="flex items-center gap-2">' + StatusDot({ status: "online" }) + '<span>System Online</span></div>'`,
  },
];

function generateHTML(component: Component): string {
  // Get all unique imports for this component
  const allImports = [...new Set([component.imports])].join(", ");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --surface-0: #0A0A0F;
      --surface-1: #12121A;
      --surface-2: #1A1A24;
      --surface-3: #24242F;
      --text-primary: #FFFFFF;
      --text-secondary: #A1A1AA;
      --border: rgba(255, 255, 255, 0.1);
      --border-hover: rgba(255, 77, 141, 0.2);
      --brand-primary: #FF4D8D;
      --brand-secondary: #8B5CF6;
      --brand-accent: #FF8C00;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--surface-0);
      color: var(--text-primary);
      padding: 60px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #root {
      max-width: 800px;
      width: 100%;
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
  <div id="root">Loading...</div>
  <script type="module">
    import { ${allImports} } from "https://jsr.io/@aspect/lum-ui@0.1.0/mod.ts";
    
    const html = ${component.code};
    document.getElementById('root').innerHTML = html;
  </script>
</body>
</html>`;
}

async function captureScreenshot(component: Component): Promise<boolean> {
  try {
    console.log(`📸 Capturing: ${component.name}`);

    const html = generateHTML(component);
    const htmlPath = `screenshots/temp-${component.name}.html`;
    const screenshotPath = `screenshots/${component.name}.png`;

    // Write temporary HTML file
    await Deno.writeTextFile(htmlPath, html);

    // Get browser executable path from environment or use default
    const executablePath = Deno.env.get("PUPPETEER_EXECUTABLE_PATH") ||
      "/usr/bin/google-chrome-stable";

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });

    // Navigate to HTML file
    const fileUrl = `file://${Deno.cwd()}/${htmlPath}`;
    await page.goto(fileUrl, {
      waitUntil: "networkidle2",
      timeout: 10000,
    });

    // Wait for content to render
    await page.waitForTimeout(1000);

    // Get element bounds and screenshot
    const element = await page.$("#root");
    if (element) {
      await element.screenshot({
        path: screenshotPath,
        omitBackground: false,
      });
    } else {
      throw new Error("Root element not found");
    }

    await browser.close();

    // Clean up temp HTML file
    await Deno.remove(htmlPath);

    console.log(`✅ Saved: ${screenshotPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to capture ${component.name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log("\n🎨 Generating Component Screenshots\n");

  // Ensure screenshots directory exists
  try {
    await Deno.mkdir("screenshots", { recursive: true });
  } catch {
    // Directory already exists
  }

  let successCount = 0;
  let failCount = 0;

  for (const component of COMPONENTS) {
    const success = await captureScreenshot(component);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✨ Screenshot generation complete!`);
  console.log(`📊 Success: ${successCount}, Failed: ${failCount}`);
  console.log(`📁 Screenshots saved to screenshots/\n`);

  if (failCount > 0) {
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}
