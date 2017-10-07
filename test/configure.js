import test from "ava";
import { configure, get } from "../main";
import { globalOptions } from "../lib/configure";
import { version } from "../package"

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
        "a": "b"
      },
      "settings": globalOptions.settings
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
