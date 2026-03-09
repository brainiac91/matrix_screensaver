---
name: canvas-rendering
description: Best practices for HTML5 Canvas rendering for screensavers
---
# High-DPI Canvas Rendering

1. Start by getting the actual display scaling:
```javascript
const dpr = window.devicePixelRatio || 1;
```

2. Set the canvas width and height *attributes* to the scaled dimensions to ensure sharpness on 1080p and 2160p displays:
```javascript
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
```

3. Set the CSS style to the unscaled dimensions:
```javascript
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
```

4. Finally, scale the rendering context so our drawing coordinates don't need to manually factor in `dpr`:
```javascript
ctx.scale(dpr, dpr);
```

## Transparent Background Trails
To achieve a fading text effect over a fully transparent background (so the desktop is visible behind it), avoid using `fillRect` with semi-transparent black (`rgba(0,0,0,0.1)`). Instead, use `globalCompositeOperation = 'destination-out'` with varying alpha, or clear rects selectively.
