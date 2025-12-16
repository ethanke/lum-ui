// lum-ui - Metrics Components
// Reusable components for dashboards and monitoring

import { icons } from "./icons.ts";
import { Sparkline } from "./charts.ts";

// ============================================
// MetricCard - Enhanced stat card with trends
// ============================================

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: "up" | "down" | "flat";
    value: string;
    positive?: boolean; // Is the trend direction good?
  };
  sparkline?: number[];
  icon?: keyof typeof icons;
  color?: "default" | "success" | "warning" | "danger";
  loading?: boolean;
  hxGet?: string;
  hxTrigger?: string;
  hxSwap?: string;
}

export function MetricCard(props: MetricCardProps): string {
  const {
    title,
    value,
    unit,
    trend,
    sparkline,
    icon,
    color = "default",
    loading = false,
    hxGet,
    hxTrigger,
    hxSwap = "outerHTML",
  } = props;

  const colorClasses = {
    default:
      "from-[var(--brand-accent)]/20 via-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 border-[var(--brand-primary)]/30",
    success: "from-[var(--status-success)]/20 to-[var(--status-success)]/10 border-[var(--status-success)]/30",
    warning: "from-[var(--status-warning)]/20 to-[var(--status-warning)]/10 border-[var(--status-warning)]/30",
    danger: "from-[var(--status-error)]/20 to-[var(--status-error)]/10 border-[var(--status-error)]/30",
  };

  const trendColor = trend
    ? trend.positive
      ? "text-[var(--status-success)]"
      : "text-[var(--status-error)]"
    : "text-[var(--text-muted)]";

  const trendIcon = trend
    ? trend.direction === "up"
      ? `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>`
      : trend.direction === "down"
      ? `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>`
      : `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>`
    : "";

  const htmxAttrs = hxGet
    ? `hx-get="${hxGet}" hx-trigger="${hxTrigger || "load, every 30s"}" hx-swap="${hxSwap}"`
    : "";

  return `
    <div class="bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl rounded-lg border p-4 relative overflow-hidden" ${htmxAttrs}>
      ${
        loading
          ? `<div class="absolute inset-0 bg-black/20 flex items-center justify-center"><div class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div></div>`
          : ""
      }
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <p class="text-[var(--text-muted)] text-sm mb-1">${title}</p>
          <div class="flex items-baseline gap-1">
            <span class="text-2xl font-bold text-white">${value}</span>
            ${unit ? `<span class="text-[var(--text-muted)] text-sm">${unit}</span>` : ""}
          </div>
          ${
            trend
              ? `
            <div class="flex items-center gap-1 mt-1 ${trendColor}">
              ${trendIcon}
              <span class="text-xs">${trend.value}</span>
            </div>
          `
              : ""
          }
        </div>
        ${icon ? `<div class="text-[var(--text-subtle)]">${icons[icon]}</div>` : ""}
      </div>
      ${
        sparkline
          ? `<div class="mt-3 -mx-1">${Sparkline({ data: sparkline, height: 30 })}</div>`
          : ""
      }
    </div>
  `;
}

// ============================================
// MetricGrid - Grid layout for metrics
// ============================================

export interface MetricGridProps {
  children: string;
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

export function MetricGrid(props: MetricGridProps): string {
  const { children, columns = 4, gap = "md" } = props;

  const colClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return `<div class="grid ${colClasses[columns]} ${gapClasses[gap]}">${children}</div>`;
}

// ============================================
// ChartCard - Chart with container
// ============================================

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  chart: string;
  actions?: string;
  loading?: boolean;
  hxGet?: string;
  hxTrigger?: string;
}

export function ChartCard(props: ChartCardProps): string {
  const { title, subtitle, chart, actions, loading = false, hxGet, hxTrigger } = props;

  const htmxAttrs = hxGet
    ? `hx-get="${hxGet}" hx-trigger="${
        hxTrigger || "load"
      }" hx-swap="innerHTML" hx-target="find .chart-container"`
    : "";

  return `
    <div class="bg-[var(--surface-1)]/50 rounded-lg border border-[var(--border-default)] p-6" ${htmxAttrs}>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-white">${title}</h3>
          ${subtitle ? `<p class="text-[var(--text-muted)] text-sm">${subtitle}</p>` : ""}
        </div>
        ${actions ? `<div class="flex gap-2">${actions}</div>` : ""}
      </div>
      <div class="chart-container relative">
        ${
          loading
            ? `<div class="absolute inset-0 flex items-center justify-center"><div class="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></div></div>`
            : ""
        }
        ${chart}
      </div>
    </div>
  `;
}

// ============================================
// TimeRangeSelector - Time range buttons
// ============================================

export interface TimeRangeSelectorProps {
  selected: "1h" | "6h" | "24h" | "7d" | "30d";
  paramName?: string;
  hxGet?: string;
}

export function TimeRangeSelector(props: TimeRangeSelectorProps): string {
  const { selected, paramName = "range", hxGet } = props;
  const ranges = ["1h", "6h", "24h", "7d", "30d"];

  return `
    <div class="flex gap-1 bg-[var(--surface-2)]/50 rounded-lg p-1">
      ${ranges
        .map((range) => {
          const isSelected = range === selected;
          const htmxAttrs = hxGet
            ? `hx-get="${hxGet}" hx-vals='{"${paramName}": "${range}"}' hx-swap="outerHTML" hx-target="closest .chart-container"`
            : "";
          return `
          <button 
            class="px-3 py-1 rounded text-sm transition-colors ${
              isSelected
                ? "bg-[var(--brand-primary)] text-white"
                : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--surface-3)]"
            }"
            ${htmxAttrs}
          >${range}</button>
        `;
        })
        .join("")}
    </div>
  `;
}

// ============================================
// StatusIndicator - Health status dot
// ============================================

export interface StatusIndicatorProps {
  status: "healthy" | "degraded" | "down" | "unknown";
  label?: string;
  pulse?: boolean;
}

export function StatusIndicator(props: StatusIndicatorProps): string {
  const { status, label, pulse = true } = props;

  const colors = {
    healthy: "bg-[var(--status-success)]",
    degraded: "bg-[var(--status-warning)]",
    down: "bg-[var(--status-error)]",
    unknown: "bg-[var(--text-subtle)]",
  };

  const labels = {
    healthy: "Healthy",
    degraded: "Degraded",
    down: "Down",
    unknown: "Unknown",
  };

  return `
    <div class="flex items-center gap-2">
      <span class="relative flex h-2.5 w-2.5">
        ${
          pulse && status === "healthy"
            ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full ${colors[status]} opacity-75"></span>`
            : ""
        }
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 ${colors[status]}"></span>
      </span>
      <span class="text-sm text-[var(--text-secondary)]">${label || labels[status]}</span>
    </div>
  `;
}

// ============================================
// ProgressRing - Circular progress indicator
// ============================================

export interface ProgressRingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  showValue?: boolean;
}

export function ProgressRing(props: ProgressRingProps): string {
  const {
    value,
    max = 100,
    size = "md",
    color = "var(--brand-primary)",
    label,
    showValue = true,
  } = props;

  const sizes = { sm: 48, md: 64, lg: 96 };
  const strokeWidths = { sm: 4, md: 6, lg: 8 };

  const s = sizes[size];
  const sw = strokeWidths[size];
  const r = (s - sw) / 2;
  const c = Math.PI * 2 * r;
  const percent = Math.min(value / max, 1);
  const offset = c * (1 - percent);

  return `
    <div class="relative inline-flex items-center justify-center">
      <svg width="${s}" height="${s}" class="-rotate-90">
        <circle cx="${s / 2}" cy="${
    s / 2
  }" r="${r}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="${sw}"/>
        <circle cx="${s / 2}" cy="${
    s / 2
  }" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" 
                stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
                class="transition-all duration-500"/>
      </svg>
      ${
        showValue
          ? `<span class="absolute text-white font-semibold ${
              size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-lg"
            }">${Math.round(percent * 100)}%</span>`
          : ""
      }
      ${label ? `<span class="absolute -bottom-5 text-xs text-[var(--text-muted)]">${label}</span>` : ""}
    </div>
  `;
}

// ============================================
// AlertBanner - Alert/warning banner
// ============================================

export interface AlertBannerProps {
  severity: "info" | "warning" | "critical";
  title: string;
  message?: string;
  action?: { label: string; href: string };
  dismissible?: boolean;
}

export function AlertBanner(props: AlertBannerProps): string {
  const { severity, title, message, action, dismissible = false } = props;

  const styles = {
    info: "bg-[var(--status-info)]/10 border-[var(--status-info)]/30 text-[var(--status-info)]",
    warning: "bg-[var(--status-warning)]/10 border-[var(--status-warning)]/30 text-[var(--status-warning)]",
    critical: "bg-[var(--status-error)]/10 border-[var(--status-error)]/30 text-[var(--status-error)]",
  };

  const iconMap = {
    info: icons.info,
    warning: icons.exclamation,
    critical: icons.exclamationCircle,
  };

  return `
    <div class="rounded-lg border p-4 ${styles[severity]}" x-data="{ show: true }" x-show="show">
      <div class="flex items-start gap-3">
        ${iconMap[severity]}
        <div class="flex-1">
          <p class="font-medium">${title}</p>
          ${message ? `<p class="text-sm opacity-80 mt-1">${message}</p>` : ""}
          ${
            action
              ? `<a href="${action.href}" class="inline-block mt-2 text-sm underline hover:no-underline">${action.label}</a>`
              : ""
          }
        </div>
        ${
          dismissible
            ? `<button @click="show = false" class="opacity-60 hover:opacity-100">${icons.x}</button>`
            : ""
        }
      </div>
    </div>
  `;
}
