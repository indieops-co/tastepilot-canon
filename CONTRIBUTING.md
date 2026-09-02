# Contributing a Canon

A Canon is an editorial judgment, not a color scheme. The bar is: **would a working designer recognize this as a coherent voice, and would a reader feel it without being able to name it?**

## The shape of a submission

One folder under `canons/`, named for your Canon's `id`, containing **exactly six files**:

```
canons/your-canon-id/
  manifest.json
  typography.json
  palette.json
  layout.json
  motion.json
  print.json
```

Nothing else — no README, no screenshots, no scripts. `tastepilot canon install` copies those six files and refuses a folder carrying anything else, because anything else would arrive unvalidated inside the folder a coding agent works in. Put notes for reviewers in the pull request instead.

Start from [`template/`](template/): copy it, rename it, change every value.

## Before you open the PR

Validate locally with the tool itself:

```bash
tastepilot canon validate ./canons/your-canon-id
```

Then actually look at it. A Canon that validates can still be ugly:

```bash
tastepilot canon install ./canons/your-canon-id
tastepilot ingest ./some-real-writing.md --out ./out
# art-direct and render with your Canon, then:
tastepilot qa ./out/publication
```

Render something long and real — a document with headings, a quote, a statistic, a list, a code block, and an image. Short samples flatter everything.

## What CI checks

Every pull request runs the same strict schemas and the same security scan the tool runs locally:

- **Schema.** Every field present, every value in range, no unknown keys.
- **Security.** No markup, no `javascript:` URLs, no event handlers, no template injection, no agent instructions. Canon data is configuration; text fields that read like instructions to an AI are rejected.
- **Six files.** No extra files in the folder.
- **Identity.** The folder name matches `manifest.id`, and the version is semver.
- **The registry still builds.**

CI cannot check whether your Canon is any good. That part is review.

## What review looks for

- **A voice, not a preference.** "Serif, generous whitespace" is a preference. "The unhurried authority of a university press monograph" is a voice, and it decides the measure, the leading, the ornament, and the print margins together.
- **Paired palettes, not inversions.** The dark palette is its own design. Flipping `#fff` and `#111` is not a dark mode; a dark palette usually needs a warmer accent and a softer ink to hold up.
- **Offline fallbacks that hold the design.** `googleFont` is progressive enhancement. The `fallbacks` stack is what most readers see first, and a condensed headline face falling back to a default sans will not read as the same Canon. Choose fallbacks that fail in the right direction.
- **Print that is a print edition.** Margins, folios, and `fontScale` chosen for paper — not the screen values copied across.
- **Motion with a ceiling.** `max` is a promise about the loudest this Canon will ever get.
- **Restraint counts.** `ornament: "none"` is a decision. Ornament that lacks a job is the most common reason a Canon reads as amateur.

## Attribution and forking

Fork freely. Name your source in `basedOn` when your Canon starts from someone else's, keep their `author` intact in the original, and pick a new `id` and `name`. Attribution is a license term here, not a courtesy.

Use your own name (or handle) in `author`, and a `homepage` if you want the credit to lead somewhere.

## Fonts

Name only fonts anyone may use — open licenses, or faces available through Google Fonts. A Canon that requires a commercial license nobody else has is a Canon nobody else can run. TastePilot never downloads a font: `googleFont` is a hint, and the `fallbacks` stack is the guarantee.

## Versioning

Semver in `manifest.version`. A published version is immutable — the registry caches by version, and installs pin to it. Changing the look means a new version, not an edit to the old one.

## Licensing your submission

By opening a pull request you license your Canon under this repository's [MIT license](LICENSE) and confirm you have the right to do so.
