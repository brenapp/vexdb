import test from "ava";
import { get, live, size } from "../main";
import EventEmitter from "events";

function wait(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
}

test(".live() returns an EventEmitter", t => {
    live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    }) instanceof EventEmitter ? t.pass() : t.fail()
});

test(".live() prefetch behavior works correctly", async t => {
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805",
        prefetch: true
    });
    matches.on("prefetch", items => t.is(items.length > 0, true))
});

test(".live() does not prefetch when not told to", async t => {
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    });
    matches.on("prefetch", items => t.fail())
});

test(".live() with no prefetch emits `item` the correct number of times", t => {
    let i = 0;
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    });
    matches.on("item", () => i++);
    matches.on("fetch", async () => {
        let items = await size("matches", {
            scored: 1,
            sku: "RE-VRC-17-3805"
        });
        t.is(items, i);
    })
});


test.afterEach.always(t => {
    let interval = setInterval(() => { }, 9999);
    for (let i = 0; i < interval.length; i++) {
        clearInterval(interval[i]);
    }
})