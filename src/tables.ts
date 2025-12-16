// lum-ui - Table Components
// Reusable table components for data display

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => string;
  class?: string;
  headerClass?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  class?: string;
  rowClass?: string | ((row: T) => string);
  onRowClick?: string; // Alpine.js handler
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  class: tableClass = "",
  rowClass = "",
}: TableProps<T>): string {
  if (data.length === 0) {
    return `<p class="text-[var(--text-subtle)] text-sm">${emptyMessage}</p>`;
  }

  const headerRow = columns
    .map(
      (col) =>
        `<th class="pb-2 font-medium ${col.headerClass || ""}">${col.header}</th>`
    )
    .join("");

  const bodyRows = data
    .map((row) => {
      const cells = columns
        .map((col) => {
          const value = row[col.key as keyof T];
          const rendered = col.render ? col.render(value, row) : String(value ?? "");
          return `<td class="py-2 ${col.class || ""}">${rendered}</td>`;
        })
        .join("");

      const rClass = typeof rowClass === "function" ? rowClass(row) : rowClass;
      return `<tr class="border-b border-[var(--border-default)] hover:bg-[var(--surface-2)]/50 ${rClass}">${cells}</tr>`;
    })
    .join("");

  return `
    <div class="overflow-x-auto">
      <table class="w-full text-sm ${tableClass}">
        <thead>
          <tr class="text-left text-[var(--text-subtle)] border-b border-[var(--border-default)]">
            ${headerRow}
          </tr>
        </thead>
        <tbody>
          ${bodyRows}
        </tbody>
      </table>
    </div>
  `;
}

// Status badge for tables
export interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
}

export function StatusBadge({ status, variant }: StatusBadgeProps): string {
  // Auto-detect variant if not provided
  const autoVariant =
    variant ||
    (status.toLowerCase().match(/ready|running|success|active|healthy|online/)
      ? "success"
      : status.toLowerCase().match(/pending|warning|degraded/)
      ? "warning"
      : status.toLowerCase().match(/failed|error|offline|notready/)
      ? "error"
      : "default");

  const colors = {
    success: "bg-[var(--status-success)]/20 text-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]/20 text-[var(--status-warning)]",
    error: "bg-[var(--status-error)]/20 text-[var(--status-error)]",
    info: "bg-[var(--status-info)]/20 text-[var(--status-info)]",
    default: "bg-[var(--surface-3)] text-[var(--text-secondary)]",
  };

  return `<span class="px-2 py-0.5 text-xs rounded-full ${colors[autoVariant]}">${status}</span>`;
}

// Status dot indicator
export interface StatusDotProps {
  status: "online" | "offline" | "warning" | "pending";
  pulse?: boolean;
}

export function StatusDot({ status, pulse = false }: StatusDotProps): string {
  const colors = {
    online: "bg-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]",
    offline: "bg-[var(--status-error)]",
    pending: "bg-[var(--text-subtle)]",
  };

  return `<span class="w-2 h-2 rounded-full ${colors[status]} ${
    pulse && status === "online" ? "animate-pulse" : ""
  }"></span>`;
}

// List item component for ranked lists (contributors, etc.)
export interface RankedListProps {
  items: { label: string; value: string | number; sublabel?: string }[];
  emptyMessage?: string;
}

export function RankedList({ items, emptyMessage = "No data" }: RankedListProps): string {
  if (items.length === 0) {
    return `<p class="text-[var(--text-subtle)] text-sm">${emptyMessage}</p>`;
  }

  return `
    <div class="space-y-2">
      ${items
        .map(
          (item, i) => `
        <div class="flex items-center justify-between p-2 rounded-md bg-[var(--surface-2)]/50">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--surface-3)] text-xs text-[var(--text-muted)]">${
              i + 1
            }</span>
            <div>
              <span class="text-white">${item.label}</span>
              ${
                item.sublabel
                  ? `<span class="text-[var(--text-subtle)] text-xs ml-2">${item.sublabel}</span>`
                  : ""
              }
            </div>
          </div>
          <span class="text-[var(--brand-primary)] font-mono">${item.value}</span>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

// Activity list for workflow runs, commits, etc.
export interface ActivityItem {
  title: string;
  subtitle?: string;
  timestamp?: string;
  status?: "success" | "failure" | "pending" | "running";
  meta?: string;
  href?: string;
}

export interface ActivityListProps {
  items: ActivityItem[];
  emptyMessage?: string;
  maxHeight?: string;
}

export function ActivityList({
  items,
  emptyMessage = "No activity",
  maxHeight = "max-h-80",
}: ActivityListProps): string {
  if (items.length === 0) {
    return `<p class="text-[var(--text-subtle)] text-sm">${emptyMessage}</p>`;
  }

  const statusColors = {
    success: "bg-[var(--status-success)]",
    failure: "bg-[var(--status-error)]",
    pending: "bg-[var(--text-subtle)]",
    running: "bg-[var(--brand-primary)] animate-pulse",
  };

  return `
    <div class="space-y-2 ${maxHeight} overflow-y-auto">
      ${items
        .map((item) => {
          const content = `
          <div class="flex items-center justify-between p-2 rounded-md bg-[var(--surface-2)]/50 hover:bg-[var(--surface-2)] transition-colors">
            <div class="flex items-center gap-3">
              ${
                item.status
                  ? `<span class="w-2 h-2 rounded-full ${statusColors[item.status]}"></span>`
                  : ""
              }
              <div>
                <p class="text-white text-sm">${item.title}</p>
                ${
                  item.subtitle
                    ? `<p class="text-[var(--text-subtle)] text-xs">${item.subtitle}</p>`
                    : ""
                }
              </div>
            </div>
            ${item.meta ? `<span class="text-[var(--text-muted)] text-sm">${item.meta}</span>` : ""}
          </div>
        `;
          return item.href
            ? `<a href="${item.href}" target="_blank" class="block">${content}</a>`
            : content;
        })
        .join("")}
    </div>
  `;
}
