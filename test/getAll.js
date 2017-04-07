import test from "ava";
import { getAll } from '../main';

test(".getAll() resolves for correct requests", async t => {
  var res = await getAll("events", {});
  if (res.length > 5000) { t.pass() } else { t.fail("Did not get multiple requests") }
});

test(".getAll() rejects for incorrect endpoints", async t => {
  try {
    await getAll("invalid");
  } catch(e) {
    t.pass()
  }
});
