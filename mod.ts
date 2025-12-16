// lum-ui - A Modern UI Component Library for Deno/HTMX/Alpine.js
// Server-side rendered components with template strings

export const VERSION = "0.1.0";

// Theme exports - Customizable design system
export {
  createTheme,
  cssVariables,
  defaultTheme,
  effects,
  glass,
  gradients,
  tailwindConfig,
} from "./src/theme.ts";

export type { Theme, ThemeConfig } from "./src/theme.ts";

// Icon exports
export { icon, icons } from "./src/icons.ts";

// Utility exports
export {
  escapeHtml,
  formatBytes,
  formatDuration,
  formatNumber,
  formatPercent,
  getStatusColor,
  pluralize,
  simpleHash,
  timeAgo,
  truncate,
} from "./src/utils.ts";

// Chart exports - SVG-based, no external dependencies
export {
  AreaChart,
  BarChart,
  ChartScripts,
  DonutChart,
  GaugeChart,
  LineChart,
  MetricCardWithTrend,
  ProgressBar,
  Sparkline,
  TimeSeriesChart,
} from "./src/charts.ts";

export type {
  AreaChartProps,
  BarChartProps,
  ChartDataPoint,
  ChartOptions,
  ChartSeries,
  DonutChartProps,
  GaugeChartProps,
  LineChartProps,
  MetricCardWithTrendProps,
  ProgressBarProps,
  SparklineProps,
} from "./src/charts.ts";

// Table exports
export { ActivityList, RankedList, StatusBadge, StatusDot, Table } from "./src/tables.ts";

export type {
  ActivityItem,
  ActivityListProps,
  RankedListProps,
  StatusBadgeProps,
  StatusDotProps,
  TableColumn,
  TableProps,
} from "./src/tables.ts";

// Component exports - Core UI building blocks
export {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Input,
  Spinner,
  StatCard,
} from "./src/components.ts";

export type {
  AlertProps,
  AvatarProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  InputProps,
  SpinnerProps,
  StatCardProps,
} from "./src/components.ts";

// Layout exports - Page structure components
export { Grid, Head, PageHeader, Section } from "./src/layouts.ts";

export type { HeadProps, PageHeaderProps } from "./src/layouts.ts";

// Metrics exports - Dashboard-specific components
export {
  AlertBanner,
  ChartCard,
  MetricCard,
  MetricGrid,
  ProgressRing,
  StatusIndicator,
  TimeRangeSelector,
} from "./src/metrics.ts";

export type {
  AlertBannerProps,
  ChartCardProps,
  MetricCardProps,
  MetricGridProps,
  ProgressRingProps,
  StatusIndicatorProps,
  TimeRangeSelectorProps,
} from "./src/metrics.ts";
