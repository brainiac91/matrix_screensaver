const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let width, height, columns;
const fontSize = 16;
let drops = [];

// Base character set: Katakana + Latin + Numerals
const charset = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function init() {
    // Get device pixel ratio for sharp rendering on 1080p and 4K
    const dpr = window.devicePixelRatio || 1;

    // Set logical CSS size
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // Set physical pixel size
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Scale context
    ctx.scale(dpr, dpr);

    // Calculate columns based on standard width
    columns = Math.floor(width / fontSize);

    // Initialize drop positions if not set or resize adds columns
    const initialDrops = drops.length;
    for (let x = initialDrops; x < columns; x++) {
        // Start them offscreen or random heights so they don't all fall in a straight line
        drops[x] = Math.random() * -100;
    }
}

// Ensure resize is handled
window.addEventListener('resize', init);
init();

function draw() {
    // Crucial for transparent background:
    // Instead of drawing a black rectangle with low opacity to dim previous letters,
    // we use destination-out to gradually erase the canvas over time.
    // This allows the desktop to remain visible through the blank areas.
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Adjust alpha for trail length
    ctx.fillRect(0, 0, width, height);

    // Reset composite operation to draw new letters
    ctx.globalCompositeOperation = 'source-over';

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Stop rendering columns that are out of bounds after a resize
        if (i >= columns) continue;

        // Choose random character
        const text = charset.charAt(Math.floor(Math.random() * charset.length));

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // "Head" glow effect logic could be added here, 
        // e.g., drawing the current one white, but for simplicity and perf:
        ctx.fillStyle = '#0F0';
        // For a true matrix feel, maybe occasionally make a random char white
        if (Math.random() > 0.95) {
            ctx.fillStyle = '#FFF';
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly when it crosses bottom
        if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Increment Y position
        drops[i]++;
    }

    requestAnimationFrame(draw);
}


// Screensaver quit logic
const { ipcRenderer } = require('electron');
let mouseX = null;
let mouseY = null;

window.addEventListener('mousemove', (e) => {
    if (mouseX === null && mouseY === null) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        return;
    }
    // Only quit if mouse moves more than a few pixels to avoid accidental sensitivity
    if (Math.abs(e.clientX - mouseX) > 5 || Math.abs(e.clientY - mouseY) > 5) {
        ipcRenderer.send('quit-app');
    }
});

window.addEventListener('keydown', () => ipcRenderer.send('quit-app'));
window.addEventListener('click', () => ipcRenderer.send('quit-app'));

// Start loop
draw();
