# Pricing Page Components

This directory contains JavaScript components specific to the pricing page.

## Migration from Inline Scripts

The JavaScript code in this directory was originally embedded in HTML as inline scripts. It has been migrated to proper JavaScript modules that can be built and bundled for production.

### Files

- `custom.js` - The original file containing inline scripts (deprecated)
- `pricing-page-components.js` - The new file containing the same functionality but properly formatted as a JavaScript module.

## Components

The pricing page components include:

1. **Swiper Initialization** - Initializes the Swiper carousel for the pricing page
2. **Accordion Functionality** - Handles the accordion behavior for expandable sections
3. **Pricing Switcher** - Manages the pricing toggle between different pricing options
4. **Tooltip Functionality** - Provides responsive tooltips that adjust based on screen position

## Usage

The components are automatically initialized when the DOM is loaded. If you need to manually initialize any component, you can import the specific initialization functions:

```javascript
import { initAccordion, initPricingSwitcher, initTooltips } from "./pricing-page-components.js";

// Then call the function you need
initAccordion();
```

## Dependencies

- **jQuery** - Required for the accordion and pricing switcher functionality
- **Swiper** - Required for the carousel functionality

Make sure these dependencies are loaded before the pricing page components script.
