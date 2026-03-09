---
name: code-rules
description: Fundamental principles for writing matrix screensaver components
---
# Code Constraints and Requirements
- Write SPARTAN CODE. No bloat. No external libraries or large frameworks (no React/Vue) unless strictly required. Pure Vanilla JS is preferred.
- Only modern ES6+ syntax is allowed. Use `const` and `let`, template literals, and arrow functions.
- The project MUST be compatible with Chrome/Chromium extensions since it might run as one, or as an Electron wrapper.
- All code should be rigorously optimized for 2160p (4K). This means tight loops and minimal GC overhead.
- All styles must support a transparent window. Do not force solid background colors for the document `body`.
