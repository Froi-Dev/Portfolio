# Froilan Portfolio — Christmas Edition

Next.js App Router + React, with SVG decorations, generated light/dark village artwork with layered Canvas 2D animation, and independent GSAP animations. The existing portfolio projects, certificates, contact information, and CV are retained.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open [localhost:5173](http://localhost:5173). To run a production build:

```sh
npm run build
npm start
```

`npm run preview` also starts the production build on port 5173. GitHub contribution refreshes remain available with `npm run refresh:github`; builds retain the saved snapshot if GitHub is unavailable.

## Pages and assets

The App Router serves `/`, `/about/`, `/projects/`, `/stack/`, `/certifications/`, and `/contact/`. Next.js links preserve the shell, theme, and music during page navigation. Legacy `#/projects` bookmarks redirect to their new routes.

The supplied portrait, CV, project screenshots, technology logos, and certificates remain in `public/`. Asset URLs respect `NEXT_PUBLIC_BASE_PATH`.

## Christmas scene

- `src/components/HolidayExperience.jsx`: shared playback and motion controls, SVG hats, greeting, and lights.
- `src/lib/winterScene.js`: three Canvas 2D layers. The generated five-cottage village, mountains, snowman, and villagers stay fixed. Independent GSAP tweens move Santa and the reindeer, twinkle ornaments and stars, pulse the warm windows, and drift chimney smoke. Randomized snow has separate speed, size, opacity, and drift per flake.
- `src/lib/christmasMusic.js`: a locally synthesized music-box arrangement of the traditional “We Wish You a Merry Christmas.” Music attempts autoplay and starts on the first interaction when the browser requires it. The louder music-box mix uses an 85% master level and a compressor controlling peaks. Snow and music controls sit in a compact side dock, using SVG icons without a volume slider.
- `src/christmas.css`: seasonal overrides loaded after the original portfolio styles. The desktop sidebar becomes a top identity bar and six-item bottom navigation on mobile.

Pause controls freeze the Christmas animations. Reduced-motion preferences start them paused. Background tabs suspend scene updates and stop music; returning resumes music if the visitor has not explicitly paused it. React effects remove GSAP tweens, event listeners, observers, and audio resources on unmount.

## GitHub Pages

The existing workflow builds a static export with `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/Portfolio`, then publishes `out/`. Local development uses the root path. No deployment is performed by editing the project locally.

## Existing interactions

Project category filters, swipe/arrow navigation, project dialogs, certificate previews, the supplied CV download, the tech-logo orbit, and both color themes remain available. Contact submission opens the visitor’s email client.

The [build guide](PORTFOLIO_BUILD_GUIDE.md) describes the current source layout. The [design guide](PORTFOLIO_DESIGN_GUIDE.md) documents the underlying portfolio design. Third-party component attribution remains in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The About page contains a simple bio and the GitHub activity calendar. Christmas controls use soft raised surfaces with festive red/green accents. Dark mode has a flat charcoal backdrop. Generated artwork and its prompts are documented in `public/images/christmas/ASSET_NOTES.md`.
