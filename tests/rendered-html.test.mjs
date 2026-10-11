import assert from "node:assert/strict";
import test from "node:test";

// Run against the locally started Next.js production build (pnpm build; pnpm start -- -p 3000).
const baseUrl = process.env.KMJ5_TEST_BASE_URL;
if (!baseUrl || !["localhost", "127.0.0.1"].includes(new URL(baseUrl).hostname)) {
  throw new Error("Set KMJ5_TEST_BASE_URL to the local production preview URL.");
}
async function renderPath(pathname) {
  return fetch(new URL(pathname, baseUrl));
}
async function render() { return renderPath("/"); }

test("server-renders the current homepage with truthful project labels", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  for (const expected of [
    /<title>Komárom Marek József utca 5/, /Új otthonok/, /Élhető jövő/,
    /Lakáskiválasztó/, /Kiemelt otthonok/, /Koncepció/, /Adatfeltöltés alatt/,
    /Komárom új prémium lakónegyede készül/, /Távolság és menetidő ellenőrzés alatt/,
    /KMJ5_OfficialProjectFilm_Poster_v03\.webp/, /data-load-state="deferred"/,
    /Az online kapcsolatfelvétel jelenleg előkészítés alatt/,
  ]) assert.match(html, expected);
  assert.doesNotMatch(html, /garantált hozam|15[–-]25%|legalacsonyabb ár garantálva/i);
  assert.match(html, /<button[^>]*type="submit"[^>]*disabled/);
});

test("server-renders apartment finder and direct unit URL", async () => {
  const finder = await renderPath("/lakasok?building=building-a&floor=2&rooms=2&status=available");
  assert.equal(finder.status, 200);
  assert.match(await finder.text(), /Találja meg az új otthonát/);
  const detail = await renderPath("/lakasok/unit-a-201");
  assert.equal(detail.status, 200);
  const html = await detail.text();
  assert.match(html, /A-2\.01/);
  assert.match(html, /Érdeklődöm a lakásról/);
  assert.match(html, /Minden nézet egy helyen/);
  assert.match(html, /Lakáshoz rendelt dokumentáció/);
  assert.match(html, /Berendezési és belsőépítészeti koncepció/);
  assert.doesNotMatch(html, /aria-label="Előző nézet"/);
  assert.doesNotMatch(html, /360°/);
  const conceptDetail = await renderPath("/lakasok/unit-a-101");
  assert.equal(conceptDetail.status, 200);
  const conceptHtml = (await conceptDetail.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  assert.match(conceptHtml, /Lakásvizualizáció előkészítés alatt/);
  assert.doesNotMatch(conceptHtml, /KMJ5_A201_Floorplan_v01/);
  assert.match(html, /Adatfeltöltés alatt/);
});

test("keeps marketing and sales route boundaries available", async () => {
  for (const [path, expected] of [
    ["/projekt", /Fejlesztési irányok/],
    ["/galeria", /Belső terek/],
    ["/masterplan", /Válasszon három lépésben/],
    ["/kedvencek", /Kedvencek/],
  ]) {
    const response = await renderPath(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), expected, path);
  }
});

test("passes apartment context to the standalone contact route", async () => {
  const response = await renderPath("/kapcsolat?unitId=unit-a-201&buildingId=building-a&floorId=floor-a-2&sourceUrl=%2Flakasok%2Funit-a-201&interest=residential-interest");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /name="unitId" value="unit-a-201"/);
  assert.match(html, /name="buildingId" value="building-a"/);
  assert.match(html, /name="floorId" value="floor-a-2"/);
  assert.match(html, /name="sourceUrl" value="\/lakasok\/unit-a-201"/);
  assert.match(html, /value="residential-interest" selected/);
});

test("uses the global and unit-specific not-found experiences", async () => {
  const missingUnit = await renderPath("/lakasok/nem-letezo-lakas");
  // Next.js can stream the shell before notFound(), returning 200 plus noindex.
  assert.ok([200, 404].includes(missingUnit.status));
  const missingHtml = await missingUnit.text();
  assert.match(missingHtml, /A lakás nem található/);
  assert.match(missingHtml, /name="robots" content="noindex"/);
  const missingPage = await renderPath("/nem-letezo-oldal");
  assert.equal(missingPage.status, 404);
  assert.match(await missingPage.text(), /A keresett oldal nem található/);
});

test("homepage navigation exposes the public subpages", async () => {
  const html = await (await render()).text();
  const navigation = html.match(/<nav class="desktop-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(navigation, "Desktop main navigation exists");
  for (const route of ["/projekt", "/galeria", "/masterplan", "/kapcsolat"]) {
    assert.ok(navigation.includes(`href="${route}"`), route);
  }
});
