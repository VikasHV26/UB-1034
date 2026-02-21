/**
 * BLOODLINK - PROFESSIONAL COLOR THEME & CSS INTEGRATION
 * =====================================================
 * 
 * This document outlines the complete professional styling system
 * implemented for the BloodLink application.
 */

// ==========================
// COLOR PALETTE
// ==========================

const colorPalette = {
  primary: '#dc2626',        // Blood Red
  primaryDark: '#991b1b',    // Dark Blood Red
  primaryLight: '#fecaca',   // Light Blood Red
  
  success: '#16a34a',        // Green
  warning: '#ea580c',        // Orange
  danger: '#dc2626',         // Red
  info: '#0284c7',           // Blue
  
  background: '#f9fafb',     // Light Gray
  surface: '#ffffff',        // White
  surfaceLight: '#f3f4f6',   // Very Light Gray
  
  text: '#1f2937',           // Dark Gray
  textLight: '#6b7280',      // Medium Gray
  border: '#e5e7eb',         // Border Gray
}

// ==========================
// COMPONENT STYLING SYSTEM
// ==========================

/*
 * CARDS
 * - .card: Base card with shadow and border
 * - .card-elevated: Enhanced shadow for prominence
 * - .card-header: Header section with bottom border
 * - .card-body: Main content section
 * - .card-footer: Footer section with top border
 */

/*
 * BUTTONS
 * - .btn: Base button styles
 * - .btn-primary: Red background (primary action)
 * - .btn-secondary: Gray background (secondary action)
 * - .btn-danger: Red background (destructive action)
 * - .btn-success: Green background (positive action)
 * - .btn-outline: Border-based button
 * - .btn-sm: Small button size
 * - .btn-lg: Large button size
 */

/*
 * BADGES
 * - .badge: Base badge style
 * - .badge-success: Green badge
 * - .badge-warning: Yellow badge
 * - .badge-danger: Red badge
 * - .badge-info: Blue badge
 */

/*
 * FORMS
 * - .form-input: Text input styling
 * - .form-select: Select dropdown styling
 * - .form-group: Form group wrapper
 * - .form-label: Label styling
 * - .form-text: Helper text
 */

/*
 * ALERTS
 * - .alert: Base alert styling
 * - .alert-success: Success alert
 * - .alert-warning: Warning alert
 * - .alert-danger: Danger/error alert
 * - .alert-info: Info alert
 */

// ==========================
// ANIMATIONS
// ==========================

/*
 * fadeIn: Fade in animation (0.6s)
 * slideInDown: Slide down animation (0.4s)
 * slideInUp: Slide up animation (0.5s)
 * 
 * Usage: .animate-fade-in, .animate-slide-in-down, .animate-slide-in-up
 */

// ==========================
// UTILITY CLASSES (Custom)
// ==========================

/*
 * .text-gradient: Gradient text effect
 * .blur-background: Glass morphism effect
 * .shadow-lg-red: Red-tinted large shadow
 * .transition-smooth: Smooth cubic-bezier transition
 * .glass: Light glass morphism
 * .glass-dark: Dark glass morphism
 * .card-hover: Hover card effect with transform
 * .spinner: Loading spinner animation
 * .gradient-border: Gradient border effect
 * .underline-animation: Animated underline on hover
 */

// ==========================
// THEME FEATURES
// ==========================

Features Implemented:
✅ Professional gradient backgrounds
✅ Glass morphism effects
✅ Shadow elevation system
✅ Smooth animations and transitions
✅ Responsive typography
✅ Accessible color contrasts
✅ Loading states
✅ Hover effects
✅ Focus states
✅ Disabled states
✅ Error handling UI
✅ Status indicators (badges)
✅ Form styling
✅ Button variants
✅ Card components
✅ Alert components

// ==========================
// TAILWIND CONFIGURATION
// ==========================

Extended Theme Colors:
- primary (50-900): Blood red shades
- bloodred (50-900): Deep blood red palette
- gradients: Pre-defined gradient utilities

// ==========================
// CSS IMPORT ORDER
// ==========================

1. @import './styles/theme.css'  (Custom theme styles)
2. @tailwind base                (Base styles)
3. @tailwind components          (Component classes)
4. @tailwind utilities           (Utility classes)
5. Custom CSS variables & rules

// ==========================
// FILE STRUCTURE
// ==========================

src/
├── styles/
│   └── theme.css              (Professional theme colors & animations)
├── index.css                  (Main CSS with Tailwind & custom components)
├── main.tsx                   (Updated: imports ./index.css)
├── pages/
│   └── Landing.tsx            (Updated: professional styling)
├── features/
│   └── auth/
│       └── Login.tsx          (Updated: professional card design)
├── components/
│   └── Navbar.tsx             (Updated: gradient navbar)
├── layouts/
│   └── DashboardLayout.tsx    (Updated: professional sidebar)
└── tailwind.config.js         (Updated: extended color palette)

// ==========================
// BROWSER SUPPORT
// ==========================

✅ Modern browsers (Chrome, Firefox, Safari, Edge)
✅ CSS Grid & Flexbox
✅ CSS Gradients
✅ CSS Transforms & Transitions
✅ Backdrop Filter (with fallback)
✅ CSS Custom Properties
✅ @layer directive
✅ @keyframes animations

// ==========================
// ACCESSIBILITY
// ==========================

✅ WCAG 2.1 AA compliant contrast ratios
✅ Focus visible states on all interactive elements
✅ Semantic HTML structure
✅ ARIA labels where needed
✅ Reduced motion support (@media prefers-reduced-motion)
✅ Keyboard navigation support

// ==========================
// PERFORMANCE OPTIMIZATIONS
// ==========================

✅ Optimized shadows (box-shadow)
✅ Hardware-accelerated transforms
✅ Efficient animations (GPU-friendly)
✅ Critical CSS inline
✅ Tailwind CSS purging unused styles
✅ Component reusability

// ==========================
// COLOR USAGE GUIDE
// ==========================

Red (#dc2626) - Use for:
- Primary call-to-action buttons
- Brand colors
- Important alerts
- Active states
- Links

White (#ffffff) - Use for:
- Card backgrounds
- Text on colored backgrounds
- Button backgrounds (secondary)

Gray (Various) - Use for:
- Text colors
- Borders
- Backgrounds
- Disabled states
- Secondary information

Green (#16a34a) - Use for:
- Success states
- Positive feedback
- Approved badges

Yellow/Orange - Use for:
- Warning states
- Pending badges
- Caution information

Blue (#0284c7) - Use for:
- Info states
- Information badges

// ==========================
// EXAMPLE USAGE
// ==========================

<!-- Button -->
<button class="btn btn-primary">Click Me</button>

<!-- Card -->
<div class="card">
  <div class="card-header">Header</div>
  <div class="card-body">Content</div>
  <div class="card-footer">Footer</div>
</div>

<!-- Alert -->
<div class="alert alert-danger">Error message</div>

<!-- Badge -->
<span class="badge badge-success">Active</span>

<!-- Form -->
<div class="form-group">
  <label class="form-label">Label</label>
  <input class="form-input" type="text" />
</div>

<!-- Glass Effect -->
<div class="glass p-6 rounded-xl">Glass content</div>

<!-- Gradient -->
<div class="hero-gradient-primary p-8">Hero section</div>
