"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RequestObjects_1 = require("../constants/RequestObjects");
var RequestObjects_2 = require("../constants/RequestObjects");
var settings_1 = require("../constants/settings");
var permutations_1 = __importDefault(require("../util/permutations"));
var object_1 = require("../util/object");
var request_1 = require("./request");
var filter_1 = __importDefault(require("../util/filter"));
function standardize(endpoint, params) {
    return object_1.filter(params, function (value, key) { return RequestObjects_1.validParams[endpoint].includes(key); });
}
function get(endpoint, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, clientside, filterKeys;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!RequestObjects_2.endpoints.includes(endpoint))
                        return [2, Promise.reject(new RangeError("Endpoint " + endpoint + " not known. Valid endpoints are " + RequestObjects_2.endpoints.join(", ")))];
                    params = Object.assign({}, settings_1.settings.params, params);
                    return [4, Promise.all(permutations_1.default(endpoint, params).map(function (param) {
                            return request_1.requestAll(endpoint, standardize(endpoint, __assign({ single: true }, param))).then(function (res) { return res.result; });
                        }))];
                case 1:
                    res = (_a.sent()).reduce(function (a, b) { return a.concat(b); }, []);
                    res = __spread(new Set(res));
                    clientside = object_1.filter(params, function (value, key) {
                        return (typeof value == "function" || typeof value === "object") &&
                            !RequestObjects_1.validParams[endpoint].includes(key);
                    });
                    filterKeys = Object.keys(clientside);
                    return [2, object_1.asyncArrayFilter(res, function (item) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, Promise.all(filterKeys.map(function (key) { return filter_1.default(item, key, clientside[key]); }))];
                                    case 1: return [2, (_a.sent()).every(function (a) { return !!a; })];
                                }
                            });
                        }); })];
            }
        });
    });
}
exports.get = get;
function size(endpoint, params) {
    if (params === void 0) { params = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var filtering;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filtering = Object.keys(params).some(function (key) { return !RequestObjects_1.validParams[endpoint].includes(key); });
                    if (!filtering) return [3, 1];
                    return [2, get(endpoint, params).then(function (res) { return res.length; })];
                case 1: return [4, Promise.all(permutations_1.default(endpoint, params).map(function (param) {
                        return request_1.requestSize(endpoint, Object.assign({}, settings_1.settings.params, param));
                    }))];
                case 2: return [2, (_a.sent()).reduce(function (a, b) { return a + b; })];
            }
        });
    });
}
exports.size = size;
