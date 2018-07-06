"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = __importDefault(require("../constants/settings"));
var RequestObjects_1 = require("../constants/RequestObjects");
var keya_1 = __importDefault(require("keya"));
function serialize(url, params) {
    var str = "";
    for (var p in params) {
        if (params.hasOwnProperty(p)) {
            if (str !== "")
                str += "&";
            str += p + "=" + encodeURIComponent(params[p]);
        }
    }
    return url + "?" + str;
}
function sanitize(endpoint, params) {
    return serialize(endpoint, Object.keys(params)
        .filter(function (key) {
        return RequestObjects_1.validParams[endpoint].includes(key) &&
            ["string", "number", "boolean"].includes(typeof params[key]) &&
            key == "limit_start"
            ? params[key] != 0
            : true;
    })
        .sort()
        .reduce(function (obj, key) { return ((obj[key] = params[key]), obj); }, {}));
}
function cache(endpoint, params, value) {
    return __awaiter(this, void 0, void 0, function () {
        var file;
        return __generator(this, function (_a) {
            file = "vexdb-" + sanitize(endpoint, params);
            return [2, keya_1.default.set(file, {
                    expiry: Date.now() + settings_1.default.cache.ttl,
                    value: value
                })];
        });
    });
}
exports.cache = cache;
(function (cache) {
    function resolve(endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            var file, out;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = "vexdb-" + sanitize(endpoint, params);
                        return [4, keya_1.default.has(file)];
                    case 1:
                        if (!_a.sent()) return [3, 3];
                        return [4, keya_1.default.get(file)];
                    case 2:
                        out = _a.sent();
                        if (out.expiry > Date.now()) {
                            return [2, out.value];
                        }
                        else {
                            return [2, keya_1.default.remove(file).then(function () { return undefined; })];
                        }
                        return [3, 4];
                    case 3: return [2, undefined];
                    case 4: return [2];
                }
            });
        });
    }
    cache.resolve = resolve;
    function has(endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, resolve(endpoint, params)];
                    case 1: return [2, (_a.sent()) !== undefined];
                }
            });
        });
    }
    cache.has = has;
    function clear() {
        return __awaiter(this, void 0, void 0, function () {
            var keys, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = Object).keys;
                        return [4, keya_1.default.all()];
                    case 1:
                        keys = _b.apply(_a, [_c.sent()]);
                        keys.filter(function (s) { return s.startsWith("vexdb-"); }).forEach(function (k) { return keya_1.default.remove(k); });
                        return [2];
                }
            });
        });
    }
    cache.clear = clear;
    function serialize(url, params) {
        var str = "";
        for (var p in params) {
            if (params.hasOwnProperty(p)) {
                if (str !== "")
                    str += "&";
                str += p + "=" + encodeURIComponent(params[p]);
            }
        }
        return url + "?" + str;
    }
    cache.serialize = serialize;
    function sanitize(endpoint, params) {
        return serialize(endpoint, Object.keys(params)
            .filter(function (key) {
            return RequestObjects_1.validParams[endpoint].includes(key) &&
                ["string", "number", "boolean"].includes(typeof params[key]) &&
                key == "limit_start"
                ? params[key] != 0
                : true;
        })
            .sort()
            .reduce(function (obj, key) { return ((obj[key] = params[key]), obj); }, {}));
    }
    cache.sanitize = sanitize;
})(cache = exports.cache || (exports.cache = {}));
