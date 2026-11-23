# Froilan De Vera portfolio handoff

The site is a single scrolling portfolio for recruiters, prospective clients, and developers. It introduces Froilan, shows his work and how to inspect it, and gives visitors access to credentials, a CV, and contact details. The design is editorial and technical, with real project screenshots and supplied personal assets.

## Design direction

- Use the supplied hero reference as the baseline. Set **SOFTWARE DEVELOPER** in oversized condensed type across warm paper, overlap it with the angled portrait, and put the name and CV on the left and the introduction and **Know Me Better** button on the right. The compact royal blue button has a separate downward arrow segment and links to About. At widths of 660px and below, center the two-line title and tilted portrait, and let the hero fit its content to tighten the gap before About.
- The site uses a fixed light palette with paper `#f7f2ea`, ink `#0a0a09`, and the exact royal blue `#0504AA` from the supplied swatch. Anton sets the headline and Geist sets the remaining type. Both fonts live in `src/fonts/`.
- Keep Home, About, Projects, Stack, Certificates, and Contact on the same page. Projects is the single work showcase. Keep About brief and in Froilan’s voice.
- Desktop navigation is a fixed, vertically centered list in the left gutter with no enclosing panel. Its labels are large, bold, and straight. As the active section changes, its link gains royal blue text and an animated rule. On smaller screens, a sticky header opens a compact Menu with thin dividers.
- The folder reference calls for recognizable tabbed folders with visible paper and an opening movement that fans real documents out of the folder. Those documents are the controls visitors select. The viewer shows the certificate image directly.

## Main interactions

**About.** Froilan introduces himself as a 22-year-old full-stack developer and describes what he is doing now and wants to build. The GitHub calendar shows his public contributions, with a profile link and a sync date. It uses more of the About column on desktop and starts at the most recent weeks on phones. Build time refreshes the snapshot.

**Projects.** Vigil opens the layered carousel and project index, with the latest supplied covers for Vigil, DŌU Cookie, and Melodix. Category filters narrow the carousel and index. All five filters share a row on phones, and a dropdown contains the project index. Arrows, keyboard controls, and mobile swipe move through the previews. The featured image, details button, and index entries open the project dialog with features, technology icons, available links, and a **Discuss project** button. Project fragments such as `#project-vg` let visitors share individual systems.

**Certificates.** The four folders are CyberSecurity (6), Cloud & Development (2), Competition (2), and Badge (5). Cloud & Development holds the AWS course and TESDA Computer Systems Servicing NC II credential. On desktop the four folders fit in a row. A typical phone layout shows two columns. Opening a folder reveals up to three clickable certificate previews with title, issuer, and date under **My Certificates**. Larger folders can page through the fanned previews. Back closes the folder and returns focus to its card. The section keeps its `#certifications` URL fragment.

Selecting a document opens an image lightbox. Folders with **three or more** documents offer a carousel in the lightbox with arrows, dot indicators, keyboard arrows, and horizontal swipe. Each slide updates the certificate metadata and its original, download, and verification links. X, Escape, or a click outside closes the lightbox and returns focus. The original PDF remains available through **Open original** and **Download**. The OpenAI Academy Codex badge shows “Date not listed” because its supplied artwork carries no date.

**Contact and archive.** The contact form opens an email draft in the visitor’s mail app. The older Christmas edition is available directly at `/christmas/`. The portfolio honors the visitor’s reduced motion setting.

## Source map

| Area | Files |
| --- | --- |
| App Router entry and page order | `src/app/layout.jsx`, `src/app/page.jsx`, `src/App.jsx` |
| Hero and shared design | `src/components/Hero.jsx`, `src/portfolio.css`, `DESIGN.md` |
| Navigation and shared page shell | `src/components/Navigation.jsx`, `src/components/PortfolioShell.jsx`, `src/lib/portfolioLinks.js` |
| Legacy redirects | `src/app/[page]/page.jsx`, `src/components/PortfolioRedirect.jsx` |
| About, Stack, and Contact | `src/components/About.jsx`, `src/components/GitHubContributions.jsx`, `src/components/TechStack.jsx`, `src/components/Contact.jsx`, `src/inner-pages.css` |
| Project overview, details, and media | `src/components/Projects.jsx`, `src/components/ProjectStackIcon.jsx`, `src/projects.css`, `src/data/portfolio.js`, `src/data/projectMedia.js` |
| Folders, lightbox, and records | `src/components/Certifications.jsx`, `src/components/Certifications.css`, `src/data/credentials.js` |
| Build and GitHub Pages workflow | `next.config.mjs`, `package.json`, `.github/workflows/deploy-pages.yml`, `PORTFOLIO_BUILD_GUIDE.md` |

Routes such as `/projects/` and hash bookmarks such as `/#/projects` resolve to the main page’s section anchor. A legacy URL such as `/projects/#project-ff` carries the project fragment through to the root route.

## Run and maintain

Use Node.js 22. In `C:/Portfolio`, run `npm ci` as needed and `npm run dev`, then open [the local preview](http://127.0.0.1:5173/). A normal production run uses `npm run build` and `npm start`. The build’s prebuild script refreshes the GitHub contributions data and allows a cached copy when the refresh fails.

The existing GitHub Pages workflow builds with `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/Portfolio`, then publishes `out/`. It runs on pushes to `main` or by manual dispatch. Pass the base path through when adding public asset URLs. Check the Actions tab in each repository for the deployment status.

- Run `npm run refresh:github` to refresh the About chart locally. The snapshot lives in `src/data/github-contributions.json`.
- Add credentials to `src/data/credentials.js`. Give each record a stable `id`, exact `category`, `title`, `issuer`, `kind`, and `date`. Paths are relative to `public/`. Use `image` for the thumbnail, optional `preview` for a larger certificate image in the viewer, `file` for a separate original PDF or image, and `url` for a confirmed issuer verification link. Image credentials can use the same image for display and download. For a new PDF, keep the original in `public/certificates/` and supply a still image preview so it can be read in the lightbox.
- The CV lives at `public/documents/Froilan-De-Vera-CV.pdf`. The hero uses `public/images/froilan-portrait.webp`, with the PNG retained as source. Project imagery lives in `public/images/projects/` with supplied JPGs retained beside WebP display copies. Keep the media data and image alt text aligned when replacing a project screenshot.
- Keep credentials and project claims tied to the supplied evidence. On future edits, preserve deep links, mobile swipe, keyboard focus return, reduced motion, and the fixed desktop nav position. Review the local preview and static export before publishing.
