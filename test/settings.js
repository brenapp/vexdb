import test from "ava";
import { constant } from "../out/main";

test("All default settings are present", async (t) => {
  constant.settings.cache &&
  constant.settings.cache.ttl === 4 * 60 * 1000 &&
  constant.settings.headers &&
  constant.settings.headers["User-Agent"] === "vexdb (nodejs)" &&
  constant.settings.params &&
  constant.settings.baseURL === "https://api.vexdb.io/v1" &&
  constant.settings.live &&
  constant.settings.live.pollTime === 10 * 1000
    ? t.pass()
    : t.fail();
});

test("Settings configuration methods", async (t) => {
  constant.param({ region: "South Carolina" });
  if (constant.settings.params.region === "South Carolina") {
    t.pass();
  } else {
    t.fail();
  }

  constant.header({ Accept: "application/json" });
  if (constant.settings.headers.Accept === "application/json") {
    t.pass();
  } else {
    t.fail();
  }
});
