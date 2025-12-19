# lum-ui

> Modern, lightweight UI component library for Deno + HTMX + Alpine.js

[![JSR](https://jsr.io/badges/@ethanke/lum-ui)](https://jsr.io/@ethanke/lum-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Wiki](https://img.shields.io/badge/docs-wiki-blue)](https://github.com/ethanke/lum-ui/wiki)

**lum-ui** is a server-side rendered UI component library designed for building fast, modern web applications with minimal JavaScript and zero build steps.

## ✨ Features

- 🎨 **Template String Components** - No JSX, pure TypeScript
- 🚀 **Zero Build Step** - Works directly with Deno
- 🎯 **HTMX + Alpine.js** - Minimal JavaScript, maximum interactivity
- 🌈 **Customizable Theme** - Dark-first design with gradient aesthetics
- 📊 **Built-in Charts** - Pure SVG charts, no external dependencies
- 🎪 **Rich Components** - 50+ components for dashboards, forms, data viz

## �� Documentation

**[📖 Visit the Wiki](https://github.com/ethanke/lum-ui/wiki)** for complete documentation, examples, and API reference.

Quick links:
- [Getting Started](https://github.com/ethanke/lum-ui/wiki/Home)
- [Components](https://github.com/ethanke/lum-ui/wiki/Components) - Buttons, Cards, Forms, etc.
- [Charts](https://github.com/ethanke/lum-ui/wiki/Charts) - Data visualization
- [Theme](https://github.com/ethanke/lum-ui/wiki/Theme) - Customization guide
- [Examples](https://github.com/ethanke/lum-ui/wiki/Examples) - Real-world usage

## 🚀 Quick Start

### Installation

```bash
deno add @ethanke/lum-ui
```

Or use directly:
```typescript
import { Button, Card } from "jsr:@ethanke/lum-ui@^0.1.0";
```

### Basic Example

```typescript
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { Head, Button, Card, StatCard } from "jsr:@ethanke/lum-ui@^0.1.0";

const app = new Hono();

app.get("/", (c) => {
  const html = `
    <!DOCTYPE html>
    <html>
      ${Head({ title: "My Dashboard" })}
      <body class="bg-[var(--surface-0)] p-6">
        ${Card({
          title: "Welcome to lum-ui",
          children: `
            ${Button({ text: "Get Started", variant: "primary" })}
          `
        })}
        
        ${StatCard({
          label: "Total Users",
          value: "1,234",
          status: "online"
        })}
      </body>
    </html>
  `;
  
  return c.html(html);
});

Deno.serve(app.fetch);
```

## 📦 What's Included

### Components
- **UI Elements**: Button, Card, Badge, Alert, Input, Avatar, Spinner, Divider
- **Data Display**: Table, StatusBadge, ActivityList, RankedList
- **Layouts**: Grid, Section, Container, PageHeader, Stack, Flex

### Charts (Pure SVG)
- LineChart, BarChart, AreaChart
- DonutChart, GaugeChart
- Sparkline, ProgressBar
- TimeSeriesChart (with optional uPlot)

### Theme System
- Fully customizable with `createTheme()`
- CSS variables for runtime theming
- Tailwind integration out of the box
- Dark-first with gradient aesthetics

## 🛠️ Development

```bash
# Check types
deno task check

# Run tests
deno task test

# Generate showcase
deno task gen:showcase

# Publish to JSR
deno task publish
```

## 📄 License

MIT © [Aspect](https://github.com/ethanke/lum-ui)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

