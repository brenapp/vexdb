import test from "ava";
import { cache, get, size } from "../main";
import { settings } from "../lib/constants";


test("Register a cache", async t => {
  await get("teams", { team: "3796B" });
  t.is(await cache.has("teams", { team: "3796B" }), true)
});

test("TTL propagates", t => {
  cache.setTTL(0);
  t.is(cache.ttl, 0);
});

test("Cache invalidates after TTL", async t => {
  // Set the TTL super short, so we don"t have to bother with waiting
  cache.setTTL(100);
  cache("teams", {
    very: 'little'
  }, { pass: true });
  setTimeout(async function () {
    if (!await cache.has("teams", { very: 'little' })) t.pass();
  }, 100);

});

test("Something already cached resolves instantly", async t => {

  var start = Date.now();
  get("events", { region: "South Carolina" })
    .then(() => Date.now() - start > 100 ? null : t.fail("Resolved too quickly, is it already cached?"))
  get("events", { region: "South Carolina" })
    .then(() => Date.now() - start > 100 ? t.fail("Did not resolve fast enough, did it not cache?") : t.pass())

});


// Reset the cache
test.afterEach.always(async t => {

  await cache.clear();
  cache.setTTL(4 * 60 * 1000);
  delete global.window;
  delete global.localStorage;
});
