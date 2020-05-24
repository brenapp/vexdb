import { TeamsRequestObject, EventsRequestObject, MatchesRequestObject, RankingsRequestObject, SeasonRankingsRequestObject, AwardsRequestObject, SkillsRequestObject } from "../constants/RequestObjects";
import { TeamsResponseObject, EventsResponseObject, MatchesResponseObject, RankingsResponseObject, SeasonRankingsResponseObject, AwardsResponseObject, SkillsResponseObject } from "../constants/ResponseObjects";
export declare function permute<I extends {
    [key: string]: string[];
}>(permutations: I): I[];
export default function get(endpoint: "teams", params: TeamsRequestObject): Promise<TeamsResponseObject[]>;
export default function get(endpoint: "events", params: EventsRequestObject): Promise<EventsResponseObject[]>;
export default function get(endpoint: "matches", params: MatchesRequestObject): Promise<MatchesResponseObject[]>;
export default function get(endpoint: "rankings", params: RankingsRequestObject): Promise<RankingsResponseObject[]>;
export default function get(endpoint: "season_rankings", params: SeasonRankingsRequestObject): Promise<SeasonRankingsResponseObject[]>;
export default function get(endpoint: "awards", params: AwardsRequestObject): Promise<AwardsResponseObject[]>;
export default function get(endpoint: "skills", params: SkillsRequestObject): Promise<SkillsResponseObject[]>;
