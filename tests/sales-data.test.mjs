import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const seed = JSON.parse(await readFile(new URL("../data/units.json", import.meta.url), "utf8"));
const statuses = new Set(["coming_soon","available","temporarily_reserved","reserved","sold","not_for_sale"]);

test("sales seed follows platform core references and enums", () => {
  const buildings = new Set(seed.buildings.map((item) => item.id));
  const floors = new Set(seed.floors.map((item) => item.id));
  const types = new Set(seed.unitTypes.map((item) => item.id));
  for (const floor of seed.floors) assert.ok(buildings.has(floor.buildingId));
  for (const unit of seed.units) {
    assert.ok(floors.has(unit.floorId)); assert.ok(types.has(unit.unitTypeId)); assert.ok(statuses.has(unit.availabilityStatus));
    assert.ok(unit.basePriceAmount === null || Number.isInteger(unit.basePriceAmount));
    assert.ok(unit.calculatedPriceAmount === null || Number.isInteger(unit.calculatedPriceAmount));
    assert.match(unit.currency, /^[A-Z]{3}$/);
  }
});

test("filter state is shareable as URL parameters", () => {
  const query = new URLSearchParams({building:"building-a",floor:"2",rooms:"2",status:"available"});
  assert.equal(query.toString(), "building=building-a&floor=2&rooms=2&status=available");
  const result = seed.units.filter((unit) => unit.floorId === "floor-a-2" && unit.roomCount === 2 && unit.availabilityStatus === "available");
  assert.deepEqual(result.map((unit) => unit.id), ["unit-a-201"]);
});
