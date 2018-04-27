import test from "ava";
import { get, live, size, constant } from "../main";
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

test(".live() does not prefetch when not told to", async t => {
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    });
    matches.on("prefetch", items => t.fail())
    t.is(matches.current().length, 0);
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

test(".live() makes no more polls after .close() is called", async t => {
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    });
    matches.close();
    matches.on("fetch", () => t.fail());
    matches.on("prefetch", () => t.fail());
});

test(".live() changes parameters successfully", async t => {
    let inital = 0;
    let matches = live("matches", {
        scored: 1,
        sku: "RE-VRC-17-3805"
    });
    matches.fetch()
        .then(() => {
            inital = matches.current().length;
            matches.params({ filter: () => false });
        })
        .then(matches.fetch)
        .then(() => t.is(matches.current().length, inital))
})

test.afterEach.always(t => {
    constant.settings.live.pollTime = 1;
    let interval = setInterval(() => { }, 9999);
    for (let i = 0; i < interval.length; i++) {
        clearInterval(interval[i]);
    }
})