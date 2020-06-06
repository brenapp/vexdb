import {
  TeamsResponseObject,
  EventsResponseObject,
  MatchesResponseObject,
  RankingsResponseObject,
  SeasonRankingsResponseObject,
  AwardsResponseObject,
  SkillsResponseObject,
} from "./ResponseObjects";

export type Endpoint =
  | "events"
  | "teams"
  | "matches"
  | "rankings"
  | "season_rankings"
  | "awards"
  | "skills";

export type RequestObject =
  | TeamsRequestObject
  | EventsRequestObject
  | MatchesRequestObject
  | RankingsRequestObject
  | SeasonRankingsRequestObject
  | AwardsRequestObject
  | SkillsRequestObject;

export type Seasons =
  | "Change Up"
  | "Tower Takeover"
  | "Turning Point"
  | "In The Zone"
  | "StarStruck"
  | "Nothing But Net"
  | "Skyrise"
  | "Toss Up"
  | "Sack Attack"
  | "Gateway"
  | "Round Up"
  | "Clean Sweep"
  | "Elevation"
  | "Bridge Battle"
  | "current";

export type Grades = "Middle School" | "High School" | "Collge";
export type Programs = "VEXU" | "VRC";

export interface TeamsRequestObject {
  team?: string;
  number?: string;
  team_name?: string;
  robot_name?: string;
  program?: Programs;
  organisation?: string;
  city?: string;
  region?: string;
  country?: string;
  grade?: Grades;

  // is_registered?: 0 | 1;
  // sku?: string;
  // limit_number?: number;
  // limit_start?: number;
}

export interface EventsRequestObject {
  sku?: string;
  program?: Programs;
  date?: string;
  season?: Seasons;
  city?: string;
  region?: string;
  country?: string;
  status?: string;
  limit_number?: number;
  limit_start?: number;
  team?: string;

  // key?: string;
  // name?: string;
  // loc_venue?: string;
  // loc_address1?: string;
  // loc_address2?: string;
  // loc_city?: string;
  // loc_region?: string;
  // loc_postcode?: string;
  // loc_country?: string;
  // start?: string;
  // end?: string;
}

export interface MatchesRequestObject {
  sku?: string;
  division?: string;
  team?: string;
  round?: 1 | 2 | 3 | 4 | 5 | 16;
  instance?: number;
  matchnum?: number;
  scheduled?: number;
  field?: string;
  scored?: 0 | 1;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  // red1?: string;
  // red2?: string;
  // red3?: string;
  // redsit?: string;
  // blue1?: string;
  // blue2?: string;
  // blue3?: string;
  // bluesit?: string;
  // redscore?: number;
  // bluescore?: number;
}

export interface RankingsRequestObject {
  sku?: string;
  division?: string;
  team?: string;
  rank?: string;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  // wins?: number;
  // losses?: number;
  // ties?: number;
  // wp?: number;
  // ap?: number;
  // sp?: number;
  // trsp?: number;
  // max_score?: number;
  // opr?: number;
  // dpr?: number;
  // ccwm?: number;
}

export interface SeasonRankingsRequestObject {
  program?: Programs;
  season?: Seasons;
  team?: string;
  vrating_rank?: number;
  limit_number?: number;
  limit_start?: number;

  // vrating?: number;
}

export interface AwardsRequestObject {
  sku?: string;
  name?: string;
  team?: string;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  // order?: number;
}

export enum SkillsType {
  Driver = 0,
  Programming = 1,
  Robot = 2,
}

export interface SkillsRequestObject {
  sku?: string;
  program?: Programs;
  type?: SkillsType;
  team?: string;
  season?: Seasons;
  rank?: number;
  season_rank?: number;
  limit_number?: number;
  limit_start?: number;

  // attempts?: number;
  // score?: number;
}

export const endpoints: Endpoint[] = [
  "events",
  "teams",
  "matches",
  "rankings",
  "season_rankings",
  "awards",
  "skills",
];

// For each endpoint, parameters that can be passed directly to vexdb
export const passableParams = {
  events: [
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
    "nodata",
  ],
  teams: [
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
    "nodata",
  ],
  matches: [
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
    "nodata",
  ],
  rankings: [
    "sku",
    "division",
    "team",
    "rank",
    "season",
    "limit_number",
    "limit_start",
    "nodata",
  ],
  season_rankings: [
    "program",
    "season",
    "team",
    "vrating_rank",
    "limit_number",
    "limit_start",
    "nodata",
  ],
  awards: [
    "sku",
    "name",
    "team",
    "season",
    "limit_number",
    "limit_start",
    "nodata",
  ],
  skills: [
    "sku",
    "program",
    "type",
    "team",
    "season",
    "rank",
    "season_rank",
    "limit_number",
    "limit_start",
    "nodata",
  ],
};
