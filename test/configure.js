import test from "ava";
import { configure, get } from '../main';


test("Register a header", t => {
  t.deepEqual(
    configure(
      {
        "headers": { "a": "b" }
      }
    ),
    {
      "defaultParams": {},
      "headers": {
        "a": "b",
        "User-Agent": "vexdb/0.3.9 (Node.js like JavaScript) <https://npm.im/vexdb>"
      }
    }
    )
});

test("Register a default parameter", async t => {
  configure({
    "defaultParams": {
      "season": "333BH3BH3DIJDJNDHBDJBDIJENJ J"
    }
  })
  let res = await get("events");
  t.is(res.length, 0)
});
