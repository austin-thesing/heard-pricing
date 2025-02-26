# Heard Pricing

This repository contains the JavaScript code for the Heard pricing page.

## Build Setup

This project uses [Bun](https://bun.sh/) and [esbuild](https://esbuild.github.io/) for building production-ready JavaScript files.

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.3 or later)

### Installation

```bash
# Install dependencies
bun install
```

### Build Commands

```bash
# Build for production
bun run build

# Watch mode (automatically rebuilds on file changes)
bun run watch

# Serve the dist directory
bun run serve
```

### Build Output

The build process:

- Bundles and minifies JavaScript files
- Generates source maps for debugging
- Outputs optimized files to the `dist` directory

### Files

- `pricing-swap.js` - Main pricing toggle functionality
- `global-pricing-declarations.js` - Global pricing data

## Implementation

To use the production-ready files in your HTML, update your script tags to point to the dist directory:

```html
<script src="dist/global-pricing-declarations.js"></script>
<script src="dist/pricing-swap.js"></script>
```

## Development

During development, you can use the watch mode to automatically rebuild files when changes are detected:

```bash
bun run watch
```
