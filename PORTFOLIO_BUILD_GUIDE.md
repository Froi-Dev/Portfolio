# Portfolio build guide

The portfolio uses the Next.js App Router and React. Start development with `npm run dev` and open port 5173. Use `npm run build` and `npm start` for a local production check.

| Responsibility | Source |
| --- | --- |
| Metadata, fonts, tokens, and shared page styles | `src/app/layout.jsx`, `src/portfolio.css` |
| Home and its six sections | `src/app/page.jsx`, `src/App.jsx` |
| Navigation and legacy bookmarks | `src/components/Navigation.jsx`, `src/components/PortfolioRedirect.jsx`, `src/app/[page]/page.jsx` |
| Project showcase, category filters, index, and details | `src/components/Projects.jsx`, `src/projects.css`, `src/data/projectMedia.js` |
| Project descriptions and tech stack data | `src/data/portfolio.js` |
| Contact, About, credentials, and stack styles | `src/inner-pages.css`, component-specific styles |
| CV and certificate records | `src/data/credentials.js` |
| Seasonal archive and optional playback | `src/app/christmas/page.jsx`, `src/components/HolidayExperience.jsx`, `src/lib/winterScene.js` |

The root route statically renders the light portfolio. The floating menu and mobile drawer link to the section IDs. Legacy routes forward to the root with a section or project fragment. Client components handle project and credential dialogs, folder selection, email draft creation, and playback in the Christmas archive. Static files under `public/` use `NEXT_PUBLIC_BASE_PATH` in their URLs. Keep the supplied project JPGs and portrait PNG as source artwork and update the corresponding WebP display assets when replacing them.

Add a certificate or badge to the `credentials` array in `src/data/credentials.js`. Set its category, title, issuer, date, and thumbnail path. Use `file` for a separate original image or PDF, `preview` for a larger image in the viewer, and `url` when the issuer provides a verification link.

For a GitHub Pages build, set `STATIC_EXPORT=true` and `NEXT_PUBLIC_BASE_PATH=/Portfolio`. Verify the output under the same prefix when serving `out/` locally. Test section anchors, legacy bookmarks, project filters, Previous and Next, direct project links, keyboard focus in dialogs, certificate previews, the CV response, and the email draft action before publishing.
