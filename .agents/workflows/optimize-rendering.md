---
description: Enhance canvas rendering for 4K resolutions and transparency
---
# Optimizing Matrix Rendering

## Overview
Performance tuning for high density displays to avoid frame drops when drawing thousands of characters per frame.

## Steps
1. Profile `fillText` call frequency. If it is high, consider offscreen canvas font-atlases.
2. In the `draw` function:
   - Handle the standard Matrix trail effect (`ctx.fillStyle = "rgba(0, 0, 0, 0.05)"`, `ctx.fillRect(0,0,width,height)`) cautiously when dealing with a transparent background.
   - Traditional matrix effect relies on fading out the old frames with a semi-transparent black layer. If the screensaver needs a TRULY transparent background (where the desktop is visible behind it), you must use `.clearRect` or `ctx.globalCompositeOperation = "destination-out"` to create the trail without rendering black over the transparent window.
3. Test using Chrome DevTools Performance Profiler. Address any GC (Garbage Collection) spikes by minimizing object creation inside the `requestAnimationFrame` loop.
