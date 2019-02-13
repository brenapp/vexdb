"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = [
    "events",
    "teams",
    "matches",
    "rankings",
    "season_rankings",
    "awards",
    "skills"
];
exports.validParams = {
    events: [
        "single",
        "sku",
        "program",
        "date",
        "season",
        "city",
        "region",
        "team",
        "country",
        "status",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    teams: [
        "single",
        "team",
        "program",
        "organisation",
        "city",
        "region",
        "country",
        "grade",
        "is_registered",
        "sku",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    matches: [
        "single",
        "sku",
        "division",
        "team",
        "round",
        "instance",
        "matchnum",
        "scheduled",
        "field",
        "scored",
        "season",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    rankings: [
        "single",
        "sku",
        "division",
        "team",
        "rank",
        "season",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    season_rankings: [
        "single",
        "program",
        "season",
        "team",
        "vrating_rank",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    awards: [
        "single",
        "sku",
        "name",
        "team",
        "season",
        "limit_number",
        "limit_start",
        "nodata"
    ],
    skills: [
        "single",
        "sku",
        "program",
        "type",
        "team",
        "season",
        "rank",
        "season_rank",
        "limit_number",
        "limit_start",
        "nodata"
    ]
};
