// lum-ui - Reusable UI Components
// Template string components for server-side rendering

import { icons } from "./icons.ts";

// Button variants
export interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  icon?: keyof typeof icons;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: string;
  href?: string;
  class?: string;
}

export function Button(props: ButtonProps): string {
  const {
    text,
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    fullWidth = false,
    disabled = false,
    type = "button",
    onClick,
    href,
    class: extraClass = "",
  } = props;

  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--surface-0)]";

  const variantClasses = {
    primary:
      "bg-[var(--gradient-brand)] text-white hover:brightness-110 focus:ring-[var(--brand-primary)] shadow-[var(--shadow-glow)]",
    secondary:
      "bg-[var(--surface-2)] text-white hover:bg-[var(--surface-3)] focus:ring-[var(--brand-primary)]/50 border border-[var(--border-default)] hover:border-[var(--border-hover)]",
    ghost: "text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface-2)] focus:ring-[var(--brand-primary)]/50",
    danger: "bg-[var(--status-error)] text-white hover:brightness-110 focus:ring-[var(--status-error)]",
    success: "bg-[var(--status-success)] text-white hover:brightness-110 focus:ring-[var(--status-success)]",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  const iconHtml = icon ? icons[icon] : "";
  const content = iconPosition === "left" ? `${iconHtml}${text}` : `${text}${iconHtml}`;

  if (href) {
    return `<a href="${href}" class="${classes}">${content}</a>`;
  }

  return `<button type="${type}" ${onClick ? `@click="${onClick}"` : ""} ${
    disabled ? "disabled" : ""
  } class="${classes}">${content}</button>`;
}

// Card component
export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  status?: { text: string; color: "success" | "warning" | "error" | "info" };
  children: string;
  href?: string;
  class?: string;
}

export function Card(props: CardProps): string {
  const { title, subtitle, icon, status, children, href, class: extraClass = "" } = props;

  const statusColors = {
    success: "bg-[var(--status-success)]/20 text-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]/20 text-[var(--status-warning)]",
    error: "bg-[var(--status-error)]/20 text-[var(--status-error)]",
    info: "bg-[var(--status-info)]/20 text-[var(--status-info)]",
  };

  const content = `
    <div class="bg-[var(--surface-1)]/70 backdrop-blur-xl rounded-md p-5 border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)] transition-all duration-200 ${extraClass}">
      ${
        title || icon || status
          ? `
        <div class="flex items-start justify-between mb-4">
          ${
            icon
              ? `<div class="w-10 h-10 bg-[var(--gradient-brand)]/20 rounded-md flex items-center justify-center text-[var(--brand-primary)]">${icon}</div>`
              : ""
          }
          ${
            status
              ? `<span class="px-2.5 py-1 ${statusColors[status.color]} text-xs font-medium rounded-full">${status.text}</span>`
              : ""
          }
        </div>
      `
          : ""
      }
      ${title ? `<h3 class="font-semibold text-white mb-1">${title}</h3>` : ""}
      ${subtitle ? `<p class="text-[var(--text-muted)] text-sm mb-3">${subtitle}</p>` : ""}
      ${children}
    </div>
  `;

  return href ? `<a href="${href}" class="block">${content}</a>` : content;
}

// Stat card
export interface StatCardProps {
  label: string;
  value: string;
  subtext?: string;
  status?: "online" | "offline" | "warning";
}

export function StatCard({ label, value, subtext, status }: StatCardProps): string {
  const statusIndicator = status
    ? `
    <span class="w-2.5 h-2.5 rounded-full ${
      status === "online"
        ? "bg-[var(--status-success)] animate-pulse"
        : status === "warning"
        ? "bg-[var(--status-warning)]"
        : "bg-[var(--status-error)]"
    }"></span>
  `
    : "";

  return `
    <div class="bg-[var(--surface-1)]/70 backdrop-blur-xl rounded-md p-5 border border-[var(--border-default)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)] transition-all duration-200">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[var(--text-muted)] text-sm font-medium">${label}</span>
        ${statusIndicator}
      </div>
      <p class="text-2xl font-bold text-white">${value}</p>
      ${subtext ? `<p class="text-[var(--text-subtle)] text-sm mt-1">${subtext}</p>` : ""}
    </div>
  `;
}

// Alert/Banner
export interface AlertProps {
  type: "success" | "warning" | "error" | "info";
  title?: string;
  message: string;
  dismissible?: boolean;
}

export function Alert({ type, title, message, dismissible }: AlertProps): string {
  const styles = {
    success: {
      bg: "bg-[var(--status-success)]/10",
      border: "border-[var(--status-success)]/30",
      text: "text-[var(--status-success)]",
      icon: icons.check,
    },
    warning: {
      bg: "bg-[var(--status-warning)]/10",
      border: "border-[var(--status-warning)]/30",
      text: "text-[var(--status-warning)]",
      icon: icons.exclamation,
    },
    error: {
      bg: "bg-[var(--status-error)]/10",
      border: "border-[var(--status-error)]/30",
      text: "text-[var(--status-error)]",
      icon: icons.exclamation,
    },
    info: {
      bg: "bg-[var(--status-info)]/10",
      border: "border-[var(--status-info)]/30",
      text: "text-[var(--status-info)]",
      icon: icons.info,
    },
  };

  const { bg, border, text, icon } = styles[type];

  return `
    <div class="${bg} ${border} border rounded-md p-4 flex items-start gap-3" ${
    dismissible ? 'x-data="{ show: true }" x-show="show"' : ""
  }>
      <div class="${text}">${icon}</div>
      <div class="flex-1">
        ${title ? `<p class="font-medium ${text}">${title}</p>` : ""}
        <p class="text-[var(--text-secondary)] text-sm">${message}</p>
      </div>
      ${
        dismissible
          ? `<button @click="show = false" class="text-[var(--text-subtle)] hover:text-[var(--text-secondary)]">${icons.x}</button>`
          : ""
      }
    </div>
  `;
}

// Badge
export interface BadgeProps {
  text: string;
  color?: "default" | "success" | "warning" | "error" | "info" | "brand";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({ text, color = "default", size = "sm", dot }: BadgeProps): string {
  const colors = {
    default: "bg-[var(--surface-3)] text-[var(--text-secondary)]",
    success: "bg-[var(--status-success)]/20 text-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]/20 text-[var(--status-warning)]",
    error: "bg-[var(--status-error)]/20 text-[var(--status-error)]",
    info: "bg-[var(--status-info)]/20 text-[var(--status-info)]",
    brand: "bg-[var(--gradient-brand)]/20 text-[var(--brand-primary)]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return `
    <span class="inline-flex items-center gap-1.5 ${colors[color]} ${sizes[size]} font-medium rounded-full">
      ${dot ? `<span class="w-1.5 h-1.5 rounded-full bg-current"></span>` : ""}
      ${text}
    </span>
  `;
}

// Input
export interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  icon?: keyof typeof icons;
  class?: string;
  helpText?: string;
  error?: string;
}

export function Input(props: InputProps): string {
  const {
    name,
    type = "text",
    placeholder,
    label,
    required,
    disabled,
    value,
    icon,
    class: extraClass = "",
    helpText,
    error,
  } = props;

  const hasError = !!error;

  return `
    <div class="space-y-1.5">
      ${
        label
          ? `<label for="${name}" class="block text-sm font-medium text-[var(--text-secondary)]">${label}${
              required ? '<span class="text-[var(--status-error)] ml-1">*</span>' : ""
            }</label>`
          : ""
      }
      <div class="relative">
        ${
          icon
            ? `<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-subtle)]">${icons[icon]}</div>`
            : ""
        }
        <input 
          type="${type}"
          name="${name}"
          id="${name}"
          ${placeholder ? `placeholder="${placeholder}"` : ""}
          ${required ? "required" : ""}
          ${disabled ? "disabled" : ""}
          ${value ? `value="${value}"` : ""}
          class="w-full bg-[var(--surface-0)] border ${
            hasError ? "border-[var(--status-error)]" : "border-[var(--border-default)]"
          } rounded-md px-4 py-2.5 text-white placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 ${
    hasError ? "focus:ring-[var(--status-error)]/30" : "focus:ring-[var(--brand-primary)]/30"
  } focus:border-[var(--brand-primary)] transition-all ${icon ? "pl-10" : ""} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  } ${extraClass}"
        />
      </div>
      ${helpText && !error ? `<p class="text-[var(--text-subtle)] text-sm">${helpText}</p>` : ""}
      ${error ? `<p class="text-[var(--status-error)] text-sm">${error}</p>` : ""}
    </div>
  `;
}

// Spinner
export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Spinner({ size = "md", text }: SpinnerProps): string {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return `
    <div class="flex flex-col items-center justify-center gap-3">
      <svg class="animate-spin ${sizes[size]} text-[var(--brand-primary)]" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      ${text ? `<p class="text-[var(--text-muted)] text-sm">${text}</p>` : ""}
    </div>
  `;
}

// Avatar
export interface AvatarProps {
  name?: string;
  email?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({ name, email, src, size = "md" }: AvatarProps): string {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const initial = (name?.[0] || email?.[0] || "?").toUpperCase();

  if (src) {
    return `<img src="${src}" alt="${name || "Avatar"}" class="${sizes[size]} rounded-full object-cover" />`;
  }

  return `
    <div class="${sizes[size]} rounded-full bg-[var(--gradient-brand)] flex items-center justify-center font-bold text-white shadow-[var(--shadow-glow)]">
      ${initial}
    </div>
  `;
}

// Divider
export function Divider(text?: string): string {
  if (text) {
    return `
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-[var(--border-default)]"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 bg-[var(--surface-1)] text-[var(--text-subtle)]">${text}</span>
        </div>
      </div>
    `;
  }
  return `<div class="border-t border-[var(--border-default)] my-6"></div>`;
}
