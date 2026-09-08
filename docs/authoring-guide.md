# Authoring guide

Every field in the six files, what it decides, and where the limits are. The schemas are the authority; this is the map.

Start by copying [`template/`](../template/) — it is a valid Canon with sensible values, so you can change one thing at a time and re-validate.

## manifest.json

| Field | Notes |
|---|---|
| `id` | Lowercase, digits and hyphens, ≤ 64 chars. Must match the folder name. |
| `name` | What a person calls it. |
| `author` | You. Kept intact when someone forks. |
| `homepage` | Optional URL. |
| `license` | Required. `MIT` for submissions here. |
| `basedOn` | Optional. The `id` of the Canon yours derives from. |
| `version` | Semver. Immutable once published. |
| `tier` | `community` for submissions. |
| `description` | One sentence on the voice — what a reader feels, not what the CSS does. It is what the recommender reads when choosing a Canon for a document. |
| `tags` | Search terms. |
| `dropCaps.preferred` / `.allowed` | `none`, `classic-3`, `classic-5`, `raised`, `sunken`, `outline`, `background`, `margin`, `sculptural`. `preferred` is what you get by default; `allowed` is the ceiling on what an art director may ask for. |
| `artwork.density` | `none`, `light`, `medium`, `rich`. |
| `artwork.style` | Prose. **This text becomes the art brief** for generated artwork, so write it like a direction to an illustrator: medium, line quality, color discipline, what to avoid. |
| `artwork.wrapAllowed` | Whether text may wrap around artwork. |
| `artwork.placements` | `left`, `right`, `full`, `background`, `inline`. |

## typography.json

Four roles — `title`, `heading`, `body`, `utility` — each a family plus `fallbacks`, optional `googleFont`, and `weights`. `fontCount` (1–3) declares how many distinct families you actually use; roles may share one.

The `fallbacks` stack is not a formality. TastePilot never downloads a font, so `googleFont` is progressive enhancement and the stack is what many readers see. Choose fallbacks that fail in the direction of your design: a condensed headline face wants `Arial Narrow` before `sans-serif`, not after.

| Field | Range | Decides |
|---|---|---|
| `baseSizeRem` | 0.8 – 1.5 | Body size. |
| `scaleRatio` | 1.05 – 1.8 | The modular scale. Small ratios read as calm and dense; large ratios read as dramatic. |
| `bodyLeading` | 1.2 – 2 | Line height for prose. Longer measures need more. |
| `headingLeading` | 0.9 – 1.6 | Line height for headings. Display faces usually want less than 1.1. |

## palette.json

Eight tokens, twice — `light` and `dark`:

`paper` · `ink` · `inkSoft` · `accent` · `rule` · `panel` · `codeBg` · `codeInk`

Six-digit hex only. **The dark palette is a separate design, not an inversion.** An accent that sings on paper usually needs to be lighter and warmer on a dark ground to keep the same weight; ink at full white on near-black reads as glare. `rule` and `panel` carry most of the structure — get those wrong and the layout falls apart no matter how good the type is.

## layout.json

| Field | Options | Notes |
|---|---|---|
| `measureCh` | 45 – 90 | Characters per line. 60–70 is comfortable for prose; below 55 reads as newspaper urgency. |
| `density` | `airy`, `comfortable`, `compact` | Global spacing rhythm. |
| `headingTreatment` | `plain`, `eyebrow`, `numbered`, `underlined` | |
| `quoteTreatment` | `rule-left`, `oversized-mark`, `centered-italic`, `indent` | |
| `calloutTreatment` | `panel`, `rule-left`, `boxed` | |
| `statisticTreatment` | `inline`, `oversized`, `panel` | |
| `ornament` | `none`, `rule`, `fleuron`, `asterism` | `none` is a decision, not an omission. |
| `cornerRadius` | `none`, `subtle`, `round` | |

## motion.json

`default` and `max` from `none`, `gentle`, `editorial`, `cinematic`; `reveal` from `none`, `fade`, `rise`.

`max` is a promise: the loudest this Canon will ever be, whatever an art director asks for. Reduced-motion preferences are honored by the renderer regardless, and nothing animated is ever the only way to read something.

## print.json

| Field | Range | Notes |
|---|---|---|
| `pageSize` | `letter`, `a4` | |
| `marginsMm.top/bottom/inner/outer` | 8 – 40 | `inner` is the binding edge. |
| `showFolios` | boolean | Page numbers. |
| `fontScale` | 0.7 – 1.2 | Print body size relative to screen. Screen sizes usually print too large; 0.9–1.0 is a common landing place. |
| `background` | `white`, `paper-tint` | `paper-tint` uses your light `paper` token, which costs ink and looks deliberate. |

## Testing your Canon

```bash
tastepilot canon validate ./canons/your-canon-id     # schema + security scan
tastepilot canon install ./canons/your-canon-id      # into your project
tastepilot canons                                    # confirm it is listed
```

Then render a long, real document with it and read the result on a phone-width viewport and on paper. `tastepilot qa <publication-dir>` catches overflow, broken assets, and unreadable columns; it cannot catch a Canon with no point of view.
