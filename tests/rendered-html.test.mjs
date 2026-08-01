import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          if (url.pathname.endsWith(".png")) {
            return new Response(new Uint8Array(), { headers: { "content-type": "image/png" } });
          }
          return new Response("Not found", { status: 404 });
        },
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function renderPath(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("sales-test", `${pathname}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the multi-audience Komárom residential website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Komárom Marek József utca 5\. \| Prémium lakónegyed<\/title>/i);
  assert.match(html, /Új otthonok\. Élhető jövő\./);
  assert.doesNotMatch(html, />Befektetőknek</);
  assert.match(html, /Bérlőknek/);
  assert.match(html, /Lakáskereső/);
  assert.match(html, /Emberléptékű építészet/);
  assert.match(html, /Interactive/);
  assert.match(html, /A-2\.01/);
  assert.match(html, /KMJ5_Residential_GroundFloorPlan_v01\.pdf/);
  assert.match(html, /A jövő/);
  assert.match(html, /tudásközpontja/);
  assert.match(html, /09:00/);
  assert.match(html, /STEM &amp; Innovációs labor/);
  assert.match(html, /KMJ5_EducationCampus_Cutaway_v01\.webp/);
  assert.match(html, /Prémium életminőség/);
  assert.match(html, /Smart Care &amp; Health/);
  assert.match(html, /Wellness &amp; Gyógytorna/);
  assert.match(html, /KMJ5_SeniorLiving_Courtyard_v01\.webp/);
  assert.doesNotMatch(html, /Befektetési potenciál/);
  assert.doesNotMatch(html, /Befektetési modell/);
  assert.doesNotMatch(html, /12[–-]15%|6[–-]8%/);
  assert.doesNotMatch(html, /Lakástípusok/);
  assert.match(html, /Lakások felfedezése/);
  assert.match(html, /Üzlethelyiségek/);
  assert.doesNotMatch(html, /Irodák és stúdiók/);
  assert.match(html, /Hosszú távra/);
  assert.match(html, /Építsük együtt Komárom új lakónegyedét/);
  assert.match(html, /value="commercial-tenancy"/);
  assert.match(html, /value="office-tenancy"/);
  assert.match(html, /value="career"/);
  assert.match(html, /value="residential-interest"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
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
  assert.match(html, /Statikus axonometrikus előnézet/);
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
  assert.equal(missingUnit.status, 404);
  assert.match(await missingUnit.text(), /A lakás nem található/);
  const missingPage = await renderPath("/nem-letezo-oldal");
  assert.equal(missingPage.status, 404);
  assert.match(await missingPage.text(), /A keresett oldal nem található/);
});
