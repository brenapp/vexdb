import { TeamsRequestObject, EventsRequestObject, MatchesRequestObject, RankingsRequestObject, SeasonRankingsRequestObject, AwardsRequestObject, SkillsRequestObject } from "../constants/RequestObjects";
import { TeamsResponseObject, EventsResponseObject, MatchesResponseObject, RankingsResponseObject, SeasonRankingsResponseObject, AwardsResponseObject, SkillsResponseObject } from "../constants/ResponseObjects";
export default function get(endpoint: "teams", params: TeamsRequestObject): Promise<TeamsResponseObject[]>;
export default function get(endpoint: "events", params: EventsRequestObject): Promise<EventsResponseObject[]>;
export default function get(endpoint: "matches", params: MatchesRequestObject): Promise<MatchesResponseObject[]>;
export default function get(endpoint: "rankings", params: RankingsRequestObject): Promise<RankingsResponseObject[]>;
export default function get(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<SeasonRankingsResponseObject[]>;
export default function get(endpoint: "awards", params: AwardsRequestObject): Promise<AwardsResponseObject[]>;
export default function get(endpoint: "skills", params: SkillsRequestObject): Promise<SkillsResponseObject[]>;
export declare function size(endpoint: "teams", params: TeamsRequestObject): Promise<number>;
export declare function size(endpoint: "events", params: EventsRequestObject): Promise<number>;
export declare function size(endpoint: "matches", params: MatchesRequestObject): Promise<number>;
export declare function size(endpoint: "rankings", params: RankingsRequestObject): Promise<number>;
export declare function size(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<number>;
export declare function size(endpoint: "awards", params: AwardsRequestObject): Promise<number>;
export declare function size(endpoint: "skills", params: SkillsRequestObject): Promise<number>;
