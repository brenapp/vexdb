"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
require("isomorphic-fetch");
var settings_1 = require("../constants/settings");
var cache = __importStar(require("./cache"));
function serialize(params) {
    var str = "";
    for (var key in params) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(params[key]);
    }
    return str;
}
exports.serialize = serialize;
function request(endpoint, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var entry, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, cache.resolve(endpoint, params)];
                case 1:
                    entry = _a.sent();
                    if (entry !== null) {
                        return [2, entry];
                    }
                    return [4, fetch(settings_1.settings.baseURL + "/get_" + endpoint + "?" + serialize(__assign(__assign({}, settings_1.settings.params), params)), {
                            headers: settings_1.settings.headers,
                        }).then(function (data) { return data.json(); })];
                case 2:
                    data = _a.sent();
                    if (!data.status) return [3, 4];
                    return [4, cache.store(endpoint, params, data)];
                case 3:
                    _a.sent();
                    return [2, data];
                case 4: return [2, Promise.reject(Promise.reject(new Error(data.error_text)))];
            }
        });
    });
}
exports.request = request;
function requestSize(endpoint, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, request(endpoint, Object.assign({}, params, { nodata: true })).then(function (res) { return (res ? res.size : 0); })];
        });
    });
}
exports.requestSize = requestSize;
function requestAll(endpoint, params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, requestSize(endpoint, params)
                    .then(function (size) {
                    return Promise.all(new Array(Math.ceil(size / 5000))
                        .fill(endpoint)
                        .map(function (e, i) {
                        return request(endpoint, __assign(__assign({}, params), { limit_start: i * 5000 }));
                    }));
                })
                    .then(function (result) { return ({
                    status: result[0] ? result[0].status : 0,
                    size: result.reduce(function (a, b) { return a + b.size; }, 0),
                    result: result.reduce(function (a, b) { return a.concat(b.result); }, []),
                }); })];
        });
    });
}
exports.default = requestAll;
