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
  assert.match(html, /Három jövőformáló pillér/);
  assert.match(html, /Oktatási Campus/);
  assert.match(html, /Senior Living/);
  assert.doesNotMatch(html, /Lakástípusok/);
  assert.doesNotMatch(html, /Lakások felfedezése/);
  assert.match(html, /value="development-partnership"/);
  assert.match(html, /value="education-partnership"/);
  assert.match(html, /value="senior-living-partnership"/);
  assert.match(html, /value="residential-interest"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});
