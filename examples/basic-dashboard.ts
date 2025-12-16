// Example: Basic Dashboard with lum-ui
// Run: deno run --allow-net examples/basic-dashboard.ts

import { Hono } from "jsr:@hono/hono@^4";
import {
  Button,
  Card,
  Grid,
  Head,
  MetricCard,
  PageHeader,
  Section,
  StatCard,
  StatusIndicator,
  DonutChart,
  AreaChart,
  ChartCard,
  Table,
  ActivityList,
  Badge,
} from "../mod.ts";

const app = new Hono();

// Sample data
const metrics = {
  users: { value: "12,847", trend: { direction: "up" as const, value: "+12%", positive: true } },
  revenue: { value: "$45.2k", trend: { direction: "up" as const, value: "+8%", positive: true } },
  orders: { value: "1,234", trend: { direction: "down" as const, value: "-3%", positive: false } },
  uptime: { value: "99.9%", trend: { direction: "flat" as const, value: "stable", positive: true } },
};

const chartData = [
  { label: "Mon", value: 120 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 150 },
  { label: "Thu", value: 220 },
  { label: "Fri", value: 280 },
  { label: "Sat", value: 240 },
  { label: "Sun", value: 190 },
];

const donutData = [
  { label: "Desktop", value: 45 },
  { label: "Mobile", value: 35 },
  { label: "Tablet", value: 20 },
];

const recentActivity = [
  { title: "New user signup", subtitle: "john@example.com", status: "success" as const, meta: "2m ago" },
  { title: "Order completed", subtitle: "Order #12345", status: "success" as const, meta: "5m ago" },
  { title: "Payment failed", subtitle: "Order #12340", status: "failure" as const, meta: "12m ago" },
  { title: "New review", subtitle: "5 stars ⭐", status: "success" as const, meta: "1h ago" },
];

const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active", plan: "Pro" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Active", plan: "Enterprise" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", status: "Pending", plan: "Free" },
];

app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      ${Head({ title: "Dashboard - lum-ui Example" })}
      <body class="bg-[var(--surface-0)] min-h-screen text-white">
        <div class="max-w-7xl mx-auto p-6 lg:p-8">
          ${PageHeader({
            title: "Dashboard",
            subtitle: "Welcome back! Here's what's happening.",
            actions: Button({ text: "New Report", variant: "primary", icon: "plus" }),
          })}

          <!-- Status -->
          <div class="flex items-center gap-6 mb-6">
            ${StatusIndicator({ status: "healthy", label: "All systems operational" })}
            ${Badge({ text: "v2.0.1", color: "brand" })}
          </div>

          <!-- Metrics Grid -->
          ${Grid(
            MetricCard({
              title: "Total Users",
              value: metrics.users.value,
              trend: metrics.users.trend,
              icon: "users",
              sparkline: [65, 59, 80, 81, 56, 55, 75, 90],
            }) +
            MetricCard({
              title: "Revenue",
              value: metrics.revenue.value,
              trend: metrics.revenue.trend,
              icon: "chart",
              color: "success",
            }) +
            MetricCard({
              title: "Orders",
              value: metrics.orders.value,
              trend: metrics.orders.trend,
              icon: "cube",
              color: "warning",
            }) +
            MetricCard({
              title: "Uptime",
              value: metrics.uptime.value,
              trend: metrics.uptime.trend,
              icon: "server",
            }),
            4
          )}

          <!-- Charts -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            ${ChartCard({
              title: "Weekly Traffic",
              subtitle: "Page views over the last 7 days",
              chart: AreaChart({ data: chartData, height: 200 }),
            })}
            ${ChartCard({
              title: "Traffic Sources",
              subtitle: "By device type",
              chart: DonutChart({ data: donutData, centerText: "100%", centerSubtext: "Total" }),
            })}
          </div>

          <!-- Two Column Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <!-- Recent Activity -->
            <div class="lg:col-span-2">
              ${Section(
                "Recent Activity",
                ActivityList({ items: recentActivity }),
                "Latest updates from your platform"
              )}
            </div>

            <!-- Quick Stats -->
            <div>
              ${Section(
                "Quick Stats",
                StatCard({ label: "Server Status", value: "Healthy", status: "online" }) +
                '<div class="mt-4">' +
                StatCard({ label: "API Latency", value: "45ms", subtext: "Last 5 minutes" }) +
                "</div>",
                "System health"
              )}
            </div>
          </div>

          <!-- Users Table -->
          ${Section(
            "Recent Users",
            Table({
              columns: [
                { key: "name", header: "Name" },
                { key: "email", header: "Email" },
                { key: "status", header: "Status", render: (v) => Badge({ text: v as string, color: v === "Active" ? "success" : "warning" }) },
                { key: "plan", header: "Plan", render: (v) => Badge({ text: v as string, color: "brand" }) },
              ],
              data: tableData,
            }),
            "Recently registered users"
          )}

          <!-- Cards Grid -->
          <div class="mt-6">
            ${PageHeader({ title: "Features", subtitle: "What makes lum-ui great" })}
            ${Grid(
              Card({
                title: "Zero Build Step",
                subtitle: "Template strings, no JSX required",
                icon: "⚡",
                children: "<p class='text-sm text-[var(--text-muted)]'>Write components as simple functions returning HTML strings.</p>",
              }) +
              Card({
                title: "HTMX Ready",
                subtitle: "Built-in HTMX support",
                icon: "🔌",
                children: "<p class='text-sm text-[var(--text-muted)]'>All components support hx-* attributes for dynamic updates.</p>",
              }) +
              Card({
                title: "Alpine.js Integration",
                subtitle: "Interactive by default",
                icon: "🏔️",
                children: "<p class='text-sm text-[var(--text-muted)]'>Components use Alpine.js for client-side interactivity.</p>",
              }) +
              Card({
                title: "Beautiful Theme",
                subtitle: "Modern gradient aesthetic",
                icon: "🎨",
                children: "<p class='text-sm text-[var(--text-muted)]'>Dark theme with CSS variables for full customization.</p>",
              }),
              4
            )}
          </div>

          <!-- Footer -->
          <footer class="mt-12 pt-6 border-t border-[var(--border-default)] text-center text-sm text-[var(--text-muted)]">
            <p>Built with lum-ui • <a href="https://github.com/aspect-build/lum-ui" class="text-[var(--brand-primary)] hover:underline">GitHub</a></p>
          </footer>
        </div>
      </body>
    </html>
  `);
});

Deno.serve({ port: 3000 }, app.fetch);
console.log("🚀 Dashboard running at http://localhost:3000");
