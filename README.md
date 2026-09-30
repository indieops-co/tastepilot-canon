<div align="center">

# Community Canon

**An open library of editorial styles for [TastePilot](https://indieops.co/skills/tastepilot).**

A Canon is not a theme or a page template. It is a reusable **editorial grammar** — the typographic relationships, paired palettes, spacing rhythm, drop-cap behavior, artwork rules, motion grammar, and print adaptation that make a publication feel like *someone* made it.

[What is a Canon?](#what-is-a-canon) · [Use one](#use-a-canon) · [Submit one](CONTRIBUTING.md) · [Authoring guide](docs/authoring-guide.md)

</div>

---

## The library

| Canon | Voice | Author |
|---|---|---|
| [Newsprint Broadsheet](canons/newsprint-broadsheet/) | The urgency of a printed paper: condensed headlines, a tight measure, hairline rules, and a single red that means something. | TastePilot |

![The Newsprint Broadsheet canon rendering a long-form guide](docs/assets/newsprint-broadsheet.png)

*Five more Canons — Modern Editorial, Swiss Clean, Literary Classic, Technical Journal, Playful Illustrated — ship bundled inside the Skilllet itself. This repository is for everything after those.*

## What is a Canon?

Six JSON files. That is the whole format.

```
manifest.json     identity, author, license, drop-cap and artwork grammar
typography.json   families with offline fallbacks, scale, leading
palette.json      paired light + dark tokens — never a simple inversion
layout.json       measure, density, heading/quote/callout/statistic treatments
motion.json       default level, ceiling, reveal style
print.json        page size, margins, folios, print background
```

Every file is validated against a strict schema: unknown keys are rejected. A Canon carries no CSS, no scripts, no HTML, and no instructions for an agent — it is configuration a deterministic renderer executes. That is what makes installing a stranger's Canon a reasonable thing to do.

## Use a Canon

Copy the folder into your project and install it:

```bash
tastepilot canon install ./canons/newsprint-broadsheet
tastepilot canons                      # it now appears as a "local" source
```

Then art-direct with it as you would any bundled style: *Make it beautiful using Newsprint Broadsheet.*

Once a registry is published, the same Canons will be reachable without cloning:

```bash
export TASTEPILOT_CANON_URL=https://<the published registry>
tastepilot canon install newsprint-broadsheet@1.0.0
```

The registry is a folder of static JSON — `canons.json`, `canons/<id>.json`, `canons/<id>/<version>.json` — built from this repository by CI. No service is required to host one.

## Submit a Canon

Open a pull request adding one folder under `canons/`. CI validates it against the same schemas and the same security scan the tool uses locally, so you will know within a minute whether it is acceptable.

Read [CONTRIBUTING.md](CONTRIBUTING.md) first — it covers the review bar, attribution, and forking someone else's Canon.

## Attribution and forks

Every Canon names its `author` and its `license`, and a Canon derived from another names it in `basedOn`. Forking is expected and welcome; passing off is not. A Canon here stays credited to the person who made it.

## License

Tooling and Canon data in this repository are [MIT licensed](LICENSE). By submitting a Canon you agree to license it the same way, and you confirm the fonts it names are ones anyone may use.

---

**Thousands of styles can make something different. Taste knows which one to use.**
