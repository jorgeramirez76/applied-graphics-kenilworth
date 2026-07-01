# Visual Assets — Source, Rights, Edits, Alt Text, Placement

**Rights policy:** Every project photo is Applied Graphics' own published work (or its clients' branded vehicles), sourced from the company's public gallery/social. None are licensed to us yet, so **all are marked `needs-permission`** in the UI ("Photo pending approval") and must be confirmed — ideally replaced with high-resolution originals — before public launch. The hero/about image is AG's **own** company van (lowest risk). No unrelated third-party copyrighted images are used for decoration.

**Originals:** untouched copies live in `/assets/raw` (never modified).
**Optimized exports:** `/public/images/*.webp` via `scripts/process-images.mjs` (brighten +7%, saturation +8%, gentle contrast, light sharpen, resized **without upscaling**, WebP q84).

## Project photos
| Optimized file | Raw source file | Source | Permission | Edits | Alt text | Placement |
|---|---|---|---|---|---|---|
| applied-graphics-company-van.webp | site03.jpg | AG public gallery — AG's **own** van | own-brand-asset (confirm) | enhance/sharpen/webp | "Applied Graphics' own branded company van — a live example of a full-color vehicle wrap" | Home hero, About |
| hilltop-bicycles-van-wrap.webp | p01_hilltop_bicycles.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Black Ram ProMaster van wrapped with the Hilltop Bicycles wordmark and green monogram" | Portfolio, Home featured |
| metroplus-health-mobile-unit.webp | p02_health_bus.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Orange MetroPlus Health mobile outreach vehicle with Apply Here For Health Insurance messaging" | Portfolio, Home featured |
| crush-covid-mobile-unit.webp | p08_post8.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Navy CRUSH COVID mobile treatment center trailer with Get Tested, Get Treated messaging" | Portfolio, Home featured |
| garage-kings-box-truck.webp | p03_garage_sign.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Black box truck wrapped with the gold Garage Kings crest and Premium Garage Floors branding, South River NJ" | Portfolio |
| door-boy-van.webp | p09_post9.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "White Door Boy cargo van with lettering listing garage-door services and a large phone number" | Portfolio |
| mr-joe-fix-it-van.webp | p04_joe_fix_it.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "White Nissan NV van with Mr. Joe Fix It handyman branding, mascot and phone number" | Portfolio |
| jeep-color-change.webp | p05_color_change.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Black Jeep Patriot photographed before a color-change wrap, marked Before" | Portfolio |
| holden-color-change.webp | p06_post6.jpg | AG public gallery/social | needs-permission | enhance/sharpen/webp | "Metallic blue performance sedan with a fresh color-change wrap inside the Applied Graphics shop" | Portfolio |

## Generated brand art (not photos — created by us, safe to use)
| File | What | Notes |
|---|---|---|
| public/og.jpg | 1200×630 Open Graph card | Typographic brand card (name, tagline, phone). Generated, no photo. |
| src/app/icon.png / apple-icon.png | Favicon / app icon | "A" monogram on ink with red slash. Generated. |

## Placeholder (no image rehosted)
Disney "Phineas & Ferb" Tour, NBC Munchies food truck, Roush Stage 3 race car → shown as **placeholder cards** on /portfolio with category + "image to be supplied." Named/sourced from AG's own site or public review; high-res originals pending.

## Quality caveat
The available public photos are low-resolution (≤640 px). They are sharp at card size but should be replaced with high-resolution originals from Applied Graphics for hero/large use. This is the **#1 launch checklist item**.

## Image quality note (limitation)
A handful of duplicate angles existed (e.g., a second Garage Kings shot, `p07`); only the best frame per project was used to avoid repetition.
