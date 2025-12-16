// lum-ui - Design System Theme
// Fully customizable theme with sensible defaults

export interface ThemeConfig {
  // Brand colors
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    gradient?: {
      from: string;
      via?: string;
      to: string;
    };
  };
  // Surface colors (backgrounds)
  surface: {
    0: string; // Base background
    1: string; // Cards
    2: string; // Elevated elements
    3: string; // Hover states
  };
  // Text colors
  text: {
    primary: string;
    secondary: string;
    muted: string;
    subtle: string;
  };
  // Border colors
  border: {
    default: string;
    hover: string;
    focus: string;
  };
  // Status colors
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  // Radius
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

export interface Theme {
  config: ThemeConfig;
  cssVariables: string;
  tailwindConfig: string;
}

// Default dark theme with modern gradient aesthetic
export const defaultTheme: ThemeConfig = {
  brand: {
    primary: "#FF4D8D",
    secondary: "#8B5CF6",
    accent: "#FF8C00",
    gradient: {
      from: "#FF8C00",
      via: "#FF4D8D",
      to: "#8B5CF6",
    },
  },
  surface: {
    0: "#0A0A0F",
    1: "#12121A",
    2: "#1A1A24",
    3: "#24242F",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#D4D4D8",
    muted: "#A1A1AA",
    subtle: "#71717A",
  },
  border: {
    default: "rgba(255, 255, 255, 0.05)",
    hover: "rgba(255, 77, 141, 0.2)",
    focus: "#FF4D8D",
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
    info: "#06B6D4",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    full: "9999px",
  },
};

/**
 * Create a theme with custom configuration
 */
export function createTheme(config: Partial<ThemeConfig> = {}): Theme {
  const mergedConfig: ThemeConfig = {
    brand: { ...defaultTheme.brand, ...config.brand },
    surface: { ...defaultTheme.surface, ...config.surface },
    text: { ...defaultTheme.text, ...config.text },
    border: { ...defaultTheme.border, ...config.border },
    status: { ...defaultTheme.status, ...config.status },
    radius: { ...defaultTheme.radius, ...config.radius },
  };

  const cssVars = generateCssVariables(mergedConfig);
  const twConfig = generateTailwindConfig(mergedConfig);

  return {
    config: mergedConfig,
    cssVariables: cssVars,
    tailwindConfig: twConfig,
  };
}

function generateCssVariables(config: ThemeConfig): string {
  const gradientStr = config.brand.gradient
    ? `linear-gradient(135deg, ${config.brand.gradient.from} 0%, ${
        config.brand.gradient.via || config.brand.primary
      } 50%, ${config.brand.gradient.to} 100%)`
    : `linear-gradient(135deg, ${config.brand.primary} 0%, ${config.brand.secondary} 100%)`;

  return `
  :root {
    /* Brand colors */
    --brand-primary: ${config.brand.primary};
    --brand-secondary: ${config.brand.secondary};
    --brand-accent: ${config.brand.accent};
    
    /* Surface colors */
    --surface-0: ${config.surface[0]};
    --surface-1: ${config.surface[1]};
    --surface-2: ${config.surface[2]};
    --surface-3: ${config.surface[3]};
    
    /* Text colors */
    --text-primary: ${config.text.primary};
    --text-secondary: ${config.text.secondary};
    --text-muted: ${config.text.muted};
    --text-subtle: ${config.text.subtle};
    
    /* Border colors */
    --border-default: ${config.border.default};
    --border-hover: ${config.border.hover};
    --border-focus: ${config.border.focus};
    
    /* Status colors */
    --status-success: ${config.status.success};
    --status-warning: ${config.status.warning};
    --status-error: ${config.status.error};
    --status-info: ${config.status.info};
    
    /* Radius */
    --radius-sm: ${config.radius.sm};
    --radius-md: ${config.radius.md};
    --radius-lg: ${config.radius.lg};
    --radius-full: ${config.radius.full};
    
    /* Gradients */
    --gradient-brand: ${gradientStr};
    --gradient-subtle: linear-gradient(135deg, ${hexToRgba(
      config.brand.accent,
      0.1
    )} 0%, ${hexToRgba(config.brand.secondary, 0.1)} 100%);
    
    /* Shadows */
    --shadow-glow: 0 0 20px ${hexToRgba(config.brand.primary, 0.15)}, 0 0 40px ${hexToRgba(
      config.brand.secondary,
      0.1
    )};
    --shadow-glow-strong: 0 0 30px ${hexToRgba(config.brand.accent, 0.2)}, 0 0 60px ${hexToRgba(
      config.brand.secondary,
      0.15
    )};
  }
`;
}

function generateTailwindConfig(config: ThemeConfig): string {
  return `
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brand: {
            primary: '${config.brand.primary}',
            secondary: '${config.brand.secondary}',
            accent: '${config.brand.accent}',
          },
          surface: {
            0: '${config.surface[0]}',
            1: '${config.surface[1]}',
            2: '${config.surface[2]}',
            3: '${config.surface[3]}',
          },
        },
        backgroundImage: {
          'brand-gradient': 'var(--gradient-brand)',
          'brand-gradient-subtle': 'var(--gradient-subtle)',
        },
        boxShadow: {
          'brand-glow': 'var(--shadow-glow)',
          'brand-glow-strong': 'var(--shadow-glow-strong)',
        },
      }
    }
  }
`;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Pre-computed default values for convenience
const defaultThemeInstance: Theme = createTheme();
export const cssVariables: string = defaultThemeInstance.cssVariables;
export const tailwindConfig: string = defaultThemeInstance.tailwindConfig;

// Gradient presets using CSS variables
export const gradients: Record<string, string> = {
  brand: "from-[var(--brand-accent)] via-[var(--brand-primary)] to-[var(--brand-secondary)]",
  brandSubtle:
    "from-[var(--brand-accent)]/10 via-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10",
  dark: "from-[var(--surface-0)] to-[var(--surface-1)]",
  surface: "from-[var(--surface-1)]/50 to-[var(--surface-2)]/50",
  glow: "from-[var(--brand-primary)]/10 via-transparent to-transparent",
};

// Glass morphism utility
export const glass: Record<string, string> = {
  base: "bg-[var(--surface-1)]/70 backdrop-blur-xl border border-[var(--border-default)]",
  hover: "hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)]",
};

// Common effect classes
export const effects: Record<string, string> = {
  glow: "shadow-[var(--shadow-glow)]",
  glowStrong: "shadow-[var(--shadow-glow-strong)]",
  gradientText: "bg-[var(--gradient-brand)] bg-clip-text text-transparent",
  gradientBorder:
    "border border-transparent bg-gradient-to-r from-[var(--brand-accent)] via-[var(--brand-primary)] to-[var(--brand-secondary)]",
};
