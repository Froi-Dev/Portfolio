# Building and customizing this portfolio

This guide follows the code already present in this repository. Read the [design guide](PORTFOLIO_DESIGN_GUIDE.md) for the visual rationale and theme reference.

## 1. Run the existing project

Open a terminal in the directory containing `package.json`. You need Node.js and npm compatible with the versions recorded in this project.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. The port can change if another local server is running.

For a production build and local preview:

```sh
npm run build
npm run preview
```

The build output is written to `dist/`. A successful build confirms compilation; it does not replace checking the finished pages in a browser.

## 2. Understand the implementation

The repository uses React 18, Vite 6, plain CSS, and Motion. WebGL effects use the dependencies recorded in `package.json`, including Three.js, postprocessing, and OGL. The portfolio does not require a backend for its current email-draft contact behavior.

| Responsibility | Source |
| --- | --- |
| Routes, page titles, focus, theme persistence | `src/App.jsx` |
| Entry point and global stylesheet order | `src/main.jsx` |
| Name, page links, theme controls | `src/components/Navigation.jsx` |
| Hero, portrait, introduction | `src/components/Hero.jsx` |
| Project filtering and detail dialogs | `src/components/Projects.jsx` |
| Carousel logic and appearance | `src/components/ConnectedCarousel.jsx` and `.css` |
| Contact copy and email draft form | `src/components/Contact.jsx` |
| Essential inline SVG controls | `src/components/Icon.jsx` |
| Animated background and fallback | `src/components/AmbientPixels.jsx` |
| Stable animated text | `src/components/AnimatedText.jsx` |
| Portrait technology orbit | `src/components/TechOrbit.jsx` |
| Project descriptions and technology groups | `src/data/portfolio.js` |
| Screenshots and project links | `src/data/projectMedia.js` |
| CV and certificate records | `src/data/credentials.js` |

## 3. Recreate the foundation before adding effects

If you are implementing this style in a different project, use this order:

1. Add theme tokens, typography, and a basic page background.
2. Build the desktop sidebar and the main content container.
3. Add the mobile header, bottom navigation, and safe-area padding.
4. Build each page with static content and working links.
5. Add solid buttons, forms, focus states, and accessible dialogs.
6. Add the project carousel and verify its navigation.
7. Add entrances, animated text, the portrait orbit, and background effects.
8. Add reduced-motion and unsupported-WebGL fallbacks.
9. Check the result across themes, viewport sizes, and input methods.

This order makes layout problems easier to diagnose because you can verify the content before introducing animation.

## 4. Implement the theme with tokens

Here is a small starting subset of the current palette:

```css
:root {
  --bg: #0c0c0f;
  --fg: #f4f4f5;
  --surface: #141418;
  --surface-2: #1e1e22;
  --muted: #a0a0a8;
  --border: #2a2a30;
  --accent: #34d399;
}

[data-theme="light"] {
  --bg: #ffffff;
  --fg: #0a0a0a;
  --surface: #fafafa;
  --surface-2: #f3f3f3;
  --muted: #737373;
  --border: #e9e9e9;
  --accent: #16a34a;
}

body {
  background: var(--bg);
  color: var(--fg);
}
```

`App.jsx` writes the selected theme to `document.documentElement.dataset.theme` and saves the preference under `portfolio-theme` in local storage. It defaults to dark mode when a light-mode preference is not stored.

The global stylesheet order is `styles.css`, `refinements.css`, `pages.css`, then `responsive.css`. The final file contains the current solid-button, name-only branding, and contact-layout overrides. Check the full cascade before changing an earlier rule. Carousel-specific styles live beside the component.

For a new implementation, you can organize these rules into fewer files. Keep one clear owner for each component's final appearance instead of accumulating contradictory overrides.

## 5. Build the responsive shell

Use a fixed sidebar on desktop and offset the main content by the sidebar width. Use `minmax(0, 1fr)` in grids and `min-width: 0` on children so text can shrink and wrap without forcing horizontal overflow.

The existing navigation changes at 900px. Below that point, content padding reserves the header and bottom navigation space. Safe-area values use `env(safe-area-inset-*)`.

The contact layout has an additional constraint: the sidebar leaves less usable space on smaller desktop windows. It stacks at viewport widths from 901–1100px, can use two columns at 701–900px when the sidebar is absent, and stacks again at 700px or less.

Form rows also respond to their container width. This is useful because a form may be narrow even when the overall browser is wide.

## 6. Implement smooth carousel movement

The key is to move a persistent card rather than switch its structure when it becomes active. In the current component, `ResizeObserver` measures the carousel container and determines card width.

The positioning logic is:

```js
const cardWidth = Math.max(
  0,
  Math.min(440, width * (width < 560 ? 0.82 : 0.58))
);
const gap = width < 560 ? 14 : 24;

const x = -cardWidth / 2 + offset * (cardWidth + gap);
const scale = offset === 0 ? 1 : 0.94;
const transition = {
  duration: 0.65,
  ease: [0.22, 1, 0.36, 1],
};
```

Here, `width` is the measured container width and `offset` is a card's position relative to the active card. The card is positioned from the center of the stage. Motion animates `x` and `scale`; width is set directly and changes when the layout resizes.

The implementation renders nearby positions and uses a monotonically changing page number plus modulo arithmetic to wrap through the project array. Keys follow those positions so neighboring content stays mounted during a normal next/previous transition.

Use a Motion value for the autoplay progress indicator. Updating a React state value on every animation frame would also rerender the card tree unnecessarily.

Preserve these behaviors when adapting the component:

- Previous and next buttons, project selectors, keyboard arrows, and swipe input.
- A visible pause control.
- Autoplay suspension for focus, hover, open dialogs, visibility, and reduced motion.
- Disabled navigation for a category containing one project.
- Accessible names for controls and a current-project announcement.
- Hidden neighboring content removed from keyboard focus.
- Instant movement when reduced motion is requested.

## 7. Make controls dependable

Primary buttons use opaque green backgrounds; secondary buttons use solid neutral surfaces and visible borders. Essential icons in `Icon.jsx` are inline SVG paths, so those controls remain recognizable without the external icon font.

Some remaining decorative and navigation icons still use external font stylesheets from `index.html`. When adapting the project for fully offline use, bundle or replace those assets too. The three web fonts also load externally and have CSS fallback fonts.

Keep icon buttons labeled with `aria-label`, maintain visible focus rings, and provide adequate touch targets. Disabled links should explain what is missing, as the CV button does when no PDF is configured.

## 8. Add the optional visual effects

The existing React Bits sources are under `src/components/reactbits/`. Reuse their wrappers to understand the settings and fallback behavior:

- `AmbientPixels.jsx` lazy-loads PixelBlast, checks WebGL support, and retains static grain as a fallback.
- `Hero.jsx` keeps an ordinary portrait image under the optional DitherVeil effect.
- `AnimatedText.jsx` reserves the final text dimensions and supplies a stable accessible label.
- `TechOrbit.jsx` pauses when offscreen, in a hidden tab, or when reduced motion is requested.
- `Reveal.jsx` provides the shared section entrance.

Read `THIRD_PARTY_NOTICES.md` and the included license files before redistributing third-party component code. Replace the supplied portrait with your own image.

## 9. Replace content and connect assets

| What to personalize | Where to edit |
| --- | --- |
| Full name and navigation identity | `Navigation.jsx` |
| Introduction, role, summary figures | `Hero.jsx` |
| About copy | `About.jsx` |
| Project names, descriptions, features, technologies | `src/data/portfolio.js` |
| Project screenshots, repository URLs, live demos | `src/data/projectMedia.js` |
| CV path and certifications | `src/data/credentials.js` |
| Contact email and social links | `Contact.jsx`, `Navigation.jsx`, and `Hero.jsx` |
| Browser title and page metadata | `App.jsx` and `index.html` |
| CV download filename | `DownloadCV.jsx` |

Place public images in `public/images/` and the CV in `public/documents/`. Asset paths in the data files are relative to `public/`, for example `documents/my-cv.pdf`.

If a project image is missing or fails to load, the UI uses a generated interface preview. The carousel hides the small preview caption to save space, so review placeholder labeling when adapting the design. Project details provide a mock-preview note when both external links are absent; do not rely on that note if you add links before replacing the mock visual.

The contact form currently constructs a `mailto:` URL. A visitor must send the draft through an email app. If you need direct delivery, add an actual form endpoint and implement pending, success, and failure states before changing that promise in the interface.

## 10. Verify the finished result

Run `npm run build`, then inspect the rendered site. A practical review includes:

- Desktop and mobile layouts in both themes.
- Short viewport heights and long project titles.
- Every route, filter, selector, and project dialog.
- Last-to-first and first-to-last carousel movement.
- Keyboard navigation, dialog dismissal, and focus return.
- Autoplay pause/resume behavior and reduced-motion settings.
- No horizontal page overflow or controls covered by fixed navigation.
- Aligned form fields and a reachable submit button.
- Working screenshot, CV, repository, and demo paths.
- Accurate personal information and clearly identified placeholders.

Build output belongs to `dist/`. When hosting under a subdirectory, configure Vite's base path for that location and verify asset URLs after deployment. Hash routes such as `#/projects` keep the page selection in the URL without requiring a separate server route for each view.
