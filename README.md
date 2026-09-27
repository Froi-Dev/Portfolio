# Froilan Portfolio

A responsive React + Vite portfolio using the original General Sans, Inter, IBM Plex Mono, and green accent palette.

## Recreate this design

- [Portfolio design guide](PORTFOLIO_DESIGN_GUIDE.md) — visual direction, colors, typography, spacing, surfaces, motion, and a reusable design brief.
- [Portfolio build guide](PORTFOLIO_BUILD_GUIDE.md) — implementation order, source map, responsive behavior, carousel logic, customization, and verification.

## Run locally

```sh
npm install
npm run dev
```

The terminal prints the local preview URL. Build with `npm run build`; serve the output locally with `npm run preview`.

## Publish with GitHub Pages

The `.github/workflows/deploy-pages.yml` workflow builds and publishes every push to `main`. It can also be run manually from the repository's Actions tab. GitHub Pages must use **GitHub Actions** as its source in **Settings → Pages**.

Production assets use `/Portfolio/`, matching the site URL: https://froi-dev.github.io/Portfolio/. Local development remains at `/`. Hash navigation keeps individual pages working on static hosting. The build refreshes GitHub contributions before publishing, with the saved snapshot as a fallback if GitHub is unavailable.

## Layout

- Six separate views: Home, About, Projects, Stack, Certifications, and Contact. Hash routes (for example `#/projects`) support bookmarks, refresh, and browser history on static hosting.
- Desktop: fixed side navigation with an active page indicator.
- Mobile: fixed top identity/theme bar and six-item bottom page navigation.
- Portrait: the supplied photo at full clarity, with a faint (12% opacity), 16-level RGB DitherVeil overlay and full-color default rendering.
- About: a clickable, keyboard-accessible PixelSwap note and a contribution calendar pulled from Froi-Dev's public GitHub activity.
- Projects: a filterable connected carousel with a featured project, neighboring preview cards, swipe/arrow controls, project selectors, and optional autoplay. Opening the featured card shows its description, features, stack, and links in a native dialog. Mock visuals remain labeled as interface concepts.
- Hero toolkit: OrbitImages forms a shallow halo above the portrait's head, with local technology logos and a pause control. Animation pauses offscreen, in background tabs, and for reduced motion.
- Tech stack: five responsive glass cards covering 33 technologies and tools, including Cloud & DevOps. The Home technology count is derived from this list.
- Certifications: seven supplied credentials in grouped, subtly tilted cards, with full certificate previews and five QR-derived verification links.
- Home CV download: serves the supplied PDF as `Froilan-De-Vera-CV.pdf`.
- Effects: a shared monochrome PixelBlast background on every page (black on light, white on dark), with static grain retained for reduced motion or unavailable WebGL. The background has no colored gradient glow. Home uses DecryptedText name/role reveals. The portrait is capped at 390px on desktop and 330px on mobile; actions use solid pill-shaped buttons.
- Contact: email draft form and email copy action. Sending requires the visitor's email app.

## Source structure

- `src/App.jsx` — route selection, document titles, focus, and theme persistence.
- `src/components/` — portfolio sections and shared icon component.
- `src/components/reactbits/` — exact JS-CSS registry source for the three requested React Bits components.
- `src/data/portfolio.js` — existing project and stack content.
- `src/styles.css` — shared palette, typography, layout, and responsive styles.
- `src/refinements.css` — glass surfaces and responsive portrait/toolkit composition.
- `src/pages.css` — individual page layouts, halo, CV button, and certificate gallery.
- `src/responsive.css` — final responsive rules, safe-area spacing, touch controls, container-aware buttons/forms, and mobile/tablet navigation.
- `src/data/credentials.js` — CV path and certificate entries.
- `src/data/projectMedia.js` — project screenshots, live demo URLs, and repository URLs (currently mock placeholders).
- `src/components/ConnectedCarousel.jsx` / `.css` — the supplied carousel design adapted to Vite, JavaScript, plain CSS, and the existing Motion dependency.
- `src/components/Reveal.jsx` — shared, reduced-motion-aware section entrances.
- `src/components/AmbientPixels.jsx` — optional WebGL background with an error fallback.
- `src/components/AnimatedText.jsx` — text animation with stable layout and an accessible label.
- `public/images/froilan-portrait.png` — supplied portrait.
- `public/icons/` — six locally served Devicon SVGs.

## React Bits

Installed with:

```sh
npx shadcn@latest add @react-bits/DitherVeil-JS-CSS @react-bits/PixelSwap-JS-CSS @react-bits/OrbitImages-JS-CSS --yes
```

The registry dependencies are `ogl@^1.0.11` and `motion@^12.23.12`; compatible versions are recorded in the lockfile. CLI formatting was replaced with the exact fetched registry content, and the six component/CSS files were compared against that content.

Animation settings are configured in Hero, About, and TechOrbit. DitherVeil uses the supplied portrait in a responsive frame with a softer configuration following the portrait feedback. PixelSwap uses portfolio-specific content. OrbitImages uses local technology logos and a shallow ellipse positioned above the head.

Reduced motion uses a static portrait and pauses the orbit. The original DitherVeil source is wrapped to recreate its WebGL surface after resizing. Browsers without WebGL2 receive the ordinary portrait.

`components.json`, `jsconfig.json`, and the Vite `@` alias are configured for adding more registry components. This project uses plain CSS, so choose JS-CSS variants.

## Content to update

### GitHub contributions

About includes the public contribution calendar for [Froi-Dev](https://github.com/Froi-Dev). Daily counts and activity levels are fetched from GitHub's public contribution HTML and saved in `src/data/github-contributions.json`; no token or third-party calendar service is needed. The displayed sync date identifies the snapshot. The calendar supports both themes, horizontal scrolling on narrow screens, and keyboard navigation between days.

Run `npm run refresh:github` to pull current activity. Starting the development server or building also refreshes the snapshot. If GitHub is unavailable, those hooks retain the last saved data and print a warning. An already deployed static site needs a new build/deploy to show refreshed activity.

### Portfolio content

Existing experience figures and project descriptions are retained. The project visuals are labeled interface concepts, not screenshots of deployed products. Replace them with actual screenshots when available. The contact email is `froilandevera.dev@gmail.com`. The Home download button serves the supplied CV from `public/documents/Froilan-De-Vera-CV.pdf`. Add project repository/demo URLs as they become available.

See `THIRD_PARTY_NOTICES.md` for upstream sources and licenses.

## Project carousel

Replace the `image`, `demoUrl`, and `repositoryUrl` values in `src/data/projectMedia.js` when real assets are ready. Image paths can be relative to `public/` or HTTPS URLs. Empty or failed images fall back to labeled mock interface concepts; missing external links stay disabled. Existing project descriptions and stacks live in `src/data/portfolio.js`.

The carousel measures its available width and uses consistent card layouts with transform-based sliding and scaling. Adjacent projects remain visible, and navigation controls sit above the cards. Autoplay pauses during hover, keyboard focus, open dialogs, offscreen visibility, hidden tabs, and reduced motion. The supplied Next.js/TypeScript/Tailwind example was adapted to the existing stack, so no Next.js or duplicate animation package is required.

## Add a CV and certifications

Place the CV PDF in `public/documents/`, then set `cvPath` in `src/data/credentials.js` to `documents/your-file.pdf`. The Home button becomes a real download link automatically.

Seven supplied credentials are configured in the `certifications` array in that same file. Each record has `id`, `title`, `issuer`, `issuerKey`, `group`, `kind`, `date`, `file`, and `image`, with an optional verification `url`. Original PDFs/images and rendered PDF previews live in `public/certificates/`. Verification URLs were decoded from the supplied QR codes; no verification destination is invented for files without one. Clicking a card opens an accessible preview dialog; its original document remains available in a separate tab. Gallery styling lives in `src/components/Certifications.css`.

## Responsive behavior

Desktop content stays bounded for readability on large monitors. At 900px and below, the sidebar becomes a fixed identity/theme header and six-item bottom navigation with device safe-area spacing. Narrow layouts stack the hero and project cards; stack cards adapt to their available width. Buttons and form rows respond to their container width. Role text wraps word by word while preserving its animation and accessible label. Inputs use 16px text, dialogs fit the dynamic viewport, and short desktop windows get a compact sidebar. Touch screens use PixelBlast without liquid postprocessing or antialiasing; reduced-motion preferences still disable decorative animation.
