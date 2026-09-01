# RushEnd — AI Handoff Guide

**Prepared by Manus AI.** This document is the working brief for another AI or developer who needs to understand, run, edit, and extend the RushEnd webapp without access to the original conversation.

## 1. Product identity

RushEnd is a frontend-only queue-intelligence webapp for people who want to know how busy a place is before they travel. The landing experience is India-first: India is the default geography, and users can narrow the view by State/Union Territory and then District. The application is a static React experience with simulated live queue data; it is not yet connected to a production database, geolocation service, or live maps API.

The visible brand name is **RushEnd**, and the package metadata now uses `rushend`.

## 2. Visual direction

The chosen design movement is **Signal Cartography**: an operations-room interface where the map is the canvas and crowd signals are treated as civic infrastructure. The page uses a near-black field, faint route geometry, grid and contour traces, crisp tabular wait numerals, compact eyebrow labels, and restrained motion. The current accent family follows the supplied logo: orange `#ff8a2b`, coral/orange `#ff9b18`, pink `#ff5cc8`, violet `#a43dff`, plus muted blue-green neutrals for personal actions and low-emphasis text.

Typography is loaded in `client/index.html`: Space Grotesk for display/headline text and Work Sans for body/interface text. The landing page should feel editorial and instrument-like rather than like a generic SaaS dashboard. Preserve strong contrast: light text on dark backgrounds, amber/orange for decisions and alerts, pink/violet for identity and location signals, and green only when it carries a deliberate status meaning.

> Core interaction rule: the map should feel alive, but motion must communicate signal or state. Avoid decorative animation that does not explain a queue, route, selection, or transition.

## 3. Runtime architecture

The runtime starts at `client/src/main.tsx`, which mounts `client/src/App.tsx`. `App.tsx` composes the dark theme, `QueueProvider`, tooltip/toast providers, the intro video overlay, and the Wouter route tree. `AppShell.tsx` provides the persistent desktop rail, mobile header, mobile bottom dock, and route-aware breadcrumb.

| Layer | File | Responsibility |
| --- | --- | --- |
| Entry | `client/src/main.tsx` | React root mount. |
| App composition | `client/src/App.tsx` | Providers, intro overlay, and routes. |
| Shell | `client/src/components/AppShell.tsx` | Persistent navigation and responsive chrome. |
| Queue state | `client/src/contexts/QueueContext.tsx` | Simulated live count changes. |
| Data model | `client/src/lib/queueData.ts` | Queue types, seeded locations, Indian states, districts, and area scoping. |
| Map canvas | `client/src/components/MapSurface.tsx` | Dark cartographic map, markers, route traces, and active-area summary. |
| Intro | `client/src/components/RushEndIntroOverlay.tsx` | Supplied intro video over the mounted app. |
| Global styles | `client/src/index.css` | Tokens, typography helpers, map texture, responsive rules, and intro-video styling. |

The unused `client/src/components/RushEndVideoIntro.tsx` file is retained as a historical alternative. The active overlay is `RushEndIntroOverlay.tsx`.

## 4. Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Home.tsx` | India-first landing map with state/district selectors and queue cards. |
| `/plan` | `PlanPage.tsx` | Multi-stop plan builder and saved-time estimate. |
| `/discover` | `DiscoverPage.tsx` | Quiet-place discovery by time window. |
| `/community` | `CommunityPage.tsx` | Informal place contribution flow. |
| `/profile` | `ProfilePage.tsx` | Activity, saved places, and contribution view. |
| `/location/:id` | `LocationPage.tsx` | Location history, trends, and trust indicators. |
| `/404` | `NotFound.tsx` | Useful fallback route. |

## 5. India geography behavior

`client/src/lib/queueData.ts` defines the `INDIA_AREAS` structure. The selector flow in `Home.tsx` is intentionally cascading:

1. The default country view is `India` with all areas selected.
2. Choosing a State/Union Territory filters the district options.
3. Choosing a District narrows the active label and queue location set.
4. The map, top summary, search placeholder, location cards, and detail drawer use the selected area.

The current district lists are representative options for the static demo rather than an exhaustive national directory. `india-geography-sources.md` records the public references used to ground the state/district hierarchy. A production implementation should replace the curated list with a maintained administrative-boundary or geography API and add explicit loading/error/empty states.

## 6. Intro video behavior

The active component is `client/src/components/RushEndIntroOverlay.tsx`. It mounts the real landing page underneath and renders the supplied intro video above it. The active video asset is packaged locally at:

`client/public/assets/rushend-intro.mp4`

The wrapper is muted, inline, autoplay-enabled, and responsive. On video completion or playback error it fades out and unmounts so the landing page remains visible. The page should never be replaced by a blank white screen. To swap the clip, update the `introVideo` constant and keep `preload="auto"`, `muted`, and `playsInline` unless browser policy requirements change.

## 7. Assets

The deployed asset references currently used by the frontend are:

| Asset | Repository path | Used by |
| --- | --- | --- |
| RushEnd logo | `client/public/assets/rushend-logo.png` | Favicon and desktop/mobile shell mark. |
| Intro video | `client/public/assets/rushend-intro.mp4` | `RushEndIntroOverlay.tsx`. |
| Queue hero image | `client/public/assets/queue-hero.webp` | Landing hero background. |
| Route detail image | `client/public/assets/route-detail.svg` | Route-planning imagery. |

The GitHub Pages build is self-contained: Vite copies the assets above into the published artifact, and `client/src/lib/sitePaths.ts` prefixes runtime asset paths with the active deployment base URL.

## 8. Local development

From the project root:

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm check
pnpm build
pnpm format
```

The expected application is a React 19 + Vite + Tailwind 4 frontend using TypeScript, Wouter, Lucide React, Framer Motion, Recharts, and shadcn/ui primitives. The project includes the `MapView` scaffold in `client/src/components/Map.tsx`, but the current landing experience uses the custom visual `MapSurface` rather than a live Google map.

## 9. Safe editing rules for another AI

Keep `server/` unchanged for frontend-only work. Reuse the existing shadcn/ui primitives in `client/src/components/ui/` before introducing new interaction primitives. Keep page-specific composition in `client/src/pages/` and shared behavior in `components/`, `contexts/`, and `lib/`.

When changing the brand, update the visible wordmark, image alt text, document title, metadata, favicon path, and relevant comments together. Do not rename persistent storage URLs unless the asset is re-uploaded. When changing queue behavior, update both the shared data model and the UI that consumes it; avoid creating a second competing source of truth.

Never fabricate reviews, ratings, testimonials, or user-generated contribution counts. Existing queue counts, activity entries, and locations are clearly static demo data and should be replaced with real data before production claims are made.

For visual changes, preserve responsive behavior at desktop and phone widths. For animation changes, support `prefers-reduced-motion`, avoid animating layout properties when transform/opacity is sufficient, and always leave the landing page mounted underneath overlays.

## 10. Known limitations and next build targets

The app currently simulates live queue changes in `QueueContext.tsx`; it does not authenticate users, persist check-ins, load live queues, or render authoritative geographic boundaries. The intro video is hosted through persistent web storage and is not bundled into the repository’s `client/public` directory. The package is suitable for UI iteration and handoff, but a production release needs a backend, real place/queue data, administrative geography, geolocation permission flow, and privacy/consent handling.

The most useful next implementation is a data adapter that replaces the seeded locations while preserving the existing `QueueLocation` type and area selector API. Follow that with a real boundary layer for India, then add authenticated check-in writes and server-side trust/recency calculations.

## References

[1]: https://igod.gov.in/sg/district/states "Government of India state and district directory"

[2]: https://www.india.gov.in/explore-india/facts-of-india/states-ut-districts "India.gov.in states, union territories, and districts"

[3]: https://censusindia.gov.in/census.website/data/population-finder "Census of India Population Finder"

[4]: https://data.humdata.org/dataset/geoboundaries-admin-boundaries-for-india "Humanitarian Data Exchange geoboundaries for India"
