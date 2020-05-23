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

export type StringRequest<T, S = string> =
  | S
  | S[]
  | RegExp
  | StringRequestValidatorFunction<T, S>;
export type StringRequestValidatorFunction<T, S> = (
  itemValue: S,
  item: T
) => Promise<boolean> | boolean;

export type NumberRequest<T> =
  | number
  | number[]
  | NumberRequestValidatorFunction<T>;
export type NumberRequestValidatorFunction<T> = (
  itemValue: number,
  item: T
) => Promise<boolean> | boolean;

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
  | "Bridge Battle";

export interface TeamsRequestObject {
  team?: StringRequest<TeamsResponseObject>;
  number?: StringRequest<TeamsResponseObject>;
  team_name?: StringRequest<TeamsResponseObject>;
  robot_name?: StringRequest<TeamsResponseObject>;
  program?: StringRequest<TeamsResponseObject, "VRC" | "VEXU">;
  organisation?: StringRequest<TeamsResponseObject>;
  city?: StringRequest<TeamsResponseObject>;
  region?: StringRequest<TeamsResponseObject>;
  country?: StringRequest<TeamsResponseObject>;
  grade?: StringRequest<
    TeamsResponseObject,
    "College" | "High School" | "Middle School"
  >;
  is_registered?: NumberRequest<TeamsResponseObject>;
  sku?: StringRequest<TeamsResponseObject>;
  limit_number?: number;
  limit_start?: number;
}

export interface EventsRequestObject {
  sku?: StringRequest<EventsResponseObject>;
  program?: StringRequest<EventsResponseObject, "VRC" | "VEXU">;
  date?: StringRequest<EventsResponseObject>;
  season?: StringRequest<EventsResponseObject, Seasons>;
  city?: StringRequest<EventsResponseObject>;
  region?: StringRequest<EventsResponseObject>;
  country?: StringRequest<EventsResponseObject>;
  status?: StringRequest<EventsResponseObject>;
  limit_number?: number;
  limit_start?: number;
  team?: string;

  key?: StringRequest<EventsResponseObject>;
  name?: StringRequest<EventsResponseObject>;
  loc_venue?: StringRequest<EventsResponseObject>;
  loc_address1?: StringRequest<EventsResponseObject>;
  loc_address2?: StringRequest<EventsResponseObject>;
  loc_city?: StringRequest<EventsResponseObject>;
  loc_region?: StringRequest<EventsResponseObject>;
  loc_postcode?: StringRequest<EventsResponseObject>;
  loc_country?: StringRequest<EventsResponseObject>;
  start?: StringRequest<EventsResponseObject>;
  end?: StringRequest<EventsResponseObject>;
}

export interface MatchesRequestObject {
  sku?: StringRequest<MatchesResponseObject>;
  division?: StringRequest<MatchesResponseObject>;
  team?: StringRequest<MatchesResponseObject>;
  round?: NumberRequest<MatchesResponseObject>;
  instance?: NumberRequest<MatchesResponseObject>;
  matchnum?: NumberRequest<MatchesResponseObject>;
  scheduled?: NumberRequest<MatchesResponseObject>;
  field?: StringRequest<MatchesResponseObject>;
  scored?: NumberRequest<MatchesResponseObject>;
  season?: StringRequest<MatchesResponseObject, Seasons>;
  limit_number?: number;
  limit_start?: number;

  red1?: StringRequest<MatchesResponseObject>;
  red2?: StringRequest<MatchesResponseObject>;
  red3?: StringRequest<MatchesResponseObject>;
  redsit?: StringRequest<MatchesResponseObject>;
  blue1?: StringRequest<MatchesResponseObject>;
  blue2?: StringRequest<MatchesResponseObject>;
  blue3?: StringRequest<MatchesResponseObject>;
  bluesit?: StringRequest<MatchesResponseObject>;
  redscore?: NumberRequest<MatchesResponseObject>;
  bluescore?: NumberRequest<MatchesResponseObject>;
}

export interface RankingsRequestObject {
  sku?: StringRequest<RankingsResponseObject>;
  division?: StringRequest<RankingsResponseObject>;
  team?: StringRequest<RankingsResponseObject>;
  rank?: StringRequest<RankingsResponseObject>;
  season?: StringRequest<RankingsResponseObject, Seasons>;
  limit_number?: number;
  limit_start?: number;

  wins?: NumberRequest<RankingsResponseObject>;
  losses?: NumberRequest<RankingsResponseObject>;
  ties?: NumberRequest<RankingsResponseObject>;
  wp?: NumberRequest<RankingsResponseObject>;
  ap?: NumberRequest<RankingsResponseObject>;
  sp?: NumberRequest<RankingsResponseObject>;
  trsp?: NumberRequest<RankingsResponseObject>;
  max_score?: NumberRequest<RankingsResponseObject>;
  opr?: NumberRequest<RankingsResponseObject>;
  dpr?: NumberRequest<RankingsResponseObject>;
  ccwm?: NumberRequest<RankingsResponseObject>;
}

export interface SeasonRankingsRequestObject {
  program?: StringRequest<SeasonRankingsResponseObject, "VRC" | "VEXU">;
  season?: StringRequest<SeasonRankingsResponseObject, Seasons>;
  team?: StringRequest<SeasonRankingsResponseObject>;
  vrating_rank?: NumberRequest<SeasonRankingsResponseObject>;
  limit_number?: number;
  limit_start?: number;

  vrating?: NumberRequest<SeasonRankingsResponseObject>;
}

export interface AwardsRequestObject {
  sku?: StringRequest<AwardsResponseObject>;
  name?: StringRequest<AwardsResponseObject>;
  team?: StringRequest<AwardsResponseObject>;
  season?: StringRequest<AwardsResponseObject, Seasons>;
  limit_number?: number;
  limit_start?: number;

  order?: NumberRequest<AwardsResponseObject>;
}

export interface SkillsRequestObject {
  sku?: StringRequest<SkillsResponseObject>;
  program?: StringRequest<SkillsResponseObject, "VRC" | "VEXU">;
  type?: NumberRequest<SkillsResponseObject>;
  team?: StringRequest<SkillsResponseObject>;
  season?: StringRequest<SkillsResponseObject, Seasons>;
  rank?: NumberRequest<SkillsResponseObject>;
  season_rank?: NumberRequest<SkillsResponseObject>;
  limit_number?: number;
  limit_start?: number;

  attempts?: NumberRequest<SkillsResponseObject>;
  score?: NumberRequest<SkillsResponseObject>;
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

export const validParams = {
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
