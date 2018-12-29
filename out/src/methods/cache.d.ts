import { TeamsRequestObject, SkillsRequestObject, SeasonRankingsRequestObject, RankingsRequestObject, MatchesRequestObject, EventsRequestObject, AwardsRequestObject } from "../constants/RequestObjects";
import { TeamsResponseObject, SkillsResponseObject, AwardsResponseObject, SeasonRankingsResponseObject, RankingsResponseObject, MatchesResponseObject, EventsResponseObject } from "../constants/ResponseObjects";
export interface CacheEntry<T> {
    expiry: number;
    value: {
        status: 0 | 1;
        size: number;
        result: T[];
    };
}
export declare function cache(endpoint: "teams", params: TeamsRequestObject, value: TeamsResponseObject[]): Promise<CacheEntry<TeamsResponseObject>>;
export declare function cache(endpoint: "events", params: EventsRequestObject, value: EventsResponseObject[]): Promise<CacheEntry<EventsResponseObject>>;
export declare function cache(endpoint: "matches", params: MatchesRequestObject, value: MatchesResponseObject[]): Promise<CacheEntry<MatchesResponseObject>>;
export declare function cache(endpoint: "rankings", params: RankingsRequestObject, value: RankingsResponseObject[]): Promise<CacheEntry<RankingsResponseObject>>;
export declare function cache(endpoint: "season_rankings", params: SeasonRankingsRequestObject, value: SeasonRankingsResponseObject[]): Promise<CacheEntry<SeasonRankingsResponseObject>>;
export declare function cache(endpoint: "awards", params: AwardsRequestObject, value: AwardsResponseObject[]): Promise<CacheEntry<AwardsResponseObject>>;
export declare function cache(endpoint: "skills", params: SkillsRequestObject, value: SkillsResponseObject[]): Promise<CacheEntry<SkillsResponseObject>>;
export declare namespace cache {
    function resolve(endpoint: "teams", params: TeamsRequestObject): Promise<CacheEntry<TeamsResponseObject>>;
    function resolve(endpoint: "events", params: EventsRequestObject): Promise<CacheEntry<EventsResponseObject>>;
    function resolve(endpoint: "matches", params: MatchesRequestObject): Promise<CacheEntry<MatchesResponseObject>>;
    function resolve(endpoint: "rankings", params: RankingsRequestObject): Promise<CacheEntry<RankingsResponseObject>>;
    function resolve(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<CacheEntry<SeasonRankingsResponseObject>>;
    function resolve(endpoint: "awards", params: AwardsRequestObject): Promise<CacheEntry<AwardsResponseObject>>;
    function resolve(endpoint: "skills", params: SkillsRequestObject): Promise<CacheEntry<SkillsResponseObject>>;
    function has(endpoint: "teams", params: TeamsRequestObject): Promise<boolean>;
    function has(endpoint: "events", params: EventsRequestObject): Promise<boolean>;
    function has(endpoint: "matches", params: MatchesRequestObject): Promise<boolean>;
    function has(endpoint: "rankings", params: RankingsRequestObject): Promise<boolean>;
    function has(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<boolean>;
    function has(endpoint: "awards", params: AwardsRequestObject): Promise<boolean>;
    function has(endpoint: "skills", params: SkillsRequestObject): Promise<boolean>;
    function clear(): Promise<void>;
    function serialize(url: any, params: any): string;
    function sanitize(endpoint: any, params: any): string;
}
