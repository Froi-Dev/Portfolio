# Froilan De Vera Portfolio

A Next.js portfolio for Froilan De Vera, a full-stack developer building web, Windows, and Android applications.

## Run locally

Use Node.js 22 and run:

```sh
npm ci
npm run dev
```

Open [localhost:5173](http://localhost:5173). To test a production build, run `npm run build` followed by `npm start`.

## Browse the portfolio

The floating desktop menu brings the current section into focus. On smaller screens, **Menu** opens a list with thin dividers. Both link to the same scrolling page with a fixed light palette.

- **About** introduces Froilan, his current work, and what he wants to build. A compact GitHub activity calendar shows his public contributions and links to his profile. The hero’s **Know Me Better** button jumps to About.
- **Projects** slides the layered prints in the direction of travel when you use the arrows, arrow keys, or swipe. On phones, the category filters fit on one line and the project index opens on demand. Each project dialog shows the preview, features, stack icons, available links, and a **Discuss project** button.
- **Stack** lists the languages, frameworks, and tools used in the work.
- **Certificates** organizes documents into CyberSecurity, Cloud & Development, Competition, and Badge. Open a folder to see **My Certificates**, then select a preview to see its certificate image. The viewer has a carousel for folders with three or more certificates, with links to the original file and verification where available.
- **Contact** prepares a draft in the visitor’s email app.

The page respects your reduced-motion setting. Download the CV from the hero. The Christmas edition is available by visiting `/christmas/` directly.

## GitHub Pages

The existing workflow sets `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/Portfolio`, then publishes `out/`. A normal local build uses the root path. Project media, certificate files, and the CV load under either base path. Legacy routes such as `/projects/` and bookmarks such as `#/projects` resolve to `#projects`. A legacy project URL such as `/projects/#project-ff` opens the corresponding project on the single page.

See [DESIGN.md](DESIGN.md) for the current design system, the [build guide](PORTFOLIO_BUILD_GUIDE.md) for file locations, and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for component attribution.
