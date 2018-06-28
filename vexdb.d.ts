// Type definitions for vexdb 1.5
// Project: https://github.com/MayorMonty/vexdb#readme
// Definitions by: Brendan McGuire <https://github.com/MayorMonty>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { EventEmitter } from "events";

type Endpoint =
  | "events"
  | "teams"
  | "matches"
  | "rankings"
  | "season_rankings"
  | "awards"
  | "skills";

interface CacheEntry {
  expiry: number;
  value: {
    status: 0 | 1;
    size: number;
    result: object[];
  };
}
export function cache(
  endpoint: Endpoint,
  params: object,
  value: object
): CacheEntry;

/**
 * Parameter Objects
 */
type StringRequest =
  | string
  | string[]
  | RegExp
  | StringRequestValidatorFunction;
type StringRequestValidatorFunction = (
  itemValue: string,
  item: ResponseObject
) => Promise<boolean> | boolean;

type NumberRequest = number | number[] | NumberRequestValidatorFunction;
type NumberRequestValidatorFunction = (
  itemValue: number,
  item: ResponseObject
) => Promise<boolean> | boolean;

/**
 * Request Objects
 */

type RequestObject =
  | TeamsRequestObject
  | EventsRequestObject
  | MatchesRequestObject
  | RankingsRequestObject
  | SeasonRankingsRequestObject
  | AwardsRequestObject
  | SkillsRequestObject;

interface TeamsRequestObject {
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

interface EventsRequestObject {
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

interface MatchesRequestObject {
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

interface RankingsRequestObject {
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

interface SeasonRankingsRequestObject {
  program?: StringRequest;
  season?: StringRequest;
  team?: StringRequest;
  vrating_rank?: NumberRequest;
  limit_number?: number;
  limit_start?: number;

  vrating?: NumberRequest;
}

interface AwardsRequestObject {
  sku?: StringRequest;
  name?: StringRequest;
  team?: StringRequest;
  season?: StringRequest;
  limit_number?: number;
  limit_start?: number;

  order?: NumberRequest;
}

interface SkillsRequestObject {
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

/**
 * Response Objects
 */

type ResponseObject =
  | TeamsResponseObject
  | EventsResponseObject
  | MatchesResponseObject
  | RankingsResponseObject
  | SeasonRankingsResponseObject
  | AwardsResponseObject
  | SkillsResponseObject;

interface TeamsResponseObject {
  number: string;
  program: string;
  team_name: string;
  robot_name: string;
  organisation: string;
  city: string;
  region: string;
  country: string;
  grade: string;
  is_registered: 0 | 1;
}

interface EventsResponseObject {
  sku: string;
  key: string;
  program: string;
  name: string;
  loc_venue: string;
  loc_address1: string;
  loc_address2: string;
  loc_city: string;
  loc_region: string;
  loc_postcode: string;
  loc_country: string;
  season: string;
  start: string;
  end: string;
  divisions: string[];
}

interface MatchesResponseObject {
  sku: string;
  division: string;
  round: 1 | 2 | 3 | 4 | 5 | 6;
  instance: number;
  matchnum: number;
  field: string;
  red1: string;
  red2: string;
  red3: string;
  redsit: string;
  blue1: string;
  blue2: string;
  blue3: string;
  bluesit: string;
  redscore: number;
  bluescore: number;
  scored: 0 | 1;
  scheduled: string;
}

interface RankingsResponseObject {
  sku: string;
  division: string;
  rank: number;
  team: string;
  wins: number;
  losses: number;
  ties: number;
  wp: number;
  ap: number;
  sp: number;
  trsp: number;
  max_score: number;
  opr: number;
  dpr: number;
  ccwm: number;
}

interface SeasonRankingsResponseObject {
  team: string;
  season: string;
  program: string;
  vrating_rank: number;
  vrating: number;
}

interface AwardsResponseObject {
  sku: string;
  name: string;
  team: string;
  qualifies: string[];
  order: number;
}

interface SkillsResponseObject {
  sku: string;
  type: number;
  rank: number;
  team: string;
  program: string;
  attempts: number;
  score: number;
}

export function get(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<TeamsResponseObject[]>;

export function get(
  endpoint: "events",
  params: EventsRequestObject
): Promise<EventsResponseObject[]>;

export function get(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<MatchesResponseObject[]>;

export function get(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<RankingsResponseObject[]>;

export function get(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<SeasonRankingsResponseObject[]>;

export function get(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<AwardsResponseObject[]>;

export function get(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<SkillsResponseObject[]>;

interface LiveEventEmitter extends EventEmitter {
  close(): void;
  params(updateParameters: object): object;
  current(): object[];
}
export function live(
  endpoint: "teams",
  params: TeamsRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "events",
  params: EventsRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "matches",
  params: MatchesRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "rankings",
  params: RankingsRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "awards",
  params: AwardsRequestObject
): LiveEventEmitter;
export function live(
  endpoint: "skills",
  params: SkillsRequestObject
): LiveEventEmitter;

export function size(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<number>;
export function size(
  endpoint: "events",
  params: EventsRequestObject
): Promise<number>;
export function size(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<number>;
export function size(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<number>;
export function size(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<number>;
export function size(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<number>;
export function size(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<number>;

export namespace cache {
  const ttl: number;

  function clear(): void;

  export function has(endpoint: "teams", params: TeamsRequestObject): boolean;
  export function has(
    endpoint: "events",
    params: EventsRequestObject
  ): boolean;
  export function has(
    endpoint: "matches",
    params: MatchesRequestObject
  ): boolean;
  export function has(
    endpoint: "rankings",
    params: RankingsRequestObject
  ): boolean;
  export function has(
    endpoint: "season_rankings",
    params: SeasonRankingsRequestObject
  ): boolean;
  export function has(
    endpoint: "awards",
    params: AwardsRequestObject
  ): boolean;
  export function has(
    endpoint: "skills",
    params: SkillsRequestObject
  ): boolean;

  export function resolve(
    endpoint: "teams",
    params: TeamsRequestObject
  ): { status: 0 | 1; size: number; result: TeamsResponseObject[] };
  export function resolve(
    endpoint: "events",
    params: EventsRequestObject
  ): { status: 0 | 1; size: number; result: EventsResponseObject[] };
  export function resolve(
    endpoint: "matches",
    params: MatchesRequestObject
  ): { status: 0 | 1; size: number; result: MatchesResponseObject[] };
  export function resolve(
    endpoint: "rankings",
    params: RankingsRequestObject
  ): { status: 0 | 1; size: number; result: RankingsResponseObject[] };
  export function resolve(
    endpoint: "season_rankings",
    params: SeasonRankingsRequestObject
  ): { status: 0 | 1; size: number; result: SeasonRankingsResponseObject[] };
  export function resolve(
    endpoint: "awards",
    params: AwardsRequestObject
  ): { status: 0 | 1; size: number; result: AwardsResponseObject[] };
  export function resolve(
    endpoint: "skills",
    params: SkillsRequestObject
  ): { status: 0 | 1; size: number; result: SkillsResponseObject[] };

  function sanitize(endpoint: Endpoint, params: object): object;

  function serialize(url: any, params: object): object;

  function setTTL(ttl: number): object;
}

export namespace constant {
  const endpoints: string[];

  const settings: {
    baseURL: string;
    cache: {
      ttl: number;
    };
    headers: {
      "User-Agent": string;
    };
    live: {
      pollTime: number;
    };
    params: {};
  };

  const uniques: {
    events: string;
    teams: string;
  };

  const validParams: {
    awards: string[];
    events: string[];
    matches: string[];
    rankings: string[];
    season_rankings: string[];
    skills: string[];
    teams: string[];
  };

  function header(headers: object): void;

  function isBrowser(): boolean;

  function param(params: object): void;
}
