---
description: Set up the matrix waterfall html/css/js architecture
---
# Matrix Screensaver Setup

## Overview
This workflow sets up the basic HTML structure, the transparent CSS overlay, and the minimal JS logic needed for the matrix screen.

## Steps
1. Create `index.html` with a full-screen `<canvas id="matrix"></canvas>`.
2. Link to `style.css` and `script.js`.
3. In `style.css`:
   - Set `body` and `html` to margin 0, padding 0.
   - Set `canvas` to `display: block`.
   - Ensure the `body` background is `transparent` so the base system or window behind is visible.
4. In `script.js`:
   - Provide a baseline setup to get the 2D context.
   - Attach resize event listeners to keep canvas dimensions matched to `window.innerWidth` and `window.innerHeight`.
   - Consider `window.devicePixelRatio` during the resize handler to keep lines crisp on high DPI monitors.
