#!/usr/bin/env node
/**
 * Build the static Canon registry from canons/.
 *
 * The output is a folder of files, not a service:
 *
 *   registry/canons.json                    the listing
 *   registry/canons/<id>.json               the current version
 *   registry/canons/<id>/<version>.json     that version, pinned
 *
 * Those are exactly the three paths TastePilot's registry client requests, so
 * any static host can serve this directory as a registry.
 *
 * Validation is NOT done here — `tastepilot canon validate` is the authority,
 * and CI runs it against every canon before this script is allowed to run.
 * This only assembles what validation already approved.
 */
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CANONS_DIR = join(root, "canons");
const OUT_DIR = join(root, "registry");

const PARTS = ["manifest", "typography", "palette", "layout", "motion", "print"];

async function readCanon(dir) {
  const style = {};
  for (const part of PARTS) {
    style[part] = JSON.parse(await readFile(join(dir, `${part}.json`), "utf8"));
  }
  return style;
}

async function main() {
  const entries = await readdir(CANONS_DIR, { withFileTypes: true });
  const ids = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();

  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(join(OUT_DIR, "canons"), { recursive: true });

  const summaries = [];
  for (const id of ids) {
    const style = await readCanon(join(CANONS_DIR, id));
    const { manifest } = style;
    if (manifest.id !== id) {
      throw new Error(`canons/${id} declares id "${manifest.id}" — folder and id must match`);
    }
    const json = JSON.stringify(style, null, 2) + "\n";

    // The current version, and the same bytes pinned under its version.
    await writeFile(join(OUT_DIR, "canons", `${id}.json`), json, "utf8");
    await mkdir(join(OUT_DIR, "canons", id), { recursive: true });
    await writeFile(join(OUT_DIR, "canons", id, `${manifest.version}.json`), json, "utf8");

    summaries.push({
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
      description: manifest.description,
      tags: manifest.tags ?? [],
    });
  }

  await writeFile(
    join(OUT_DIR, "canons.json"),
    JSON.stringify({ canons: summaries }, null, 2) + "\n",
    "utf8",
  );
  process.stdout.write(`✓ registry built: ${summaries.length} canon(s)\n`);
  for (const s of summaries) process.stdout.write(`  ${s.id}@${s.version}\n`);
}

await main();
