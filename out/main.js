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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("./methods/request"));
exports.request = request_1.default;
var cache = __importStar(require("./methods/cache"));
exports.cache = cache;
var get_1 = __importDefault(require("./methods/get"));
exports.get = get_1.default;
var size_1 = __importDefault(require("./methods/size"));
exports.size = size_1.default;
var live_1 = __importDefault(require("./methods/live"));
exports.live = live_1.default;
var req = __importStar(require("./constants/RequestObjects"));
var res = __importStar(require("./constants/ResponseObjects"));
var settings = __importStar(require("./constants/settings"));
var constant = __assign(__assign(__assign({}, req), res), settings);
exports.constant = constant;
