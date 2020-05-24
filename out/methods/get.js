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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var request_1 = __importDefault(require("./request"));
var RequestObjects_1 = require("../constants/RequestObjects");
function permute(permutations) {
    var permutators = Object.keys(permutations);
    var lengths = permutators.map(function (key) { return permutations[key].length; });
    var sizes = new Array(permutators.length + 1)
        .fill(0)
        .map(function (a, i) { return lengths.slice(i).reduce(function (a, b) { return a * b; }, 1); });
    return (new Array(sizes[0])
        .fill({})
        .map(function (a, i) {
        return sizes
            .slice(1)
            .map(function (cost) {
            var path = Math.floor(i / cost);
            i -= cost * path;
            return path;
        });
    })
        .map(function (path) {
        return path
            .map(function (t, i) {
            var _a;
            return (_a = {},
                _a[permutators[i]] = permutations[permutators[i]][t],
                _a);
        })
            .reduce(function (a, b) { return Object.assign({}, a, b); }, permutations);
    }));
}
exports.permute = permute;
function get(endpoint, params) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, _a, e_2, _b, endpoints, basic, filter, permuation, _loop_1, _c, _d, _e, key, value, requests, responses, final, _loop_2, responses_1, responses_1_1, response, e_2_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    endpoints = Object.keys(RequestObjects_1.validParams);
                    if (!endpoints.includes(endpoint)) {
                        return [2, Promise.reject(new Error("Endpoint \"" + endpoint + "\" is not valid. Valid endpoints are " + endpoints.join(", ")))];
                    }
                    basic = {};
                    filter = new Map();
                    permuation = {};
                    _loop_1 = function (key, value) {
                        if (typeof value === "number" || typeof value === "string") {
                            basic[key] = value;
                            return "continue";
                        }
                        if (value instanceof Array) {
                            permuation[key] = value;
                            return "continue";
                        }
                        if (value instanceof RegExp) {
                            var regex_1 = value;
                            value = function (res) {
                                return res.toString().match(regex_1) !== null;
                            };
                        }
                        filter.set(key, value);
                    };
                    try {
                        for (_c = __values(Object.entries(params)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            _e = __read(_d.value, 2), key = _e[0], value = _e[1];
                            _loop_1(key, value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    requests = Promise.all(permute(permuation).map(function (r) { return request_1.default(endpoint, __assign({}, basic, r)); }));
                    return [4, requests];
                case 1:
                    responses = (_f.sent()).map(function (r) { return r.result; }).flat();
                    final = [];
                    _loop_2 = function (response) {
                        var validate;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, Promise.all(__spread(filter.entries()).map(function (_a) {
                                        var _b = __read(_a, 2), key = _b[0], validator = _b[1];
                                        return validator(response[key], response);
                                    }))];
                                case 1:
                                    validate = _a.sent();
                                    if (validate.every(function (r) { return !!r; })) {
                                        final.push(response);
                                    }
                                    return [2];
                            }
                        });
                    };
                    _f.label = 2;
                case 2:
                    _f.trys.push([2, 7, 8, 9]);
                    responses_1 = __values(responses), responses_1_1 = responses_1.next();
                    _f.label = 3;
                case 3:
                    if (!!responses_1_1.done) return [3, 6];
                    response = responses_1_1.value;
                    return [5, _loop_2(response)];
                case 4:
                    _f.sent();
                    _f.label = 5;
                case 5:
                    responses_1_1 = responses_1.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_2_1 = _f.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (responses_1_1 && !responses_1_1.done && (_b = responses_1.return)) _b.call(responses_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 9: return [2, final];
            }
        });
    });
}
exports.default = get;
