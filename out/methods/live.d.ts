/// <reference types="node" />
import { EventEmitter } from "events";
import { TeamsRequestObject, EventsRequestObject, MatchesRequestObject, RankingsRequestObject, SeasonRankingsRequestObject, AwardsRequestObject, SkillsRequestObject, RequestObject } from "../constants/RequestObjects";
import { TeamsResponseObject, EventsResponseObject, MatchesResponseObject, RankingsResponseObject, SeasonRankingsResponseObject, AwardsResponseObject, SkillsResponseObject, ResponseObject } from "../constants/ResponseObjects";
export interface LiveEventEmitter<Q, R> extends EventEmitter {
    close(): void;
    params(updateParameters: Q): Q;
    current(): R[];
    fetch(): Promise<boolean>;
    on(event: "item", callback: (item: R) => void): this;
    on(event: "fetch", callback: (newItems: R[]) => void): this;
    on(event: "prefetch", callback: (results: R[]) => void): this;
}
export declare type LiveRequestObject<T> = T & {
    prefetch?: boolean;
};
export declare function live(endpoint: "teams", params: LiveRequestObject<TeamsRequestObject>): LiveEventEmitter<TeamsRequestObject, TeamsResponseObject>;
export declare function live(endpoint: "events", params: LiveRequestObject<EventsRequestObject>): LiveEventEmitter<EventsRequestObject, EventsResponseObject>;
export declare function live(endpoint: "matches", params: LiveRequestObject<MatchesRequestObject>): LiveEventEmitter<MatchesRequestObject, MatchesResponseObject>;
export declare function live(endpoint: "rankings", params: LiveRequestObject<RankingsRequestObject>): LiveEventEmitter<RankingsRequestObject, RankingsResponseObject>;
export declare function live(endpoint: "season_rankings", params: LiveRequestObject<SeasonRankingsRequestObject>): LiveEventEmitter<SeasonRankingsRequestObject, SeasonRankingsResponseObject>;
export declare function live(endpoint: "awards", params: LiveRequestObject<AwardsRequestObject>): LiveEventEmitter<AwardsRequestObject, AwardsResponseObject>;
export declare function live(endpoint: "skills", params: LiveRequestObject<SkillsRequestObject>): LiveEventEmitter<SkillsRequestObject, SkillsResponseObject>;
export declare function live(endpoint: string, params: LiveRequestObject<RequestObject>): LiveEventEmitter<RequestObject, ResponseObject>;
