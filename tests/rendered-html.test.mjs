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

test("server-renders the integrated Komárom development landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Komárom Fejlesztési Terület<\/title>/i);
  assert.match(html, /Fejlesztési irányok/);
  assert.match(html, /Oktatási Campus/);
  assert.match(html, /Senior Living/);
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
  assert.doesNotMatch(html, /Lakástípusok/);
  assert.doesNotMatch(html, /Lakások felfedezése/);
  assert.match(html, /value="development-partnership"/);
  assert.match(html, /value="education-partnership"/);
  assert.match(html, /value="senior-living-partnership"/);
  assert.match(html, /value="residential-interest"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});
