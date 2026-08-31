# Vaqo build checklist

## Supplied video intro and palette cleanup

- [x] Upload and wire `rushend-logo-intro.mp4` as the only intro layer.
- [x] Remove the custom Vaqo preloader component from the app tree.
- [x] Ensure the landing page is visible behind the video instead of a blank/white screen.
- [x] Remove remaining green text and accents in favor of the supplied logo palette.
- [x] Validate video fallback, transition, and responsive rendering; save a new checkpoint.


## Deterministic preloader and logo-palette correction

- [x] Make the preloader a solid, deterministic timed sequence that cannot vanish early.
- [x] Show the supplied logo clearly, fade it out, then slide the left and right black halves outward.
- [x] Replace green webapp accents with the supplied logo’s orange, coral, pink, and violet palette.
- [x] Validate fresh-load behavior and save a new checkpoint.


## Timing and palette revision

- [x] Keep the Vaqo preloader visible for at least five seconds before the reveal.
- [x] Re-theme the web app around logo-inspired greens with orange, pink, and violet highlights.
- [x] Verify contrast and responsive rendering after the palette change.
- [ ] Save a new checkpoint for the revision.


## Vaqo rebrand and preloader revision

- [x] Upload and wire the user-provided Vaqo logo as the brand mark and favicon.
- [x] Replace Queueless naming with Vaqo across the visible app chrome and metadata.
- [x] Rebuild the first-load sequence as black screen → centered logo fade → smooth left/right center-split reveal.
- [x] Validate the renamed first-load experience and save a new checkpoint.


## Preloader revision

- [x] Replace the unstable stepped strips with stable center-opening stair panels.
- [x] Keep the cover and reveal centered, mirrored, and glitch-free.
- [x] Verify that the landing page becomes visible only after the panels clear the center.

- [x] Slow the preloader sequence so the copy, cover, hold, and reveal are all readable.
- [x] Rebuild the two stair panels with staggered heights and mirrored timing.
- [x] Confirm the stair cover fully exits before the landing page becomes interactive.

- [x] Show the preloader on every full page load instead of once per session.
- [x] Keep the Queueless headline visible before the two stair panels animate away.
- [x] Confirm the website appears only after the full preloader sequence finishes.

- [x] Add a Queueless-branded Double stairs-style preloader before the landing page.
- [x] Use the landing-page copy in the preloader and reveal the app only after the sequence completes.
- [x] Respect reduced motion and provide a skip affordance.
- [x] Validate first load and save a new checkpoint.

- [x] Wire the hero video element with a replaceable source and generated queue still fallback.
- [x] Build the persistent desktop rail and mobile bottom navigation.
- [x] Implement the live map canvas with crowd-coded pulsing locations, search, and filters.
- [x] Implement the slide-in location detail panel with verdict, queue visualization, metrics, chart, and check-in/check-out actions.
- [x] Add Plan my day, Discover, Community, Profile, and location analytics views.
- [x] Add simulated live count updates and QR-style check-in confirmation.
- [x] Add accessible focus states, reduced-motion behavior, and responsive bottom-sheet detail view.
- [x] Run typecheck/build and capture representative desktop/mobile screenshots.
- [ ] Create the final checkpoint for delivery.
