#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Auto-generates GitHub Wiki documentation from source code
 * Parses TypeScript files to extract components, types, and examples
 * Includes component screenshots for visual reference
 */

interface Component {
  name: string;
  description: string;
  props: Array<{ name: string; type: string; required: boolean; description?: string }>;
  example: string;
  category: "component" | "chart" | "table" | "metric" | "layout";
  screenshot?: string;
}

const CATEGORIES = {
  component: ["Button", "Card", "Badge", "Alert", "Input", "Avatar", "Spinner", "StatCard", "Divider"],
  chart: ["LineChart", "BarChart", "AreaChart", "DonutChart", "GaugeChart", "Sparkline", "ProgressBar", "TimeSeriesChart"],
  table: ["Table", "StatusBadge", "StatusDot", "RankedList", "ActivityList"],
  metric: ["MetricCard", "MetricGrid", "ChartCard", "TimeRangeSelector", "StatusIndicator", "ProgressRing", "AlertBanner"],
  layout: ["Head", "PageHeader", "Grid", "Section", "Container", "Stack", "Flex"],
};

// Map component names to their screenshot files
const SCREENSHOT_MAP: Record<string, string> = {
  "Button": "Button-Primary.png",
  "Card": "Card.png",
  "Badge": "Badge-Success.png",
  "Alert": "Alert-Success.png",
  "Input": "Input.png",
  "Avatar": "Avatar.png",
  "Spinner": "Spinner.png",
  "StatCard": "StatCard.png",
  "LineChart": "LineChart.png",
  "BarChart": "BarChart.png",
  "DonutChart": "DonutChart.png",
  "ProgressBar": "ProgressBar.png",
  "GaugeChart": "GaugeChart.png",
  "StatusBadge": "StatusBadge-Active.png",
  "StatusDot": "StatusDot.png",
};

async function parseComponents(): Promise<Component[]> {
  const components: Component[] = [];
  const files = [
    { path: "src/components.ts", category: "component" as const },
    { path: "src/charts.ts", category: "chart" as const },
    { path: "src/tables.ts", category: "table" as const },
    { path: "src/metrics.ts", category: "metric" as const },
    { path: "src/layouts.ts", category: "layout" as const },
  ];

  for (const { path, category } of files) {
    const content = await Deno.readTextFile(path);
    const categoryComponents = CATEGORIES[category];
    
    for (const compName of categoryComponents) {
      const propsMatch = content.match(new RegExp(`export interface ${compName}Props[^{]*{([^}]+)}`, "s"));
      const funcMatch = content.match(new RegExp(`export function ${compName}\\(([^)]+)\\)`, "s"));
      
      if (funcMatch) {
        components.push({
          name: compName,
          description: extractDescription(content, compName),
          props: propsMatch ? parseProps(propsMatch[1]) : [],
          example: generateExample(compName, category),
          category,
          screenshot: SCREENSHOT_MAP[compName],
        });
      }
    }
  }
  
  return components;
}

function extractDescription(content: string, componentName: string): string {
  const lines = content.split("\n");
  const funcIndex = lines.findIndex((line) => line.includes(`function ${componentName}`));
  
  if (funcIndex > 0) {
    const prevLine = lines[funcIndex - 1].trim();
    if (prevLine.startsWith("//")) {
      return prevLine.replace(/^\/\/\s*/, "");
    }
  }
  
  return `${componentName} component`;
}

function parseProps(propsStr: string): Array<{ name: string; type: string; required: boolean }> {
  const props: Array<{ name: string; type: string; required: boolean }> = [];
  const lines = propsStr.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("//"));
  
  for (const line of lines) {
    const match = line.match(/^(\w+)(\?)?:\s*([^;]+)/);
    if (match) {
      props.push({
        name: match[1],
        type: match[3].trim(),
        required: !match[2],
      });
    }
  }
  
  return props;
}

function generateExample(name: string, category: string): string {
  const examples: Record<string, string> = {
    Button: `Button({
  text: "Click me",
  variant: "primary",
  size: "md",
  icon: "check"
})`,
    Card: `Card({
  title: "Welcome",
  subtitle: "Getting started",
  children: "<p>Card content here</p>"
})`,
    Alert: `Alert({
  type: "success",
  title: "Success!",
  message: "Operation completed"
})`,
    LineChart: `LineChart({
  data: [
    { label: "Jan", value: 100 },
    { label: "Feb", value: 150 },
    { label: "Mar", value: 200 }
  ],
  height: 300
})`,
    Table: `Table({
  columns: [
    { key: "name", label: "Name" },
    { key: "value", label: "Value" }
  ],
  data: [
    { name: "Item 1", value: "100" },
    { name: "Item 2", value: "200" }
  ]
})`,
  };
  
  return examples[name] || `${name}({ /* props */ })`;
}

function generateHomePage(): string {
  return `# lum-ui

> Modern, lightweight UI component library for Deno + HTMX + Alpine.js

[![JSR](https://jsr.io/badges/@aspect/lum-ui)](https://jsr.io/@aspect/lum-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

**lum-ui** is a server-side rendered UI component library designed for building fast, modern web applications with:

- 🎨 **Template String Components** - No JSX, pure TypeScript
- 🚀 **Zero Build Step** - Works directly with Deno
- 🎯 **HTMX + Alpine.js** - Minimal JavaScript, maximum interactivity
- 🌈 **Customizable Theme** - Dark-first design with gradient aesthetics
- 📊 **Built-in Charts** - Pure SVG charts, no external dependencies
- 🎪 **Rich Components** - 50+ components for dashboards, forms, data viz

## Quick Start

\`\`\`typescript
import { Button, Card, LineChart } from "jsr:@aspect/lum-ui@^0.1.0";

const html = Card({
  title: "Dashboard",
  children: \`
    \${Button({ text: "Action", variant: "primary" })}
    \${LineChart({ data: [...], height: 300 })}
  \`
});
\`\`\`

## Installation

\`\`\`bash
deno add @aspect/lum-ui
\`\`\`

Or use directly:
\`\`\`typescript
import * as ui from "jsr:@aspect/lum-ui@^0.1.0";
\`\`\`

## Features

### 🎨 Theme System
Fully customizable dark-first theme with CSS variables:
\`\`\`typescript
import { createTheme } from "jsr:@aspect/lum-ui/theme";

const myTheme = createTheme({
  brand: {
    primary: "#FF4D8D",
    secondary: "#8B5CF6",
    accent: "#FF8C00"
  }
});
\`\`\`

### 📦 Component Categories

- **[Components](Components)** - Buttons, Cards, Badges, Alerts, Inputs
- **[Charts](Charts)** - Line, Bar, Area, Donut, Gauge, Sparkline
- **[Tables](Tables)** - Data tables, status indicators, activity lists
- **[Metrics](Metrics)** - Metric cards, progress rings, chart cards
- **[Layouts](Layouts)** - Page headers, grids, sections, containers

### 🎯 Stack

- **Deno** - Modern JavaScript runtime
- **HTMX** - HTML over the wire
- **Alpine.js** - Minimal JavaScript framework
- **Tailwind CSS** - Utility-first styling

## Documentation

- [Getting Started](Getting-Started)
- [Components Reference](Components)
- [Theme Customization](Theme)
- [Examples](Examples)

## License

MIT © [Aspect](https://github.com/ethanke/lum-ui)
`;
}

function generateComponentsPage(components: Component[]): string {
  const byCategory = components.reduce((acc, comp) => {
    if (comp.category === "component") acc.push(comp);
    return acc;
  }, [] as Component[]);

  let md = `# Components

Core UI components for building interfaces.

## Overview

${byCategory.map((c) => `- [${c.name}](#${c.name.toLowerCase()})`).join("\n")}

---

`;

  for (const comp of byCategory) {
    md += `## ${comp.name}

${comp.description}

`;

    // Add screenshot if available
    if (comp.screenshot) {
      md += `### Preview

![${comp.name}](../screenshots/${comp.screenshot})

`;
    }

    md += `### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
`;
    for (const prop of comp.props) {
      md += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? "✅" : "❌"} | |\n`;
    }

    md += `
### Example

\`\`\`typescript
${comp.example}
\`\`\`

---

`;
  }

  return md;
}

function generateChartsPage(components: Component[]): string {
  const charts = components.filter((c) => c.category === "chart");

  let md = `# Charts

Pure SVG chart components with zero dependencies.

## Available Charts

${charts.map((c) => `- [${c.name}](#${c.name.toLowerCase()})`).join("\n")}

---

`;

  for (const chart of charts) {
    md += `## ${chart.name}

${chart.description}

`;

    // Add screenshot if available
    if (chart.screenshot) {
      md += `### Preview

![${chart.name}](../screenshots/${chart.screenshot})

`;
    }

    md += `### Props

| Prop | Type | Required |
|------|------|----------|
`;
    for (const prop of chart.props) {
      md += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? "✅" : "❌"} |\n`;
    }

    md += `
### Example

\`\`\`typescript
${chart.example}
\`\`\`

---

`;
  }

  return md;
}

function generateThemePage(): string {
  return `# Theme Customization

lum-ui uses a powerful theming system with CSS variables and full Tailwind integration.

## Default Theme

The default theme is a modern dark-first design with gradient aesthetics:

\`\`\`typescript
import { defaultTheme } from "jsr:@aspect/lum-ui/theme";

// Returns ThemeConfig with all default values
console.log(defaultTheme);
\`\`\`

## Creating Custom Themes

Use \`createTheme()\` to customize the design system:

\`\`\`typescript
import { createTheme } from "jsr:@aspect/lum-ui/theme";

const myTheme = createTheme({
  brand: {
    primary: "#FF4D8D",
    secondary: "#8B5CF6",
    accent: "#FF8C00",
    gradient: {
      from: "#FF8C00",
      via: "#FF4D8D",
      to: "#8B5CF6"
    }
  },
  surface: {
    0: "#0A0A0F", // Base background
    1: "#12121A", // Cards
    2: "#1A1A24", // Elevated
    3: "#24242F"  // Hover states
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#D4D4D8",
    muted: "#A1A1AA",
    subtle: "#71717A"
  },
  border: {
    default: "rgba(255, 255, 255, 0.05)",
    hover: "rgba(255, 77, 141, 0.2)",
    focus: "#FF4D8D"
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#06B6D4"
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "9999px"
  }
});

// Use in your Head component
const html = \`
  <style>\${myTheme.cssVariables}</style>
  <script>\${myTheme.tailwindConfig}</script>
\`;
\`\`\`

## CSS Variables

The theme generates CSS variables you can use directly:

\`\`\`css
.my-element {
  background: var(--surface-1);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
\`\`\`

## Utility Classes

Pre-built utility objects for common patterns:

### Gradients

\`\`\`typescript
import { gradients } from "jsr:@aspect/lum-ui/theme";

// Use in Tailwind classes
const html = \`<div class="bg-gradient-to-r \${gradients.brand}">...</div>\`;
\`\`\`

### Glass Morphism

\`\`\`typescript
import { glass } from "jsr:@aspect/lum-ui/theme";

const html = \`<div class="\${glass.base} \${glass.hover}">...</div>\`;
\`\`\`

### Effects

\`\`\`typescript
import { effects } from "jsr:@aspect/lum-ui/theme";

const html = \`<div class="\${effects.glow}">...</div>\`;
\`\`\`

## TypeScript Types

\`\`\`typescript
import type { Theme, ThemeConfig } from "jsr:@aspect/lum-ui/theme";

const config: ThemeConfig = { /* ... */ };
const theme: Theme = createTheme(config);
\`\`\`
`;
}

function generateExamplesPage(): string {
  return `# Examples

Real-world examples using lum-ui components.

## Complete Dashboard

\`\`\`typescript
import { Hono } from "https://deno.land/x/hono/mod.ts";
import {
  Head,
  PageHeader,
  Card,
  Button,
  StatCard,
  LineChart,
  MetricGrid,
} from "jsr:@aspect/lum-ui@^0.1.0";

const app = new Hono();

app.get("/", (c) => {
  const html = \`
    <!DOCTYPE html>
    <html>
      \${Head({ title: "Dashboard", description: "My Dashboard" })}
      <body class="bg-[var(--surface-0)]">
        <div class="container mx-auto p-6">
          \${PageHeader({
            title: "Dashboard",
            subtitle: "Welcome back!",
            actions: Button({ text: "New Item", variant: "primary" })
          })}
          
          \${MetricGrid([
            StatCard({ label: "Users", value: "1,234", status: "online" }),
            StatCard({ label: "Revenue", value: "$56.7K" }),
            StatCard({ label: "Orders", value: "890" }),
            StatCard({ label: "Growth", value: "+12.5%" }),
          ])}
          
          \${Card({
            title: "Traffic Overview",
            children: LineChart({
              data: [
                { label: "Mon", value: 120 },
                { label: "Tue", value: 150 },
                { label: "Wed", value: 180 },
                { label: "Thu", value: 140 },
                { label: "Fri", value: 200 }
              ],
              height: 300,
              color: "#FF4D8D"
            })
          })}
        </div>
      </body>
    </html>
  \`;
  
  return c.html(html);
});

Deno.serve(app.fetch);
\`\`\`

## Form with Validation

\`\`\`typescript
import { Card, Input, Button, Alert } from "jsr:@aspect/lum-ui@^0.1.0";

const form = Card({
  title: "Sign Up",
  children: \`
    <form x-data="{ email: '', password: '', error: '' }" @submit.prevent="handleSubmit">
      \${Input({
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "you@example.com",
        icon: "mail",
        required: true
      })}
      
      \${Input({
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "Min 6 characters",
        icon: "lock",
        required: true
      })}
      
      <div x-show="error" x-cloak>
        \${Alert({
          type: "error",
          message: "<span x-text='error'></span>",
          dismissible: true
        })}
      </div>
      
      \${Button({
        text: "Create Account",
        variant: "primary",
        type: "submit",
        fullWidth: true
      })}
    </form>
  \`
});
\`\`\`

## Data Table

\`\`\`typescript
import { Table, StatusBadge } from "jsr:@aspect/lum-ui@^0.1.0";

const users = Table({
  columns: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "status", label: "Status" },
    { key: "role", label: "Role" }
  ],
  data: [
    {
      name: "John Doe",
      email: "john@example.com",
      status: StatusBadge({ status: "active", text: "Active" }),
      role: "Admin"
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      status: StatusBadge({ status: "active", text: "Active" }),
      role: "User"
    }
  ]
});
\`\`\`

## More Examples

Check out the [examples directory](https://github.com/ethanke/lum-ui/tree/main/examples) for more:

- Basic dashboard
- Authentication forms
- Data visualization
- Admin panels
- Landing pages
`;
}

async function generateWiki() {
  console.log("🔍 Parsing components...");
  const components = await parseComponents();
  console.log(`✅ Found ${components.length} components`);

  console.log("\n📝 Generating wiki pages...");
  
  const pages = {
    "Home.md": generateHomePage(),
    "Components.md": generateComponentsPage(components),
    "Charts.md": generateChartsPage(components),
    "Theme.md": generateThemePage(),
    "Examples.md": generateExamplesPage(),
  };

  await Deno.mkdir("wiki", { recursive: true });

  for (const [filename, content] of Object.entries(pages)) {
    await Deno.writeTextFile(`wiki/${filename}`, content);
    console.log(`✅ Generated wiki/${filename}`);
  }

  console.log("\n🎉 Wiki generation complete!");
}

if (import.meta.main) {
  await generateWiki();
}
