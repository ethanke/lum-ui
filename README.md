# lum-ui

A modern, production-ready UI component library for **Deno + HTMX + Alpine.js** server-side rendered applications.

[![JSR](https://jsr.io/badges/@aspect/lum-ui)](https://jsr.io/@aspect/lum-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎨 **Beautiful Dark Theme** - Modern gradient aesthetic with full customization
- 🚀 **Zero Build Step** - Template string components, no JSX required
- 📦 **No External Dependencies** - Pure TypeScript, SVG-based charts
- 🔌 **HTMX Ready** - Built-in support for HTMX attributes
- 🏔️ **Alpine.js Integration** - Interactive components with Alpine.js
- 🎯 **Type-Safe** - Full TypeScript support with exported types
- 📊 **Dashboard Components** - Charts, metrics, tables, and more
- 🖌️ **Customizable Theming** - CSS variables for full control

## Quick Start

### Deno

```typescript
import { Button, Card, Head, Grid } from "jsr:@aspect/lum-ui";

// In your route handler
function HomePage() {
  return `
    <!DOCTYPE html>
    <html>
      ${Head({ title: "My App" })}
      <body class="bg-[var(--surface-0)] min-h-screen">
        ${Grid(
          Card({ title: "Hello", children: "World!" }) +
          Card({ title: "Welcome", children: Button({ text: "Click me" }) })
        , 2)}
      </body>
    </html>
  `;
}
```

### With Hono

```typescript
import { Hono } from "hono";
import { Head, Button, Card, Grid, PageHeader } from "jsr:@aspect/lum-ui";

const app = new Hono();

app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      ${Head({ title: "Dashboard" })}
      <body class="bg-[var(--surface-0)] min-h-screen p-8">
        ${PageHeader({ title: "Dashboard", subtitle: "Welcome back!" })}
        ${Grid(
          Card({ 
            title: "Users", 
            children: '<span class="text-2xl font-bold">1,234</span>' 
          }) +
          Card({ 
            title: "Revenue", 
            children: '<span class="text-2xl font-bold">$12.3k</span>' 
          })
        , 2)}
      </body>
    </html>
  `);
});
```

## Installation

### JSR (Recommended)

```typescript
// deno.json
{
  "imports": {
    "lum-ui": "jsr:@aspect/lum-ui@^0.1.0"
  }
}
```

### Direct Import

```typescript
import { Button, Card } from "https://jsr.io/@aspect/lum-ui/0.1.0/mod.ts";
```

## Components

### Core Components

| Component | Description |
|-----------|-------------|
| `Button` | Primary, secondary, ghost, danger, success variants |
| `Card` | Container with optional title, subtitle, icon, status |
| `StatCard` | Quick stats with optional status indicator |
| `Badge` | Labels with color variants |
| `Alert` | Success, warning, error, info alerts |
| `Input` | Form inputs with labels, icons, validation |
| `Avatar` | User avatars with fallback initials |
| `Spinner` | Loading indicators |
| `Divider` | Horizontal dividers with optional text |

### Chart Components

| Component | Description |
|-----------|-------------|
| `LineChart` | Simple line charts |
| `BarChart` | Bar charts |
| `AreaChart` | Area charts with gradient fills |
| `DonutChart` | Donut/pie charts |
| `GaugeChart` | Gauge/meter charts |
| `Sparkline` | Inline mini charts |
| `ProgressBar` | Progress indicators |
| `TimeSeriesChart` | High-performance time series (uPlot) |

### Table Components

| Component | Description |
|-----------|-------------|
| `Table` | Generic data tables |
| `StatusBadge` | Auto-colored status badges |
| `StatusDot` | Status indicator dots |
| `RankedList` | Numbered/ranked lists |
| `ActivityList` | Activity feeds |

### Layout Components

| Component | Description |
|-----------|-------------|
| `Head` | HTML head with all dependencies |
| `Grid` | Responsive grid layout |
| `Section` | Content sections |
| `PageHeader` | Page titles with actions |
| `Container` | Max-width containers |
| `Stack` | Vertical stacking |

### Metrics Components

| Component | Description |
|-----------|-------------|
| `MetricCard` | Stats with trends and sparklines |
| `MetricGrid` | Grid layout for metrics |
| `ChartCard` | Charts with titles/actions |
| `TimeRangeSelector` | Time range buttons |
| `StatusIndicator` | Health status dots |
| `ProgressRing` | Circular progress |
| `AlertBanner` | Warning banners |

## Theming

### Default Theme

lum-ui comes with a beautiful dark theme out of the box:

```typescript
import { cssVariables, tailwindConfig } from "lum-ui";
```

### Custom Theme

Create your own theme:

```typescript
import { createTheme, Head } from "lum-ui";

const myTheme = createTheme({
  brand: {
    primary: "#3B82F6",    // Blue
    secondary: "#8B5CF6",  // Purple
    accent: "#F59E0B",     // Amber
  },
  surface: {
    0: "#000000",
    1: "#111111",
    2: "#1a1a1a",
    3: "#262626",
  },
});

// Use in your head
Head({
  title: "My App",
  cssVariablesOverride: myTheme.cssVariables,
  tailwindConfigOverride: myTheme.tailwindConfig,
});
```

### CSS Variables

All colors are available as CSS variables:

```css
/* Brand colors */
--brand-primary
--brand-secondary
--brand-accent

/* Surfaces */
--surface-0 (base)
--surface-1 (cards)
--surface-2 (elevated)
--surface-3 (hover)

/* Text */
--text-primary
--text-secondary
--text-muted
--text-subtle

/* Status */
--status-success
--status-warning
--status-error
--status-info

/* Borders */
--border-default
--border-hover
--border-focus

/* Effects */
--shadow-glow
--gradient-brand
```

## HTMX Integration

Components support HTMX attributes:

```typescript
import { MetricCard, Button } from "lum-ui";

// Auto-refreshing metric card
MetricCard({
  title: "Active Users",
  value: "1,234",
  hxGet: "/api/metrics/users",
  hxTrigger: "load, every 30s",
});

// Button with HTMX
Button({
  text: "Load More",
  onClick: "htmx.ajax('GET', '/api/items')",
});
```

## Alpine.js Integration

Interactive components use Alpine.js:

```typescript
import { Alert } from "lum-ui";

// Dismissible alert
Alert({
  type: "success",
  message: "Operation completed!",
  dismissible: true, // Uses x-data and x-show
});
```

## Utilities

```typescript
import {
  timeAgo,
  formatBytes,
  formatDuration,
  formatNumber,
  formatPercent,
  truncate,
  pluralize,
  getStatusColor,
  escapeHtml,
} from "lum-ui";

timeAgo(new Date("2024-01-01"));  // "11mo ago"
formatBytes(1024 * 1024);         // "1 MB"
formatDuration(3661);             // "1h 1m"
formatNumber(1234567);            // "1,234,567"
formatPercent(75, 100);           // "75%"
truncate("Long text...", 10);     // "Long tex…"
pluralize(5, "item");             // "items"
getStatusColor("running");        // "success"
```

## Icons

50+ Heroicons-style SVG icons:

```typescript
import { icons, icon } from "lum-ui";

// Direct use
icons.home;
icons.chart;
icons.user;

// Sized icons
icon("home", "sm");  // 16px
icon("home", "md");  // 20px
icon("home", "lg");  // 24px
```

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Dependencies (CDN)

The `Head` component automatically loads:
- Tailwind CSS (CDN)
- Alpine.js (CDN)
- HTMX (CDN)

For offline use, self-host these dependencies.

## Contributing

Contributions welcome! Please read our contributing guidelines.

## License

MIT © [Aspect](https://github.com/aspect-build)

---

Built with ❤️ for the Deno community
