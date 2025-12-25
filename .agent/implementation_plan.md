# Implementation Plan - Modern Y2K 3D Website

## User Review Required

> [!IMPORTANT]
> - Confirm preference for specific colors (currently assuming silver/chrome, iridescent pearl, soft neon cyan/pink).
> - Confirm if any specific content text is needed (using placeholders for now).

## Proposed Tech Stack

- **Build Tool**: Vite (for modern module handling and HMR)
- **Core**: HTML5, Vanilla JavaScript
- **Styling**: Vanilla CSS (Modern features: Grid, Flexbox, Custom Properties, Backdrop Filter)
- **3D Library**: Three.js (for the metallic/glass 3D background elements)
- **Fonts**: 'Outfit' or 'Space Grotesk' (Google Fonts) for that futuristic clean look.

## Design System

- **Palette**:
    - *Background*: Deep space grey / off-black with subtle noise.
    - *Accents*: Holographic silver, neon cyan, soft pink (used sparingly).
    - *Surfaces*: Glassmorphism (blur + semi-transparent white/grey), Chrome/Liquid Metal headers.
- **Typography**: Sans-serif, wide tracking for headers, clean geometric for body.
- **Motion**: Slow, floating animations. "underwater" feel.

## Architecture

### Directory Structure
```
/
├── index.html
├── style.css       # Global styles & variables
├── main.js         # Entry point & 3D logic
├── /public         # Assets
├── /src
│   ├── /components # (Logical grouping in JS/CSS)
│   └── /three      # Three.js specific modules
```

## Steps

1.  **Project Initialization**:
    -   Run `npx create-vite ./ --template vanilla`.
    -   Install `three`.

2.  **3D Background (The "Wow" Factor)**:
    -   Setup a Three.js scene.
    -   Create floating geometric shapes (torus, sphere) with `MeshPhysicalMaterial`.
    -   Settings: High transmission (glass), high metalness (chrome), iridescent colors.
    -   Add mouse interactivity (parallax movement).

3.  **UI Implementation**:
    -   **Hero**: Large glossy typography, centered or asymmetric modern layout.
    -   **Cards**: Semantic HTML `<article>` tags styled with `backdrop-filter: blur()`, varying opacities, and white borders.
    -   **Parallax**: CSS `transform: translateZ` or JS-based scroll listeners for floating elements.

4.  **Polish**:
    -   Custom cursor? (Maybe a subtle ring).
    -   Smooth scroll behavior.
    -   Loading state (since 3D might take a moment).

## Verification Plan

### Automated
-   `npm run build` to ensure production readiness.
-   Lint checks (if applicable).

### Manual
-   Open in browser.
-   Verify 3D scene renders and is not laggy.
-   Check responsiveness on mobile dimensions.
