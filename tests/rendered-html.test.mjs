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
  assert.match(html, /name="rooms"/);
  assert.match(html, /name="minArea"/);
  assert.match(html, /name="status"/);
  assert.match(html, /Masterplan felfedezése/);
  assert.match(html, /Kiemelt otthonok/);
  assert.match(html, /Érték, ami idővel csak növekszik/);
  assert.match(html, /Miért éri meg/);
  assert.match(html, /Nagyobb választék/);
  assert.match(html, /Személyre szabható otthon/);
  assert.match(html, /Tervezhető fizetés/);
  assert.match(html, /Biztonságos döntés/);
  assert.match(html, /Hosszú távú érték/);
  assert.match(html, /href="\/kapcsolat\?interest=residential-interest&amp;sourceUrl=%2F%23early-choice"/);
  assert.ok(html.indexOf("Kiemelt otthonok") < html.indexOf("Érték, ami idővel csak növekszik"));
  assert.ok(html.indexOf("Érték, ami idővel csak növekszik") < html.indexOf('class="development-film"'));
  assert.doesNotMatch(html, /garantált hozam|15[–-]25%|legalacsonyabb ár garantálva/i);
  assert.match(html, /Komárom új prémium lakónegyede épül/);
  assert.match(html, /KMJ5_DevelopmentPhases_ConstructionMood_Desktop_v02\.webp/);
  assert.match(html, /KMJ5_DevelopmentPhases_ConstructionMood_Mobile_v02\.webp/);
  assert.match(html, /Építési hangulatkép/);
  assert.match(html, /class="development-film"/);
  assert.match(html, /KMJ5_OfficialProjectFilm_Poster_v01\.webp/);
  assert.match(html, /data-load-state="deferred"/);
  assert.match(html, /preload="metadata"/);
  assert.match(html, /autoplay/i);
  assert.match(html, /muted/i);
  assert.match(html, /loop/i);
  assert.match(html, /playsinline/i);
  assert.match(html, /Nem a projekt helyszínén készült felvétel/);
  assert.match(html, /Adatfeltöltés alatt/);
  assert.match(html, /Mikor szeretne költözni/);
  assert.match(html, /Távolság és menetidő ellenőrzés alatt/);
  assert.match(html, /KMJ5_Location_MonostoriBridge_Desktop_v01\.webp/);
  assert.match(html, /KMJ5_Location_MonostoriBridge_Mobile_v01\.webp/);
  assert.match(html, /Monostori híd/);
  assert.match(html, /Duna-parti sétány/);
  assert.doesNotMatch(html, /class="location-count"/);
  assert.match(html, /href="\/lakasok\/unit-[^"]+"/);
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
  assert.match(html, /Minden nézet egy helyen/);
  assert.match(html, /Lakáshoz rendelt dokumentáció/);
  assert.match(html, /2D alaprajz/);
  assert.match(html, /Egy jóváhagyott axonometrikus nézet/);
  assert.match(html, /Berendezési és belsőépítészeti koncepció/);
  assert.match(html, /Nagyítás/);
  assert.doesNotMatch(html, /aria-label="Előző nézet"/);
  assert.doesNotMatch(html, /360°/);
  const conceptDetail = await renderPath("/lakasok/unit-a-101");
  assert.equal(conceptDetail.status, 200);
  assert.match(await conceptDetail.text(), /Belsőépítészeti koncepció/);
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
