import test from "ava";
import { size } from '../main';


test(".size() resolves a number", async t => {
  let s = await size("teams");
  t.is(typeof s, "number");
});
