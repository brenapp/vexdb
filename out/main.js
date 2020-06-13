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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constant = exports.live = exports.size = exports.get = exports.cache = exports.request = void 0;
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
