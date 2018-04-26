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

    let poll = setInterval(async () => {
        let incoming = await get(endpoint, params),
            newItems = incoming.filter((e, i) => keys.indexOf(JSON.stringify(e)) === -1);

        newItems.forEach(item => emitter.emit("item", item));
        results = incoming;
        keys = incoming.map(a => JSON.stringify(a));
    }, settings.live.pollTime)

    // Custom Events
    emitter.on("close", () => clearInterval(poll));

    // Custom API functions, to make things easier
    return Object.assign(emitter, {
        close() {
            emitter.emit("close")
        },
        setParams(p) {
            params = Object.assign(params, p);
        },
        current() {
            return results;
        }
    });
}

module.exports = live;