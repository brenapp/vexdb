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

export type Filter<
  ResponseObject,
  Key extends keyof ResponseObject,
  Direct extends ResponseObject[Key]
> =
  | ((
      key: ResponseObject[Key],
      full: ResponseObject
    ) => Promise<boolean> | boolean)
  | Direct;

export type Grades = "Middle School" | "High School" | "Collge";
export type Programs = "VEXU" | "VRC";

export interface TeamsRequestObject {
  team?: string;
  number?: Filter<TeamsResponseObject, "number", string>;
  team_name?: Filter<TeamsResponseObject, "team_name", string>;
  robot_name?: Filter<TeamsResponseObject, "robot_name", string>;
  program?: Filter<TeamsResponseObject, "program", Programs>;
  organisation?: Filter<TeamsResponseObject, "organisation", string>;
  city?: Filter<TeamsResponseObject, "city", string>;
  region?: Filter<TeamsResponseObject, "region", string>;
  country?: Filter<TeamsResponseObject, "country", string>;
  grade?: Filter<TeamsResponseObject, "country", Grades>;

  is_registered?: 0 | 1;
  sku?: string;
  limit_number?: number;
  limit_start?: number;
}

export interface EventsRequestObject {
  sku?: string;
  program?: Filter<EventsResponseObject, "program", Programs>;
  date?: string;
  season?: Filter<EventsResponseObject, "season", Seasons>;
  city?: string;
  region?: string;
  country?: string;
  status?: string;
  limit_number?: number;
  limit_start?: number;
  team?: string;

  key?: Filter<EventsResponseObject, "key", string>;
  name?: Filter<EventsResponseObject, "name", string>;
  loc_venue?: Filter<EventsResponseObject, "loc_venue", string>;
  loc_address1?: Filter<EventsResponseObject, "loc_address1", string>;
  loc_address2?: Filter<EventsResponseObject, "loc_address2", string>;
  loc_city?: Filter<EventsResponseObject, "loc_city", string>;
  loc_region?: Filter<EventsResponseObject, "loc_region", string>;
  loc_postcode?: Filter<EventsResponseObject, "loc_postcode", string>;
  loc_country?: Filter<EventsResponseObject, "loc_country", string>;
  start?: Filter<EventsResponseObject, "start", string>;
  end?: Filter<EventsResponseObject, "end", string>;
}

export interface MatchesRequestObject {
  sku?: Filter<MatchesResponseObject, "sku", string>;
  division?: Filter<MatchesResponseObject, "division", string>;
  team?: string;
  round?: 1 | 2 | 3 | 4 | 5 | 16;
  instance?: Filter<MatchesResponseObject, "instance", number>;
  matchnum?: Filter<MatchesResponseObject, "matchnum", number>;
  scheduled?: Filter<MatchesResponseObject, "scheduled", string>;
  field?: Filter<MatchesResponseObject, "field", string>;
  scored?: 0 | 1;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  red1?: Filter<MatchesResponseObject, "red1", string>;
  red2?: Filter<MatchesResponseObject, "red2", string>;
  red3?: Filter<MatchesResponseObject, "red3", string>;
  redsit?: Filter<MatchesResponseObject, "redsit", string>;
  blue1?: Filter<MatchesResponseObject, "blue1", string>;
  blue2?: Filter<MatchesResponseObject, "blue2", string>;
  blue3?: Filter<MatchesResponseObject, "blue3", string>;
  bluesit?: Filter<MatchesResponseObject, "bluesit", string>;
  redscore?: Filter<MatchesResponseObject, "redscore", number>;
  bluescore?: Filter<MatchesResponseObject, "bluescore", number>;
}

export interface RankingsRequestObject {
  sku?: Filter<RankingsResponseObject, "sku", string>;
  division?: Filter<RankingsResponseObject, "division", string>;
  team?: Filter<RankingsResponseObject, "team", string>;
  rank?: Filter<RankingsResponseObject, "rank", number>;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  wins?: Filter<RankingsResponseObject, "wins", number>;
  losses?: Filter<RankingsResponseObject, "losses", number>;
  ties?: Filter<RankingsResponseObject, "ties", number>;
  wp?: Filter<RankingsResponseObject, "wp", number>;
  ap?: Filter<RankingsResponseObject, "ap", number>;
  sp?: Filter<RankingsResponseObject, "sp", number>;
  trsp?: Filter<RankingsResponseObject, "trsp", number>;
  max_score?: Filter<RankingsResponseObject, "max_score", number>;
  opr?: Filter<RankingsResponseObject, "opr", number>;
  dpr?: Filter<RankingsResponseObject, "dpr", number>;
  ccwm?: Filter<RankingsResponseObject, "ccwm", number>;
}

export interface SeasonRankingsRequestObject {
  program?: Filter<SeasonRankingsResponseObject, "program", Programs>;
  season?: Filter<SeasonRankingsResponseObject, "season", Seasons>;
  team?: Filter<SeasonRankingsResponseObject, "team", string>;
  vrating_rank?: Filter<SeasonRankingsResponseObject, "vrating_rank", number>;
  limit_number?: number;
  limit_start?: number;

  vrating?: Filter<SeasonRankingsResponseObject, "vrating", number>;
}

export interface AwardsRequestObject {
  sku?: Filter<AwardsResponseObject, "sku", string>;
  name?: Filter<AwardsResponseObject, "name", string>;
  team?: Filter<AwardsResponseObject, "team", string>;
  season?: Seasons;
  limit_number?: number;
  limit_start?: number;

  order?: Filter<AwardsResponseObject, "order", number>;
}

export enum SkillsType {
  Driver = 0,
  Programming = 1,
  Robot = 2,
}

export interface SkillsRequestObject {
  sku?: Filter<SkillsResponseObject, "sku", string>;
  program?: Filter<SkillsResponseObject, "program", Programs>;
  type?: Filter<SkillsResponseObject, "type", SkillsType>;
  team?: Filter<SkillsResponseObject, "team", string>;
  season?: Seasons;
  rank?: Filter<SkillsResponseObject, "rank", number>;
  season_rank?: number;
  limit_number?: number;
  limit_start?: number;

  attempts?: Filter<SkillsResponseObject, "attempts", number>;
  score?: Filter<SkillsResponseObject, "score", number>;
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
