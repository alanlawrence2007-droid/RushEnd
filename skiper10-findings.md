# Skiper10 verification

Inspected `https://skiper-ui.com/v1/skiper10` and `https://skiper-ui.com/v1/preview/skiper10` on 2026-08-31.

The page identifies Skiper10 as **Double stairs preloader**, with dual-direction staircase animations. It lists `framer-motion` as a dependency and shows the exact install command `pnpm dlx shadcn add @skiper-ui/skiper10` under **Install via Pro CLI**, which requires a Pro license key.

The install command was attempted in `/home/ubuntu/queueless`. The Skiper registry returned `https://skiper-ui.com/registry/skiper10.json` not found, so the component could not be fetched automatically. The preview is accessible, but source code is not exposed in the page content without the Pro CLI/license flow.
