# Design — PT Muara Teknik Elektrik

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## System
- Genre · modern-minimal
- Macrostructure · SaaS / API Product
- Theme · custom
- Vibe · "heavy industrial machinery, raw steel, copper coils"
- Axes · light / display-condensed-bold / warm

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:      oklch(96.5% 0.005 48);
  --color-paper-2:    oklch(94.5% 0.006 48);
  --color-ink:        oklch(20.0% 0.012 48);
  --color-ink-2:      oklch(36.0% 0.010 48);
  --color-rule:       oklch(88.0% 0.008 48);
  --color-rule-2:     oklch(80.0% 0.012 48);
  --color-accent:     oklch(68.0% 0.170 48);
  --color-accent-ink: oklch(15.0% 0.010 48);
  --color-focus:      oklch(66.0% 0.220 48);
  --color-graphite:   oklch(18.0% 0.012 48);

  --font-display: "Barlow Condensed", sans-serif;
  --font-body:    "Inter", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;

  /* 4-pt spacing scale, named: --space-3xs … --space-4xl. See tokens.css.   */
  /* Type scale, 1.25 (major-third) ratio: --text-xs … --text-display.       */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;  --dur-base: 240ms;  --dur-slow: 320ms;

  --radius-card: 6px;  --radius-pill: 9999px;  --radius-input: 4px;
}
```

## CTA voice
- Primary · Filled safety orange · 4px radius · tight technical uppercase padding
- Secondary · Outlined rule border · 4px radius · transparent background

## Motion stance
- Composed, minimal reveals (IntersectionObserver fade + rise 10px)
- One-shot typewriter reveal for interactive hero demos
- Reduced-motion fallback · ≤150 ms opacity crossfade.

## Per-page allowances
- Marketing pages (Home): May use enrichment (graphite bands, custom svg wiring/flow, technical UI dashboard mockup).
- Solutions pages: Asymmetric layout comparing specifications, data tables with rules.
- About page: Clean editorial prose, grid layout for teams and quality control cards.
- Articles pages: Typography-focused long forms with mono-spaced meta labels.

## What pages MUST share
- Consistent inline full-width navigation header with a functional ⌘K Search Palette.
- Consistent single-line footer (`Ft2` pattern).
- Barlow Condensed display headers + Inter body text + JetBrains Mono labels.
- Safety orange highlights and cast-iron ink colors.

## What pages MAY differ on
- Specific hero macrostructures (Marquee Hero on Home, Split Studio on Solutions, Long Document on About).
- Specific component layouts and grids supporting page-specific content.

## Exports

Tailwind CSS v3 config overrides are below. Copy-paste these into each page's Tailwind configuration script.

### Tailwind inline config
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                mtepaper: 'oklch(96.5% 0.005 48)',
                mtepaper2: 'oklch(94.5% 0.006 48)',
                mteink: 'oklch(20.0% 0.012 48)',
                mteink2: 'oklch(36.0% 0.010 48)',
                mterule: 'oklch(88.0% 0.008 48)',
                mterule2: 'oklch(80.0% 0.012 48)',
                mteaccent: 'oklch(68.0% 0.170 48)',
                mtegraphite: 'oklch(18.0% 0.012 48)',
            },
            fontFamily: {
                display: ['"Barlow Condensed"', 'sans-serif'],
                body: ['"Inter"', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            borderRadius: {
                card: '6px',
                input: '4px',
            }
        }
    }
}
```
