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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vexdb = __importStar(require("./src/main"));
function qualifications() {
    return __awaiter(this, void 0, void 0, function () {
        var award, teams, totals;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, vexdb
                        .get("events", { season: "current", region: "South Carolina" })
                        .then(function (events) { return events.map(function (event) { return event.sku; }); })
                        .then(function (sku) { return vexdb.get("awards", { sku: sku }); })];
                case 1:
                    award = _a.sent();
                    teams = new Set();
                    totals = {};
                    return [4, Promise.all(award.map(function (award) { return __awaiter(_this, void 0, void 0, function () {
                            var team;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (award.name.includes("Middle") || award.name.includes("MS")) {
                                            return [2];
                                        }
                                        if (["8686", "6818"].includes(award.team.slice(0, -1))) {
                                            return [2];
                                        }
                                        if (["Excellence", "Design", "Tournament Champions"].every(function (a) { return !award.name.includes(a); })) {
                                            return [2];
                                        }
                                        return [4, vexdb.get("teams", {
                                                team: award.team,
                                                single: true
                                            })];
                                    case 1:
                                        team = (_a.sent())[0];
                                        if (team.grade === "Middle School") {
                                            return [2];
                                        }
                                        if (totals[award.team]) {
                                            totals[award.team].push(award);
                                        }
                                        else {
                                            totals[award.team] = [award];
                                        }
                                        teams.add(award.team);
                                        return [2];
                                }
                            });
                        }); }))];
                case 2:
                    _a.sent();
                    return [2, teams];
            }
        });
    });
}
function skills(qualified) {
    return __awaiter(this, void 0, void 0, function () {
        var sku, skills;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, vexdb
                        .get("events", { season: "current", region: "South Carolina" })
                        .then(function (events) { return events.map(function (event) { return event.sku; }); })];
                case 1:
                    sku = _a.sent();
                    return [4, vexdb.get("skills", {
                            sku: sku,
                            type: 2
                        })];
                case 2:
                    skills = (_a.sent()).filter(function (team) { return !qualified.has(team.team); });
                    return [2, skills.sort(function (a, b) { return b.score - a.score; })];
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var qualed, spots;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Getting qualifications...");
                    return [4, qualifications()];
                case 1:
                    qualed = _a.sent();
                    console.log("Done.");
                    console.log("STATE SPOTS", 40);
                    console.log("QUALIFIED TEAMS", qualed.size);
                    console.log("SPOTS FOR SKILLS", 40 - qualed.size);
                    return [4, skills(qualed)];
                case 2:
                    spots = _a.sent();
                    console.log(spots
                        .slice(0, 40 - qualed.size)
                        .map(function (spot, index) { return index + 1 + ". " + spot.team + " with " + spot.score; })
                        .join("\n"));
                    return [2];
            }
        });
    });
})();
