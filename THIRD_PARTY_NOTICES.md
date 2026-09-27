# Third-party sources

## React Bits

JS-CSS source downloaded from the requested official registries on 2026-09-27:

- DitherVeil: https://reactbits.dev/r/DitherVeil-JS-CSS.json
- PixelSwap: https://reactbits.dev/r/PixelSwap-JS-CSS.json
- OrbitImages: https://reactbits.dev/r/OrbitImages-JS-CSS.json

Documentation: https://reactbits.dev/

The upstream license is saved in `src/components/reactbits/LICENSE.md`. OrbitImages retains its original Dominik Koch attribution.

PixelBlast and DecryptedText JS-CSS source was supplied in the user's React Bits attachments. PixelBlast includes local fixes for animation-frame cleanup, pointer-listener cleanup, touch-texture disposal, visibility pausing, and the liquid-strength uniform. Its original inspiration is github.com/zavalit/bayer-dithering-webgl-demo. DecryptedText is wrapped with stable accessible text and reduced-motion handling.

## Devicon

The six local technology SVGs come from Devicon v2.17.0:
https://github.com/devicons/devicon/tree/v2.17.0/icons

Upstream license: https://github.com/devicons/devicon/blob/v2.17.0/LICENSE

Technology icons remain the trademarks of their respective owners.

## Portrait

The portrait in `public/images/` was supplied by the user for this portfolio.

## Connected carousel

`src/components/ConnectedCarousel.jsx` adapts the connected-carousel / CalendlyCarousel example supplied in the user's attachment. Its connected card presentation and Motion spring settings are retained, with project-specific content, plain CSS, measured sizing, swipe controls, and accessible playback/navigation controls. Demo customer content and third-party stock photos were not included.
