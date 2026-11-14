# Portfolio build guide

The portfolio now uses Next.js App Router and React. The original Vite entry point and configuration have been removed. Run `npm run dev` to preview at port 5173, `npm run build` to build, and `npm start` to serve that build.

## Source layout

| Responsibility | File |
| --- | --- |
| HTML document, metadata, fonts, global styles | `src/app/layout.jsx` |
| Home route | `src/app/page.jsx` |
| Five statically generated portfolio routes | `src/app/[page]/page.jsx` |
| Missing-page view | `src/app/not-found.jsx` |
| Persistent navigation, theme, route focus | `src/components/PortfolioShell.jsx` |
| Page component selection | `src/App.jsx` |
| Christmas UI and shared playback state | `src/components/HolidayExperience.jsx` |
| Layered scene and GSAP timelines | `src/lib/winterScene.js` |
| Local music-box carol | `src/lib/christmasMusic.js` |
| Seasonal styling and mobile overrides | `src/christmas.css` |
| Project records and technology groups | `src/data/portfolio.js` |
| Project screenshots and links | `src/data/projectMedia.js` |
| CV and certificate records | `src/data/credentials.js` |

## Rendering and navigation

Layouts and route pages render through Next.js. Interactive portfolio components live below client boundaries in `App.jsx` and `PortfolioShell.jsx`. Browser APIs initialize in effects or explicit user actions; the shared media-query hook applies preferences after mounting to keep server and client markup consistent.

Use `next/link` for internal navigation. The shared layout keeps music, animation state, and color theme intact during route changes. New routes receive main-content focus. Unknown routes use the missing-page view. Legacy hash bookmarks map to the matching route.

## Animation ownership

The first canvas composites the generated light/dark village assets onto a flat background; it redraws on resize, asset readiness, and theme changes. The second renders independently tweened numeric state for Santa, twinkles, window glow, and chimney smoke. A separate foreground canvas renders randomized snowfall with theme-specific contrast. GSAP’s ticker drives dynamic drawing. Pausing or hiding the page detaches scene drawing and pauses its tweens. Unmounting kills every owned tween and listener.

SVG Santa hats and a light garland scale with the heading and portrait. The portrait remains the supplied original photo. The existing technology halo and project carousel retain their own pause controls.

## Responsive behavior

Desktop uses the existing sidebar. At 900px and below, navigation becomes a fixed header plus bottom bar with safe-area padding. At 650px and below, the greeting, introduction, portrait, and statistics stack vertically. Controls retain touch targets and paragraphs wrap without horizontal scrolling.

## Build and publishing

`next.config.mjs` supports normal Node hosting locally and static export when `STATIC_EXPORT=true`. `NEXT_PUBLIC_BASE_PATH` supplies the deployment prefix for links and local assets. GitHub Actions sets `/Portfolio` and uploads `out/` to Pages. Local builds leave that prefix empty.

The build hook refreshes GitHub activity with a saved-data fallback. The dependency lockfile should remain committed alongside `package.json`.

## Verification

Check the production build, all six routes, light and dark themes, mobile widths down to 320px, project filtering and dialogs, certificate previews, and the CV URL. Verify that music attempts autoplay, starts on the first interaction if required by the browser, follows page navigation, stops when the tab is hidden, and respects explicit pause. Snow and music use SVG-only controls in a fixed side dock; there is no volume slider. Reduced-motion preferences should start Christmas scenery paused.
