// lum-ui - Chart Components
// SVG-based chart components for dashboards

// Line chart component
export interface LineChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  showDots?: boolean;
}

export function LineChart({
  data,
  width = 400,
  height = 120,
  color = "var(--brand-primary)",
  showDots = true,
}: LineChartProps): string {
  if (data.length === 0) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1 || 1)) * chartWidth + padding;
      const y = height - padding - (d.value / maxVal) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  const dots = showDots
    ? data
        .map((d, i) => {
          const x = (i / (data.length - 1 || 1)) * chartWidth + padding;
          const y = height - padding - (d.value / maxVal) * chartHeight;
          return `<circle cx="${x}" cy="${y}" r="3" fill="${color}" />`;
        })
        .join("")
    : "";

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full h-32">
      <polyline fill="none" stroke="${color}" stroke-width="2" points="${points}" />
      ${dots}
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${
    height - padding
  }" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    </svg>
    <div class="flex justify-between text-xs text-[var(--text-subtle)] mt-1 px-2">
      <span>${data[0]?.label || ""}</span>
      <span>${data[data.length - 1]?.label || ""}</span>
    </div>
  `;
}

// Bar chart component
export interface BarChartProps {
  data: { label: string | number; value: number }[];
  height?: number;
  color?: string;
  labels?: string[];
}

export function BarChart({
  data,
  height = 80,
  color = "var(--brand-primary)",
  labels,
}: BarChartProps): string {
  if (data.length === 0) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const maxVal = Math.max(...data.map((d) => d.value), 1);

  const bars = data
    .map((d) => {
      const h = Math.max((d.value / maxVal) * 100, 2);
      return `<div class="flex-1 bg-[${color}]/30 hover:bg-[${color}]/50 transition-colors rounded-t" style="height: ${h}%" title="${d.label} - ${d.value}"></div>`;
    })
    .join("");

  const labelHtml = labels
    ? `
    <div class="flex justify-between text-xs text-[var(--text-subtle)] mt-1">
      ${labels.map((l) => `<span>${l}</span>`).join("")}
    </div>
  `
    : "";

  return `
    <div class="flex items-end gap-0.5" style="height: ${height}px">
      ${bars}
    </div>
    ${labelHtml}
  `;
}

// Sparkline - minimal inline chart
export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  data,
  width = 80,
  height = 24,
  color = "var(--brand-primary)",
}: SparklineProps): string {
  if (data.length < 2) return "";

  const maxVal = Math.max(...data, 1);
  const minVal = Math.min(...data, 0);
  const range = maxVal - minVal || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return `
    <svg viewBox="0 0 ${width} ${height}" class="inline-block">
      <polyline fill="none" stroke="${color}" stroke-width="1.5" points="${points}" />
    </svg>
  `;
}

// Progress bar
export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "default" | "success" | "warning" | "error";
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({
  value,
  max = 100,
  color = "default",
  showLabel = false,
  size = "sm",
}: ProgressBarProps): string {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    default: "bg-[var(--brand-primary)]",
    success: "bg-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]",
    error: "bg-[var(--status-error)]",
  };

  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
  };

  return `
    <div class="w-full">
      <div class="w-full bg-[var(--surface-3)] rounded-full ${heights[size]}">
        <div class="${colors[color]} ${heights[size]} rounded-full transition-all duration-300" style="width: ${percentage}%"></div>
      </div>
      ${
        showLabel
          ? `<span class="text-xs text-[var(--text-muted)] mt-1">${Math.round(percentage)}%</span>`
          : ""
      }
    </div>
  `;
}

// Donut chart for resource distribution
export interface DonutChartProps {
  data: { label: string; value: number; color?: string }[];
  size?: number;
  strokeWidth?: number;
  showLegend?: boolean;
  centerText?: string;
  centerSubtext?: string;
}

const defaultColors = [
  "var(--brand-primary)",
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
];

export function DonutChart({
  data,
  size = 120,
  strokeWidth = 20,
  showLegend = true,
  centerText,
  centerSubtext,
}: DonutChartProps): string {
  if (data.length === 0) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const total = data.reduce((sum, d) => sum + d.value, 0);
  if (total === 0) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let currentOffset = 0;
  const segments = data.map((d, i) => {
    const percentage = d.value / total;
    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = -currentOffset;
    currentOffset += percentage * circumference;
    const color = d.color || defaultColors[i % defaultColors.length];

    return `<circle
      cx="${center}" cy="${center}" r="${radius}"
      fill="none" stroke="${color}" stroke-width="${strokeWidth}"
      stroke-dasharray="${strokeDasharray}"
      stroke-dashoffset="${strokeDashoffset}"
      transform="rotate(-90 ${center} ${center})"
      class="transition-all duration-300"
    />`;
  });

  const legend = showLegend
    ? `<div class="flex flex-wrap gap-2 mt-2 justify-center">
        ${data
          .map((d, i) => {
            const color = d.color || defaultColors[i % defaultColors.length];
            const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
            return `<span class="flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <span class="w-2 h-2 rounded-full" style="background: ${color}"></span>
            ${d.label} (${pct}%)
          </span>`;
          })
          .join("")}
      </div>`
    : "";

  return `
    <div class="flex flex-col items-center">
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="var(--surface-3)" stroke-width="${strokeWidth}" />
        ${segments.join("")}
        ${
          centerText
            ? `
          <text x="${center}" y="${center}" text-anchor="middle" dominant-baseline="central" class="fill-white text-lg font-bold">${centerText}</text>
          ${
            centerSubtext
              ? `<text x="${center}" y="${
                  center + 14
                }" text-anchor="middle" class="fill-[var(--text-subtle)] text-xs">${centerSubtext}</text>`
              : ""
          }
        `
            : ""
        }
      </svg>
      ${legend}
    </div>
  `;
}

// Gauge chart for percentage metrics
export interface GaugeChartProps {
  value: number;
  max?: number;
  size?: number;
  label?: string;
  color?: "default" | "success" | "warning" | "error" | "auto";
}

export function GaugeChart({
  value,
  max = 100,
  size = 100,
  label,
  color = "auto",
}: GaugeChartProps): string {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Auto color based on value
  let fillColor = "var(--brand-primary)";
  if (color === "auto") {
    if (percentage < 60) fillColor = "var(--status-success)";
    else if (percentage < 80) fillColor = "var(--status-warning)";
    else fillColor = "var(--status-error)";
  } else if (color === "success") fillColor = "var(--status-success)";
  else if (color === "warning") fillColor = "var(--status-warning)";
  else if (color === "error") fillColor = "var(--status-error)";

  const radius = (size - 12) / 2;
  const circumference = Math.PI * radius; // half circle
  const dashOffset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return `
    <div class="flex flex-col items-center">
      <svg viewBox="0 0 ${size} ${size / 2 + 10}" width="${size}" height="${size / 2 + 10}">
        <path
          d="M ${6} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}"
          fill="none" stroke="var(--surface-3)" stroke-width="8" stroke-linecap="round"
        />
        <path
          d="M ${6} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}"
          fill="none" stroke="${fillColor}" stroke-width="8" stroke-linecap="round"
          stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}"
          class="transition-all duration-500"
        />
        <text x="${center}" y="${
    size / 2 - 5
  }" text-anchor="middle" class="fill-white text-lg font-bold">${Math.round(percentage)}%</text>
      </svg>
      ${label ? `<span class="text-xs text-[var(--text-subtle)] -mt-1">${label}</span>` : ""}
    </div>
  `;
}

// Area chart for time series with fill
export interface AreaChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  showLabels?: boolean;
  fillOpacity?: number;
}

export function AreaChart({
  data,
  width = 400,
  height = 120,
  color = "var(--brand-primary)",
  showLabels = true,
  fillOpacity = 0.2,
}: AreaChartProps): string {
  if (data.length === 0) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * chartWidth + padding;
    const y = height - padding - (d.value / maxVal) * chartHeight;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - padding} L ${padding},${
    height - padding
  } Z`;

  const gradientId = `areaGradient-${Date.now().toString(36)}`;

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-full" style="height: ${height}px">
      <defs>
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="${fillOpacity}" />
          <stop offset="100%" stop-color="${color}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path d="${areaPath}" fill="url(#${gradientId})" />
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" />
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${
    height - padding
  }" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
    </svg>
    ${
      showLabels
        ? `<div class="flex justify-between text-xs text-[var(--text-subtle)] mt-1 px-2">
          <span>${data[0]?.label || ""}</span>
          <span>${data[data.length - 1]?.label || ""}</span>
        </div>`
        : ""
    }
  `;
}

// Metric card with trend indicator
export interface MetricCardWithTrendProps {
  label: string;
  value: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  status?: "online" | "warning" | "offline";
}

export function MetricCardWithTrend({
  label,
  value,
  trend = "stable",
  trendValue,
  status = "online",
}: MetricCardWithTrendProps): string {
  const statusColors = {
    online: "bg-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]",
    offline: "bg-[var(--status-error)]",
  };

  const trendIcons = {
    up: '<svg class="w-4 h-4 text-[var(--status-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>',
    down: '<svg class="w-4 h-4 text-[var(--status-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>',
    stable:
      '<svg class="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>',
  };

  return `
    <div class="p-4 rounded-xl bg-[var(--surface-2)] border border-[var(--border-default)]">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[var(--text-subtle)] text-sm">${label}</span>
        <span class="w-2 h-2 rounded-full ${statusColors[status]}"></span>
      </div>
      <div class="flex items-end gap-2">
        <span class="text-2xl font-bold text-white">${value}</span>
        ${
          trendValue
            ? `<span class="flex items-center gap-1 text-xs ${
                trend === "up"
                  ? "text-[var(--status-error)]"
                  : trend === "down"
                  ? "text-[var(--status-success)]"
                  : "text-[var(--text-muted)]"
              }">
            ${trendIcons[trend]}${trendValue}
          </span>`
            : ""
        }
      </div>
    </div>
  `;
}

// === uPlot Time Series Support ===

export interface ChartDataPoint {
  timestamp: number;
  value: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface ChartOptions {
  title?: string;
  height?: number;
  width?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  theme?: "dark" | "light";
}

const CHART_COLORS = [
  "var(--brand-primary)",
  "var(--brand-accent)",
  "var(--brand-secondary)",
  "#10B981",
  "#3B82F6",
];
let chartCounter = 0;
function chartId(): string {
  return `lum-chart-${++chartCounter}-${Date.now().toString(36)}`;
}

/** Include this in your page head to load uPlot */
export function ChartScripts(): string {
  return `<link rel="stylesheet" href="https://unpkg.com/uplot@1.6.30/dist/uPlot.min.css">
<script src="https://unpkg.com/uplot@1.6.30/dist/uPlot.iife.min.js"></script>`;
}

/** High-performance time series chart using uPlot */
export function TimeSeriesChart(series: ChartSeries[], options: ChartOptions = {}): string {
  if (!series.length || !series[0].data.length) {
    return '<div class="text-[var(--text-subtle)] text-sm">No data available</div>';
  }

  const id = chartId();
  const height = options.height ?? 300;
  const width = options.width ?? "100%";

  const timestamps = series[0].data.map((d) => d.timestamp);
  const values = series.map((s) => s.data.map((d) => d.value));
  const uData = JSON.stringify([timestamps, ...values]);

  const seriesConfig = series.map((s, i) => ({
    label: s.name,
    stroke: s.color || CHART_COLORS[i % CHART_COLORS.length],
    fill: (s.color || CHART_COLORS[i % CHART_COLORS.length]) + "20",
    width: 2,
  }));

  const legend =
    options.showLegend !== false
      ? series
          .map(
            (s, i) =>
              `<span class="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]"><span class="w-2 h-2 rounded-full" style="background:${
                s.color || CHART_COLORS[i % CHART_COLORS.length]
              }"></span>${s.name}</span>`
          )
          .join(" ")
      : "";

  return `
<div x-data="{ chart: null }" x-init="$nextTick(() => {
  const data = ${uData};
  const opts = {
    width: $el.querySelector('.chart-container').clientWidth,
    height: ${height},
    series: [
      {},
      ${seriesConfig.map((s) => JSON.stringify(s)).join(",\n      ")}
    ],
    scales: { x: { time: true } },
    axes: [
      { stroke: 'var(--text-subtle)', grid: { stroke: 'rgba(255,255,255,0.05)' } },
      { stroke: 'var(--text-subtle)', grid: { stroke: 'rgba(255,255,255,0.05)' } }
    ],
    cursor: { sync: { key: 'lum-sync' } }
  };
  chart = new uPlot(opts, data, $el.querySelector('.chart-container'));
  new ResizeObserver(() => chart.setSize({ width: $el.querySelector('.chart-container').clientWidth, height: ${height} })).observe($el);
})" id="${id}" class="w-full">
  ${options.title ? `<h4 class="text-sm font-medium text-[var(--text-muted)] mb-2">${options.title}</h4>` : ""}
  <div class="chart-container" style="width:${width};height:${height}px"></div>
  ${legend ? `<div class="flex gap-3 mt-2">${legend}</div>` : ""}
</div>`;
}
