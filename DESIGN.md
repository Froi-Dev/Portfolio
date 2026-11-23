---
name: Froilan De Vera
description: A portrait-led software portfolio with warm paper, dense display type, and full-color project previews.
colors:
  paper: "#f7f2ea"
  ink: "#0a0a09"
  muted: "#49453f"
  surface: "#fffcf7"
  raised-paper: "#eee7dc"
  rule: "#d8cfc1"
  field-rule: "#85796c"
  royal-blue: "#0504aa"
  royal-blue-hover: "#03037e"
  action-ink: "#ffffff"
  portrait-paper: "#f5e7db"
typography:
  display:
    fontFamily: "Anton, Impact, sans-serif"
    fontSize: "16.6cqw"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  heading:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.625rem)"
    fontWeight: 730
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  control:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 550
  hero-action:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(0.94rem, 1.9cqw, 1.35rem)"
    fontWeight: 740
    lineHeight: 1.18
    letterSpacing: "-0.022em"
rounded:
  small: "3px"
  split-action: "0.45rem"
  portrait: "clamp(0.65rem, 1.7cqw, 1.25rem)"
spacing:
  nav-height: "4.5rem"
  nav-width: "clamp(9.5rem, 12vw, 10.5rem)"
  gutter: "clamp(1.125rem, 4.7vw, 5rem)"
  wrap: "89rem"
  button-inset: "0.625rem 1.125rem"
components:
  button-accent:
    backgroundColor: "{colors.royal-blue}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.split-action}"
    typography: "{typography.hero-action}"
    padding: "0.7rem clamp(0.65rem, 1.55vw, 1.15rem)"
    height: "3.2rem"
  button-accent-hover:
    backgroundColor: "{colors.royal-blue-hover}"
  button-primary:
    backgroundColor: "{colors.royal-blue}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.small}"
    typography: "{typography.control}"
    padding: "{spacing.button-inset}"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    typography: "{typography.control}"
    padding: "{spacing.button-inset}"
    height: "48px"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    typography: "{typography.body}"
    padding: "10px 12px"
    height: "46px"
  media:
    backgroundColor: "{colors.raised-paper}"
    rounded: "{rounded.small}"
  portrait:
    backgroundColor: "{colors.portrait-paper}"
    rounded: "{rounded.portrait}"
---

# Design System for Froilan De Vera

## Overview

**Creative North Star** — A typographic portrait opens a working portfolio.

The supplied reference sets the visual character. A condensed role headline spans warm paper. Froilan’s photograph crosses its lower edge like a printed portrait, with the name and actions set in a bold neutral sans. The supplied royal blue identifies Know Me Better, the hero button that links to About.

The scrolling portfolio carries the paper and ink treatment from the portrait hero through About, Projects, Stack, Certificates, and Contact. Project and document images retain their original colors. The shared source is `src/portfolio.css`.

**Key Characteristics**

- Condensed display type and bold sans-serif labels
- A fixed light palette with warm paper, near-black controls, and royal-blue primary actions
- A tilted portrait print and aligned sections on one page

## Colors

Near-black ink carries the labels and navigation. The supplied royal blue `#0504aa` marks primary actions, the active section, text links, and focus.

| Role | Color |
| --- | --- |
| Page | `#f7f2ea` |
| Text | `#0a0a09` |
| Muted text | `#49453f` |
| Surface | `#fffcf7` |
| Quiet surface | `#eee7dc` |
| Rule | `#d8cfc1` |
| Field border | `#85796c` |
| Primary fill and border, links, focus, and selection fill | `#0504aa` |
| Primary button hover fill | `#03037e` |
| Primary button and selection text | `#ffffff` |
| Portrait paper | `#f5e7db` |

## Typography

Anton sets the condensed role headline. Geist serves the name, section headings, body copy, labels, navigation, and controls. Both fonts are served locally from `src/fonts/`.

The poster line is all caps and fits across the desktop container at 16.6cqw with horizontal compression. The full name is set in Geist at weight 800. Section headings use Geist at weight 730. Keep reading text and functional labels in live type and use real headings for section structure.

## Layout

Use the shared `.wrap` container with an 89rem cap. At widths of 1100px and heights of 560px or more, leave the large, straight section links clear of the content in the left gutter. At other sizes, the sticky header opens a compact Menu with the same prominent type. The home role title spans the hero above three columns for the name, portrait, and introduction. At 660px and below, center the two-line title and the portrait above the name and introduction. Let the hero fit its content with 1.5rem of bottom padding. At 380px, the name and introduction stack.

About pairs a short introduction with what Froilan is doing now, what he wants to build, and a compact GitHub contribution calendar. In Projects, a layered screenshot sits to the left of the active system’s name, summary, and navigation. At 790px, the screenshot moves above the copy. The desktop project index gives each matching project a direct entry, and the phone index opens on demand. About and Contact stack at 700px.

## Elevation & Depth

Flat surfaces and one-pixel rules provide most separation. The portrait casts a shadow of `0 .55rem 1.1rem var(--sheet-shadow)` to register as a physical print over the headline. Dialogs use a tinted backdrop so the parent view remains recognizable.

## Shapes

Work previews and dialogs use a 3px radius. Preserve the natural aspect ratio of full screenshot previews. The hero portrait tilts clockwise by 9° on desktop and 8° on phones, with rounded corners and a warm print backing.

## Components

### Buttons and links

Primary buttons use the royal blue fill and white text. Know Me Better pairs a compact text segment with a separated downward arrow. Discuss project uses a primary button in the project dialog. The CV action is an underlined link beneath the name. The visible focus outline is 2px with a 4px offset.

### Navigation

The desktop section links stay vertically centered together in the left gutter. Every label stays straight, large, and bold. Thin rules separate the links, and the active link gains royal blue text and an animated rule. The mobile drawer uses a ruled list with section targets offset below the sticky header. Smooth menu jumps, section dividers, and the top reading progress line respect reduced motion.

### Project showcase

The visible screenshot belongs to the active system. Previous, Next, keyboard arrows, and a horizontal swipe move through the selected category. The prints exchange positions in the direction of travel, with the summary following the same direction. The screenshot, the details button, and the project’s entry in the index each open the project dialog. The dialog pairs the screenshot with its summary and groups the features and stack icons below. It returns focus to the control that opened it. The five categories fit in one row on phones. The selected category inverts the page’s ink and paper colors and exposes its pressed state.

### Certificate folders

Use four tabbed folders for CyberSecurity, Cloud & Development, Competition, and Badge. The folders fit in a desktop row and keep their tabs and visible papers on small screens. Under My Certificates, up to three clickable previews rise from the open folder. Larger folders can page through their previews. The lightbox shows the certificate image and retains links to the original and verification. Folders with at least three certificates also have a lightbox carousel with arrows, touch swipes, and dots.

### Contact fields

Labels sit above the fields. The field fill uses the page color and the border strengthens on hover and focus. The two short inputs fit side by side where there is room. The message field spans the form.

## Do's and Don'ts

- **Do** keep concurrent choices and their labels readable at narrow widths.
- **Do** preserve the supplied colors and content of project previews.
- **Do** keep focus visible and make motion optional for reduced-motion visitors.
- **Do** let the featured project print settle flat, with the neighboring prints angled behind it.
- **Don't** put navigation over the work or cover form controls with fixed chrome.
