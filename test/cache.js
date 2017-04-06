import test from "ava";
import { cache } from '../main';


test("Register a cache", t => {
  let record = cache("/test", { pass: true });
  t.deepEqual(cache.current, {
    "/test": record
  })
});

test("TTL propagates", t => {
  cache.setTTL(0);
  t.is(cache.ttl, 0);
});

test("Cache invalidates after TTL", async t => {
  // Set the TTL super short, so we don't have to bother with waiting
  cache.setTTL(100);
  cache("/ttl", { very: 'little' });
  setTimeout(function() {
    if (!cache.has("/ttl")) t.pass();
  }, 100);

});


// Reset the cache
test.afterEach.always( t => {
  cache.clear();
  cache.setTTL(4 * 60 * 1000);
});
