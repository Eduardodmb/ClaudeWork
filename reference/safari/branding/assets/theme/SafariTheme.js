/**
 * Safari Brand Theme
 * Official theme configuration for Safari Circuits applications
 * 
 * This is the single source of truth for all Safari branding and styling.
 * Import this into your application to ensure consistent design across products.
 * 
 * @example
 * import SafariTheme from './brand-assets/theme/SafariTheme.js';
 * 
 * const MyComponent = () => (
 *   <div style={{
 *     ...SafariTheme.backgrounds.circuit,
 *     color: SafariTheme.colors.text.primary
 *   }}>
 *     Content
 *   </div>
 * );
 */

export const SafariTheme = {
  /**
   * Brand Colors
   * Primary brand colors and variations
   */
  colors: {
    brand: {
      primary: '#9B1C1C',
      red: '#9B1C1C',
      redDark: '#7f1d1d',
      redLight: '#dc2626'
    },
    
    /**
     * Background Colors
     * For dark theme applications with elevation system
     */
    background: {
      dark: '#0f172a',           // Primary dark background (base)
      surface: '#1e293b',        // Cards, panels (dp4 elevation)
      elevated: '#243044',       // Modals, dropdowns (dp8 elevation)
      dialog: '#2e3a54',         // Dialogs, menus (dp16 elevation)
      // Legacy aliases for backward compatibility
      darkSecondary: '#1e293b',
      darkTertiary: '#334155'
    },
    
    /**
     * Technical Accent Colors
     * Use for data visualization, status indicators, and UI accents
     */
    accent: {
      blue: '#60a5fa',    // Data, information, links, via/pads
      green: '#34d399',   // Success, active, positive metrics
      pink: '#f472b6',    // Highlights, creative content
      purple: '#a78bfa',  // Special features, premium content
      amber: '#fbbf24'    // Warnings, attention, pending items
    },
    
    /**
     * Text Colors
     * Hierarchy for dark backgrounds (WCAG AA compliant)
     */
    text: {
      primary: '#f8fafc',    // Primary text (softer white, less eye strain)
      secondary: '#94a3b8',  // Secondary text, descriptions
      muted: '#64748b',      // Muted text, hints, captions
      disabled: '#475569',   // Disabled states
      // Legacy alias
      tertiary: '#64748b'
    },
    
    /**
     * Border Colors
     */
    border: {
      default: '#334155',  // Default borders
      accent: '#9B1C1C'    // Accent borders, focus states
    },
    
    /**
     * Circuit Pattern Colors
     * Colors used in background patterns
     */
    circuit: {
      trace: 'rgba(148, 163, 184, 0.08)',   // Circuit traces
      node: 'rgba(148, 163, 184, 0.12)',    // Diamond nodes
      via: 'rgba(96, 165, 250, 0.15)'       // Via/pad accents
    }
  },
  
  /**
   * Background Patterns
   * Pre-configured backgrounds with circuit patterns
   */
  backgrounds: {
    /**
     * Circuit pattern on dark background (recommended)
     */
    circuit: {
      backgroundColor: '#0f172a',
      backgroundImage: 'url(/brand-assets/patterns/safari-circuit-board-pattern.svg)',
      backgroundRepeat: 'repeat',
      backgroundSize: '400px 400px'
    },
    
    /**
     * Circuit pattern on red background
     */
    circuitRed: {
      backgroundColor: '#9B1C1C',
      backgroundImage: 'url(/brand-assets/patterns/safari-circuit-board-pattern.svg)',
      backgroundRepeat: 'repeat',
      backgroundSize: '400px 400px'
    },
    
    /**
     * Red circuit pattern on light background
     */
    circuitLight: {
      backgroundColor: '#ffffff',
      backgroundImage: 'url(/brand-assets/patterns/safari-circuit-board-pattern-red.svg)',
      backgroundRepeat: 'repeat',
      backgroundSize: '400px 400px'
    },
    
    /**
     * Solid dark background (no pattern)
     */
    solid: {
      backgroundColor: '#0f172a'
    }
  },
  
  /**
   * Typography
   * Font families and sizes
   */
  typography: {
    fontFamily: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'IBM Plex Mono', 'Courier New', monospace"
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem',// 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem'  // 60px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },
  
  /**
   * Spacing Scale
   * Based on 8px grid (0.5rem = 8px)
   */
  spacing: {
    0: '0',
    1: '0.5rem',   // 8px
    2: '1rem',     // 16px
    3: '1.5rem',   // 24px
    4: '2rem',     // 32px
    5: '2.5rem',   // 40px
    6: '3rem',     // 48px
    8: '4rem',     // 64px
    10: '5rem',    // 80px
    12: '6rem',    // 96px
    16: '8rem'     // 128px
  },
  
  /**
   * Border Radius
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px'
  },
  
  /**
   * Shadows
   */
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glowRed: '0 0 20px rgba(155, 28, 28, 0.5)',
    glowBlue: '0 0 20px rgba(96, 165, 250, 0.5)'
  },
  
  /**
   * Gradients
   */
  gradients: {
    primary: 'linear-gradient(135deg, #9B1C1C 0%, #dc2626 100%)',
    darkToLight: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
    accent: 'linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)'
  },
  
  /**
   * Transitions
   */
  transitions: {
    fast: 'all 0.15s ease',
    base: 'all 0.2s ease',
    slow: 'all 0.3s ease'
  },
  
  /**
   * Z-Index Scale
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600
  },
  
  /**
   * Breakpoints (for responsive design)
   */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

export default SafariTheme;
