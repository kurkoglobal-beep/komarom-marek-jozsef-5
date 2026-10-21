import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import test from "node:test";

// Inspect the production build without starting or changing a running server.
const seed = JSON.parse(readFileSync("data/units.json", "utf8"));
const catalog = JSON.parse(readFileSync("assets/asset-library.json", "utf8"));
const copy = JSON.parse(readFileSync("i18n/messages/hu.json", "utf8")).experience.media;
const html = (path) => readFileSync(`.next/server/app/${path}.html`, "utf8")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
const imageSources = (markup) => [...markup.matchAll(/<img\b[^>]*src="([^"]+)"/g)]
  .map((match) => decodeURIComponent(match[1]));

test("all 12 finder cards have imagery; only A-2.01 has an axonometric model", () => {
  const cards = [...html("lakasok").matchAll(/<article\b[^>]*class="unit-card[^>]*>[\s\S]*?<\/article>/g)].map((m) => m[0]);
  assert.equal(cards.length, 12);
  for (const unit of seed.units) {
    const card = cards.find((markup) => markup.includes(`>${unit.unitNumber}</h2>`));
    assert.ok(card, unit.id);
    const sources = imageSources(card);
    assert.equal(sources.length, 1, unit.id);
    assert.match(card, /Adatfeltöltés alatt/);
    assert.match(card, /Ár pontosítás alatt/);
    if (unit.id === "unit-a-201") {
      assert.match(sources[0], /KMJ5_A201_Axonometric_v01.webp/);
      assert.doesNotMatch(card, /unit-concept-image/);
    } else {
      assert.ok(card.includes(copy.illustrationLabel), unit.id);
      assert.doesNotMatch(sources[0], /Floorplan|Axonometric/);
      const asset = catalog.assets.find((entry) => entry.conceptReuse?.unitTypeIds.includes(unit.unitTypeId));
      assert.equal(asset?.status, "published");
      assert.equal(asset.conceptReuse.relationship, "concept");
      const rendition = asset.renditions.find((entry) => entry.format === "webp");
      assert.ok(existsSync(rendition.path));
      assert.ok(sources[0].includes(rendition.path.replace(/^public/, "")), unit.id);
      assert.match(card, /loading="lazy"/);
    }
  }
});

test("all 12 detail pages disclose illustration provenance and preserve exact A-2.01 media", () => {
  for (const unit of seed.units) {
    const markup = html(`lakasok/${unit.id}`);
    assert.ok(markup.includes(copy.illustrationDisclaimer), unit.id);
    assert.ok(markup.includes(copy.illustrationLabel), unit.id);
    const sources = imageSources(markup).join("\n");
    if (unit.id === "unit-a-201") {
      assert.match(sources, /KMJ5_A201_Floorplan_v01.webp/);
      assert.match(sources, /KMJ5_A201_Axonometric_v01.webp/);
      for (const room of ["Livingroom", "Bedroom", "Bathroom"]) {
        assert.ok(sources.includes(`KMJ5_A201_${room}_v01.webp`));
      }
      assert.match(markup, /Lakáshoz rendelt dokumentáció/);
    } else {
      assert.doesNotMatch(sources, /Floorplan|Axonometric/);
      assert.doesNotMatch(markup, /room-hotspot|unit-media__floor/);
      assert.match(markup, /unit-concept-image--detail/);
    }
  }
});

test("the approved homepage does not opt into new concept card imagery", () => {
  const markup = html("index");
  assert.doesNotMatch(markup, /class="unit-concept-image/);
  assert.match(markup, /Lakásvizualizáció előkészítés alatt/);
});
