# RushEnd design brainstorm

## Three stylistic approaches

### Approach 1 — Signal Cartography
**Very Brief Intro:** A dark, map-first interface that treats crowd levels as a living civic signal. Calm, legible data surfaces sit over a textured city grid, with restrained motion that communicates change rather than decoration.
**Probability:** 0.07

### Approach 2 — Civic Noticeboard
**Very Brief Intro:** A high-contrast, paper-and-ink inspired service interface with warm off-white surfaces, stamped status marks, and a public-information tone. Feels approachable and local, like the best noticeboard at a train station.
**Probability:** 0.04

### Approach 3 — Transit Glass
**Very Brief Intro:** An atmospheric midnight interface with translucent panels, luminous route traces, and a premium mobility-app feel. More cinematic than utilitarian, but still anchored by crisp timetable-style numerals.
**Probability:** 0.02

## Selected direction: Signal Cartography

### Design Movement
Contemporary cartographic modernism: civic wayfinding systems, transit control rooms, and live information maps distilled into a personal decision tool.

### Core Principles
1. **The map is the canvas.** The home screen should feel like a living city surface, not a stack of SaaS cards.
2. **Signals earn their color.** Teal, amber, and coral communicate crowd state consistently; slate-blue is reserved for the user's own actions and position.
3. **Verdicts over dashboards.** Numbers are scannable, but every important number comes with a plain-language recommendation.
4. **Motion follows reality.** Pulses, fills, flashes, and route movement represent live change only.

### Color Philosophy
Near-black #0E1210 makes the map feel continuous and gives the three crowd states authority. Teal #1D9E75 reads as breathing room, amber #BA7517 as a caution flag, and coral #D85A30 as a human-scale warning rather than an alarm. Slate-blue #378ADD belongs only to “you are here” and “your action,” preserving a distinct personal layer. Off-white text is softened enough to feel calm against the dark field.

### Layout Paradigm
Use a persistent left rail on desktop and a bottom dock on mobile. The map occupies the largest uninterrupted surface; utility controls float at its edges while detail appears as a sliding right panel or bottom sheet. Secondary pages keep the same rail and use offset editorial columns rather than centered marketing grids.

### Signature Elements
- A “city grain” layer: thin road-like lines, contour arcs, and paper-noise texture behind map points.
- Crowd pulses: soft halo rings that expand slowly from location dots, with labels that pair color and words.
- Departures-board numerals: tabular figures, generous tracking, and high-contrast count blocks for waits and people in line.

### Interaction Philosophy
Every interaction should answer “what should I do next?” Clicking a map dot opens an actionable verdict. Check-in is an immediate, visible contribution. Filters narrow the city without hiding context. Buttons feel like controls in a calm operations room, not promotional calls to action.

### Animation
Entrance layers use subtle upward fades and clipped reveals. Map dots breathe on a long 3.8–5.5s cycle; updates briefly flash the affected number and nudge the queue fill rather than replacing it abruptly. Drawers enter from their edge over 260ms with a strong ease-out. Route lines draw only when a plan is built. All non-essential animation is disabled under `prefers-reduced-motion`.

### Typography System
Headlines use **Space Grotesk** at 600–700 with tight tracking and occasional sentence-case emphasis. Body and interface copy use **Work Sans** at 400–600 for warmth and clarity. Metrics use Work Sans with `font-variant-numeric: tabular-nums`, slightly larger and heavier than labels. Hierarchy: 11px uppercase eyebrow, 13px utility, 15px body, 18–24px section heads, 42–72px hero display.

### Brand Essence
**RushEnd is a live city-wide waiting compass for people who would rather arrive at the right time than stand around.** Personality: observant, dry-witted, civic-minded.

### Brand Voice
Headlines are direct and specific. CTAs sound like a smart friend making the next move obvious. Microcopy is concise, useful, and lightly dry; never corporate.

Example lines:
- “The bank is having a day. Give it 24 minutes.”
- “You’re not late. You’re early for the quiet window.”

### Wordmark & Logo
A custom lowercase wordmark set in Space Grotesk with the “q” tail extended into a short route line. The mark is a bold pin/queue hybrid: a circular dot with two offset signal arcs, suggesting one place viewed over time. No text inside the symbol.

### Signature Brand Color
**Queue Teal — #1D9E75.** Ownable, practical, and immediately associated with a low-crowd “go now” signal.

## Style Decisions
- Use the selected Signal Cartography direction across the entire app.
- Keep crowd status strictly teal / amber / coral; never introduce a fourth status color.
- Keep slate-blue exclusive to the user's position and action controls.
- Prefer map surfaces, route lines, and offset utility panels over generic centered cards.
- Keep the lowercase RushEnd wordmark and pin/queue symbol visible in persistent app chrome; breadcrumbs are secondary orientation only.
- Treat the desktop left rail as the recurring civic-control-room anchor, with top-right controls kept secondary.
- Give every non-home route at least one cartographic cue: city grain, route trace, contour wash, map slice, coordinate divider, or signal field.
- Hero imagery must be a queue/line, never a generic city scene; darken it enough for calm text contrast.
