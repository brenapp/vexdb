import { ResponseObject } from "./ResponseObjects";

export type Endpoint =
  | "events"
  | "teams"
  | "matches"
  | "rankings"
  | "season_rankings"
  | "awards"
  | "skills";

export type StringRequest =
  | string
  | string[]
  | RegExp
  | StringRequestValidatorFunction;
export type StringRequestValidatorFunction = (
  itemValue: string,
  item: ResponseObject
) => Promise<boolean> | boolean;

export type NumberRequest = number | number[] | NumberRequestValidatorFunction;
export type NumberRequestValidatorFunction = (
  itemValue: number,
  item: ResponseObject
) => Promise<boolean> | boolean;

export type RequestObject =
  | TeamsRequestObject
  | EventsRequestObject
  | MatchesRequestObject
  | RankingsRequestObject
  | SeasonRankingsRequestObject
  | AwardsRequestObject
  | SkillsRequestObject;

export interface TeamsRequestObject {
  team?: StringRequest;
  number?: StringRequest;
  team_name?: StringRequest;
  robot_name?: StringRequest;
  program?: StringRequest;
  organisation?: StringRequest;
  city?: StringRequest;
  region?: StringRequest;
  country?: StringRequest;
  grade?: StringRequest;
  is_registered?: NumberRequest;
  sku?: StringRequest;
  limit_number?: number;
  limit_start?: number;
}

export interface EventsRequestObject {
  sku?: StringRequest;
  program?: StringRequest;
  date?: StringRequest;
  season?: StringRequest;
  city?: StringRequest;
  region?: StringRequest;
  country?: StringRequest;
  status?: StringRequest;
  limit_number?: number;
  limit_start?: number;

  key?: StringRequest;
  name?: StringRequest;
  loc_venue?: StringRequest;
  loc_address1?: StringRequest;
  loc_address2?: StringRequest;
  loc_city?: StringRequest;
  loc_region?: StringRequest;
  loc_postcode?: StringRequest;
  loc_country?: StringRequest;
  start?: StringRequest;
  end?: StringRequest;
}

export interface MatchesRequestObject {
  sku?: StringRequest;
  division?: StringRequest;
  team?: StringRequest;
  round?: NumberRequest;
  instance?: NumberRequest;
  matchnum?: NumberRequest;
  scheduled?: NumberRequest;
  field?: StringRequest;
  scored?: NumberRequest;
  season?: StringRequest;
  limit_number?: number;
  limit_start?: number;

  red1?: StringRequest;
  red2?: StringRequest;
  red3?: StringRequest;
  redsit?: StringRequest;
  blue1?: StringRequest;
  blue2?: StringRequest;
  blue3?: StringRequest;
  bluesit?: StringRequest;
  redscore?: NumberRequest;
  bluescore?: NumberRequest;
}

export interface RankingsRequestObject {
  sku?: StringRequest;
  division?: StringRequest;
  team?: StringRequest;
  rank?: StringRequest;
  season?: StringRequest;
  limit_number?: number;
  limit_start?: number;

  wins?: NumberRequest;
  losses?: NumberRequest;
  ties?: NumberRequest;
  wp?: NumberRequest;
  ap?: NumberRequest;
  sp?: NumberRequest;
  trsp?: NumberRequest;
  max_score?: NumberRequest;
  opr?: NumberRequest;
  dpr?: NumberRequest;
  ccwm?: NumberRequest;
}

export interface SeasonRankingsRequestObject {
  program?: StringRequest;
  season?: StringRequest;
  team?: StringRequest;
  vrating_rank?: NumberRequest;
  limit_number?: number;
  limit_start?: number;

  vrating?: NumberRequest;
}

export interface AwardsRequestObject {
  sku?: StringRequest;
  name?: StringRequest;
  team?: StringRequest;
  season?: StringRequest;
  limit_number?: number;
  limit_start?: number;

  order?: NumberRequest;
}

export interface SkillsRequestObject {
  sku?: StringRequest;
  program?: StringRequest;
  type?: NumberRequest;
  team?: StringRequest;
  season?: StringRequest;
  rank?: NumberRequest;
  season_rank?: NumberRequest;
  limit_number?: number;
  limit_start?: number;

  attempts?: NumberRequest;
  score?: NumberRequest;
}

export const endpoints: Endpoint[] = [
  "events",
  "teams",
  "matches",
  "rankings",
  "season_rankings",
  "awards",
  "skills"
];

export const validParams = {
  events: [
    "sku",
    "program",
    "date",
    "season",
    "city",
    "region",
    "country",
    "status",
    "limit_number",
    "limit_start",
    "nodata"
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
    "nodata"
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
    "nodata"
  ],
  rankings: [
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
    "program",
    "season",
    "team",
    "vrating_rank",
    "limit_number",
    "limit_start",
    "nodata"
  ],
  awards: [
    "sku",
    "name",
    "team",
    "season",
    "limit_number",
    "limit_start",
    "nodata"
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
    "nodata"
  ]
};
