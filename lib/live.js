/**
 * vexdb.live("matches", {
 *      
 * }).on("item", console.log)
 */
const { get } = require("./request");
const { settings } = require("./constants");
const EventEmitter = require("events");

function live(endpoint, params) {
    let results = [],
        keys = [],
        emitter = new EventEmitter();

    async function fetch() {
        let incoming = await get(endpoint, params),
            newItems = incoming.filter((e, i) => keys.indexOf(JSON.stringify(e)) === -1);

        newItems.forEach(item => emitter.emit("item", item));
        results = incoming;
        keys = incoming.map(a => JSON.stringify(a));
        emitter.emit("fetch", newItems);
        return true;
    }

    let poll = setInterval(fetch, settings.live.pollTime)

    setTimeout(async () => {
        if (!params.prefetch) return;

        results = await get(endpoint, params),
            keys = results.map(a => JSON.stringify(a));
        emitter.emit("prefetch", results);
    }, 0);

    // Custom Events
    emitter.on("close", () => clearInterval(poll));

    // Custom API functions, to make things easier
    return Object.assign(emitter, {
        close() {
            emitter.emit("close")
        },
        params(p) {
            params = Object.assign(params, p);
        },
        current() {
            return results;
        },
        fetch
    });
}

module.exports = live;