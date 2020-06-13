import { TeamsRequestObject, EventsRequestObject, MatchesRequestObject, RankingsRequestObject, SeasonRankingsRequestObject, AwardsRequestObject, SkillsRequestObject } from "../constants/RequestObjects";
import { TeamsResponseObject, EventsResponseObject, MatchesResponseObject, RankingsResponseObject, SeasonRankingsResponseObject, AwardsResponseObject, SkillsResponseObject } from "../constants/ResponseObjects";
export interface APISuccess<T> {
    status: 1;
    size: number;
    result: T[];
}
export interface APIFailure<T> {
    status: 0;
    error_code: number;
    error_text: string;
}
export declare type APIResponse<T> = APISuccess<T> | APIFailure<T>;
export interface CacheEntry<T> {
    expires: number;
    value: APIResponse<T>;
}
export declare function store(endpoint: "teams", params: TeamsRequestObject, data: APIResponse<TeamsResponseObject>): Promise<boolean>;
export declare function store(endpoint: "events", params: EventsRequestObject, data: APIResponse<EventsResponseObject>): Promise<boolean>;
export declare function store(endpoint: "matches", params: MatchesRequestObject, data: APIResponse<MatchesResponseObject>): Promise<boolean>;
export declare function store(endpoint: "rankings", params: RankingsRequestObject, data: APIResponse<RankingsResponseObject>): Promise<boolean>;
export declare function store(endpoint: "season_rankings", params: SeasonRankingsRequestObject, data: APIResponse<SeasonRankingsResponseObject>): Promise<boolean>;
export declare function store(endpoint: "skills", params: SkillsRequestObject, data: APIResponse<SkillsResponseObject>): Promise<boolean>;
export declare function store(endpoint: "awards", params: AwardsRequestObject, data: APIResponse<AwardsResponseObject>): Promise<boolean>;
export declare function resolve(endpoint: "teams", params: TeamsRequestObject): Promise<APIResponse<TeamsRequestObject>>;
export declare function resolve(endpoint: "events", params: EventsRequestObject): Promise<APIResponse<EventsRequestObject>>;
export declare function resolve(endpoint: "matches", params: MatchesRequestObject): Promise<APIResponse<MatchesRequestObject>>;
export declare function resolve(endpoint: "rankings", params: RankingsRequestObject): Promise<APIResponse<RankingsRequestObject>>;
export declare function resolve(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<APIResponse<SeasonRankingsRequestObject>>;
export declare function resolve(endpoint: "skills", params: SkillsRequestObject): Promise<APIResponse<SkillsRequestObject>>;
export declare function resolve(endpoint: "awards", params: AwardsRequestObject): Promise<APIResponse<AwardsRequestObject>>;
