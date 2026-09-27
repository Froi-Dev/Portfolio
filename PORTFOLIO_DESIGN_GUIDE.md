# Designing a portfolio with this theme

This guide explains the visual decisions behind this portfolio and how to apply them to your own work. It describes the current local implementation; the companion [build guide](PORTFOLIO_BUILD_GUIDE.md) explains where and how to implement it.

## 1. Start with the visual direction

The style combines a dark editorial layout with a green accent, restrained glass surfaces, monochrome pixel texture, and small interactive details. Large headings introduce each page; compact labels, borders, and generous spacing organize the supporting content.

The identity is the person's name. Use a readable text wordmark rather than a separate initials logo. Keep the introduction specific: your role, what you build, a short description, and a clear route to your projects.

Build the page hierarchy first. Add decorative effects after the content, navigation, and actions work well without them.

## 2. Define a shared color palette

Use CSS custom properties so every page changes together when switching themes. These are the base values in `src/styles.css`:

| Token | Dark theme | Light theme | Purpose |
| --- | --- | --- | --- |
| `--bg` | `#0c0c0f` | `#ffffff` | Page background |
| `--fg` | `#f4f4f5` | `#0a0a0a` | Headings and primary text |
| `--muted` | `#a0a0a8` | `#737373` | Supporting descriptions |
| `--faint` | `#777780` | `#767676` | Small secondary details |
| `--surface` | `#141418` | `#fafafa` | Cards and forms |
| `--surface-2` | `#1e1e22` | `#f3f3f3` | Secondary controls |
| `--border` | `#2a2a30` | `#e9e9e9` | Subtle separators |
| `--accent` | `#34d399` | `#16a34a` | Highlights, active states, and motion details |

Primary buttons use green with dark text in dark mode. In light mode, the final styles use a deeper `#167a41` with white text. Treat button color as its own readability decision rather than automatically using the same green for every purpose.

Use the accent sparingly: active navigation, primary actions, a heading's punctuation, and small indicators. Let most of the screen remain neutral.

## 3. Establish a typography hierarchy

| Role | Font in this portfolio | Treatment |
| --- | --- | --- |
| Name and headings | General Sans | Medium or semibold, compact line height, slightly tight tracking |
| Body and controls | Inter | Clear, regular text with comfortable line spacing |
| Section numbers and metadata | IBM Plex Mono | Small labels with light letter spacing |

The hero name is the largest text, with responsive sizing that reaches 80px on larger layouts. Project names are around 21–27px. Contact headings scale around 30–43px. Supporting text is generally smaller, while form inputs use 16px.

Keep paragraphs short. A project needs a name, a one-sentence benefit, a few technology tags, and an action. Put longer descriptions and feature lists in the project dialog.

Reserve the final text dimensions before animating letters. Otherwise, a scrambling or reveal effect can shift nearby buttons and paragraphs.

## 4. Plan the navigation and page layout

This portfolio uses six separate views:

1. **Home:** name, role, introduction, portrait, actions, and summary figures.
2. **About:** a short personal introduction and an interactive note.
3. **Projects:** category filters, a carousel, and project detail dialogs.
4. **Stack:** grouped technology cards.
5. **Certifications:** real credentials or a clear empty state.
6. **Contact:** introductory copy, email, social links, and a message form.

On desktop, use a fixed sidebar and a bounded content area. The sidebar is normally 224px wide, with a narrower desktop variation. Main content is capped near 1060px; the home view allows up to 1100px.

At 900px and below, switch to a fixed name/theme header and bottom navigation. Reserve space above and below the page so those fixed elements do not cover the content. Include device safe-area insets.

Use a consistent spacing vocabulary. This implementation frequently uses 8–12px within controls, 16–24px within cards, and larger gaps between content groups. Match alignment before adding more decoration.

## 5. Use surfaces to separate content

Use solid surfaces for project cards, forms, and important buttons so the background texture cannot compete with their content. Glass styling works well for secondary panels and navigation when text remains clear.

A typical card combines:

- A neutral surface color.
- A thin border.
- A restrained shadow.
- Rounded corners, usually around 12–20px.
- Consistent interior padding.

Avoid making every surface transparent. Primary actions should be recognizable without hover. Use local SVGs for essential controls so arrows, playback, close, and copy actions do not depend on an external icon font.

## 6. Add a quiet background texture

The background combines a static grain SVG and a monochrome PixelBlast animation. It sits behind the content and ignores pointer events.

The current animation uses white pixels in dark mode and black pixels in light mode. Its layer opacity is approximately 18% in dark mode and 15% in light mode. Pixel sizes are 6px on desktop and 8px in compact layouts. Ripples and liquid distortion are disabled.

Keep the effect subtle enough that you notice the heading first. If text becomes harder to read, reduce the texture opacity or give the text group a solid surface. Keep the static texture available when WebGL is unavailable or the visitor prefers reduced motion.

## 7. Make the project carousel feel calm

The current carousel uses consistent card content and dimensions while sliding horizontally. Adjacent cards stay visible so visitors can understand that more projects are available.

| Setting | Current implementation |
| --- | --- |
| Card width | Up to 440px; based on the carousel's available width |
| Narrow container width | 82% of available width below 560px |
| Wider container width | 58% of available width, capped at 440px |
| Card gap | 14px in narrow containers, otherwise 24px |
| Adjacent card scale | `0.94` |
| Slide duration | `0.65s` |
| Easing | `[0.22, 1, 0.36, 1]` |
| Stage height | 432px; 452px at viewport widths of 600px or less |
| Autoplay interval | 6 seconds when playback is allowed |

Animate position and scale. Keep text and preview content mounted while a card moves. Animating a full card into a skinny strip makes its content reflow and produces a distracting transition.

Place previous, next, and pause controls above the cards, where they are easy to find. Put project selectors below. Support keyboard arrows, swipe gestures, and direct project selection.

If you add longer descriptions or more tags, revisit the card height. The dimensions above fit the current content; they are not a guarantee for every possible text length or zoom setting.

## 8. Align the contact area as one composition

On wide layouts, place the heading, introduction, email, and social links in the left column. Put the form in the right column and align both columns to the top.

Group the heading with the contact details rather than giving it a separate full-width row that pushes the form downward. Use consistent field spacing and let name/email fields share a row only when they have enough room.

On narrower layouts, stack the contact copy above the form. Keep the email and copy button together where possible. Ensure the submit action remains reachable above the fixed bottom navigation when scrolled into view.

The current form opens an email draft. Its interface says this explicitly; it does not claim that a server has delivered a message.

## 9. Give motion a purpose

Use page entrances to establish hierarchy and carousel motion to show where content moves. Keep optional effects, such as portrait dithering and orbiting technology logos, secondary to the content.

The section reveal moves upward by 18px over 0.65 seconds. The technology orbit completes a cycle in 18 seconds. Both are restrained enough to avoid competing with the main actions.

Honor reduced-motion preferences. Pause carousel autoplay during hover, keyboard focus, open dialogs, offscreen states, and hidden tabs. Provide a pause button for continuous decorative motion.

## 10. Review before sharing

- Check both light and dark themes without relying on hover to reveal controls.
- Check a wide desktop, a short laptop window, a tablet, and a narrow phone.
- Check the longest project title and description, not just the shortest card.
- Navigate using Tab, Enter, Escape, and arrow keys.
- Check reduced motion and the static image/background fallbacks.
- Replace sample text, statistics, email addresses, project previews, and links with your own accurate content.
- Keep a clear distinction between interface concepts and screenshots of working projects.

## Reusable design brief

Use this brief when adapting the style for another portfolio:

> Create a responsive personal portfolio with a charcoal dark theme, an optional white light theme, and a restrained green accent. Use the person's full name as the wordmark. Combine large sans-serif headings, readable body text, small monospace labels, thin borders, rounded cards, and generous spacing. Use a fixed desktop sidebar and a mobile header with bottom navigation. Include Home, About, Projects, Stack, Certifications, and Contact views. Make project cards compact enough to reveal neighboring projects and slide them smoothly without changing their internal layout. Keep buttons solid and readable, align contact content beside the form, and add subtle monochrome pixel texture with reduced-motion and static fallbacks. Use real personal content and clearly identify any placeholders.
