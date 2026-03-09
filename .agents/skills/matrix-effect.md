---
name: matrix-effect
description: Guidelines on implementing the classic Matrix digital rain effect
---
# Digital Rain Guidelines

## The Alphabet
The correct Matrix rain typically consists of half-width Katakana, Latin characters, and Arabic numerals. 
- Use a string or array containing characters like: `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ`

## The Algorithm
1. The canvas is conceptually divided into "columns" depending on a fixed `fontSize`.
2. Each stream maintains its own `Y` coordinate for the "head" of the stream.
3. On each frame loop:
   - The head advances downwards.
   - At the head, draw a newly randomized character in bright green (or white `rgba(255, 255, 255, 1)` or `rgba(180, 255, 180, 1)`).
   - Behind the head, the previous character changes from white to darker green.
   - Over time, older characters fade out. Let `globalCompositeOperation` handle fading in transparent contexts.
4. When a line drops below the canvas height, randomly reset it to the top.
