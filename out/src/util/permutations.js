"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestObjects_1 = require("../constants/RequestObjects");
function permutations(endpoint, params) {
    var permutators = Object.keys(params).filter(function (key) { return RequestObjects_1.validParams[endpoint].includes(key) && params[key] instanceof Array; });
    var lengths = permutators.map(function (key) { return params[key].length; });
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
                _a[permutators[i]] = Object.values(params)[i][t],
                _a);
        })
            .reduce(function (a, b) { return Object.assign({}, a, b); }, params);
    }));
}
exports.default = permutations;
