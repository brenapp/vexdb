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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("../constants/settings");
var RequestObjects_1 = require("../constants/RequestObjects");
var keya = __importStar(require("keya"));
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
        var file, store, entry;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = sanitize(endpoint, params);
                    return [4, keya.store("vexdb")];
                case 1:
                    store = _a.sent();
                    entry = { expiry: Date.now() + settings_1.settings.cache.ttl, value: value };
                    return [4, store.set(file, entry)];
                case 2:
                    _a.sent();
                    return [2, entry];
            }
        });
    });
}
exports.cache = cache;
(function (cache) {
    function resolve(endpoint, params) {
        return __awaiter(this, void 0, void 0, function () {
            var file, store, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = sanitize(endpoint, params);
                        return [4, keya.store("vexdb")];
                    case 1:
                        store = _a.sent();
                        if (!store.get(file)) return [3, 3];
                        return [4, store.get(file)];
                    case 2:
                        record = _a.sent();
                        if (record.expiry > Date.now()) {
                            return [2, record.value];
                        }
                        else {
                            return [2, store.delete(file).then(function () { return undefined; })];
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
            var store;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, keya.store("vexdb")];
                    case 1:
                        store = _a.sent();
                        return [2, store.clear()];
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
