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

Additional technology logos are documented in `public/icons/stack/icons-credits.json`.

## Fonts

Anton and Geist are self-hosted under the SIL Open Font License. Their notices are in `src/fonts/OFL-Anton.txt` and `src/fonts/OFL-Geist.txt`.

## Portrait

The portrait in `public/images/` was supplied by the user for this portfolio.

## Project covers

The Vigil, DŌU Cookie, and Melodix WebP covers in `public/images/projects/` come from the user's supplied `Vigil-portfolio-cover.png`, `dou-portfolio-cover-actual.png`, and `melodix-cover.png` files.

## Connected carousel

`src/components/ConnectedCarousel.jsx` adapts the connected-carousel / CalendlyCarousel example supplied in the user's attachment. Its connected card presentation and Motion spring settings are retained, with project-specific content, plain CSS, measured sizing, swipe controls, and accessible playback/navigation controls. Demo customer content and third-party stock photos were not included.
