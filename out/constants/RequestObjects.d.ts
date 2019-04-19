import { ResponseObject } from "./ResponseObjects";
export declare type Endpoint = "events" | "teams" | "matches" | "rankings" | "season_rankings" | "awards" | "skills";
export declare type StringRequest = string | string[] | RegExp | StringRequestValidatorFunction;
export declare type StringRequestValidatorFunction = (itemValue: string, item: ResponseObject) => Promise<boolean> | boolean;
export declare type NumberRequest = number | number[] | NumberRequestValidatorFunction;
export declare type NumberRequestValidatorFunction = (itemValue: number, item: ResponseObject) => Promise<boolean> | boolean;
export declare type RequestObject = TeamsRequestObject | EventsRequestObject | MatchesRequestObject | RankingsRequestObject | SeasonRankingsRequestObject | AwardsRequestObject | SkillsRequestObject;
export interface TeamsRequestObject {
    single?: boolean;
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
    single?: boolean;
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
    team?: string;
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
    single?: boolean;
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
    single?: boolean;
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
    single?: boolean;
    program?: StringRequest;
    season?: StringRequest;
    team?: StringRequest;
    vrating_rank?: NumberRequest;
    limit_number?: number;
    limit_start?: number;
    vrating?: NumberRequest;
}
export interface AwardsRequestObject {
    single?: boolean;
    sku?: StringRequest;
    name?: StringRequest;
    team?: StringRequest;
    season?: StringRequest;
    limit_number?: number;
    limit_start?: number;
    order?: NumberRequest;
}
export interface SkillsRequestObject {
    single?: boolean;
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
export declare const endpoints: Endpoint[];
export declare const validParams: {
    events: string[];
    teams: string[];
    matches: string[];
    rankings: string[];
    season_rankings: string[];
    awards: string[];
    skills: string[];
};
