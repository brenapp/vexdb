"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = new Function("try { return this === window; } catch(e) { return false }");
var settings = {
    cache: {
        ttl: 4 * 60 * 1000
    },
    headers: {
        "User-Agent": "vexdb (nodejs)"
    },
    params: {},
    baseURL: "https://api.vexdb.io/v1/",
    live: {
        pollTime: 10 * 1000
    }
};
exports.settings = settings;
exports.default = settings;
if (exports.isBrowser())
    delete settings.headers["User-Agent"];
function header(headers) {
    if (exports.isBrowser())
        console.warn("Setting headers will prevent requests from made, due to the same origin policy. It is not reccomended");
    Object.assign(settings.headers, headers);
}
exports.header = header;
function param(params) {
    Object.assign(settings.params, params);
}
exports.param = param;
