export declare type Endpoint = "events" | "teams" | "matches" | "rankings" | "season_rankings" | "awards" | "skills";
export declare type RequestObject = TeamsRequestObject | EventsRequestObject | MatchesRequestObject | RankingsRequestObject | SeasonRankingsRequestObject | AwardsRequestObject | SkillsRequestObject;
export declare type Seasons = "Change Up" | "Tower Takeover" | "Turning Point" | "In The Zone" | "StarStruck" | "Nothing But Net" | "Skyrise" | "Toss Up" | "Sack Attack" | "Gateway" | "Round Up" | "Clean Sweep" | "Elevation" | "Bridge Battle" | "current";
export declare type Grades = "Middle School" | "High School" | "Collge";
export declare type Programs = "VEXU" | "VRC";
export interface TeamsRequestObject {
    team?: string;
    number?: string;
    team_name?: string;
    robot_name?: string;
    program?: Programs;
    organisation?: string;
    city?: string;
    region?: string;
    country?: string;
    grade?: Grades;
}
export interface EventsRequestObject {
    sku?: string;
    program?: Programs;
    date?: string;
    season?: Seasons;
    city?: string;
    region?: string;
    country?: string;
    status?: string;
    limit_number?: number;
    limit_start?: number;
    team?: string;
}
export interface MatchesRequestObject {
    sku?: string;
    division?: string;
    team?: string;
    round?: 1 | 2 | 3 | 4 | 5 | 16;
    instance?: number;
    matchnum?: number;
    scheduled?: number;
    field?: string;
    scored?: 0 | 1;
    season?: Seasons;
    limit_number?: number;
    limit_start?: number;
}
export interface RankingsRequestObject {
    sku?: string;
    division?: string;
    team?: string;
    rank?: string;
    season?: Seasons;
    limit_number?: number;
    limit_start?: number;
}
export interface SeasonRankingsRequestObject {
    program?: Programs;
    season?: Seasons;
    team?: string;
    vrating_rank?: number;
    limit_number?: number;
    limit_start?: number;
}
export interface AwardsRequestObject {
    sku?: string;
    name?: string;
    team?: string;
    season?: Seasons;
    limit_number?: number;
    limit_start?: number;
}
export declare enum SkillsType {
    Driver = 0,
    Programming = 1,
    Robot = 2
}
export interface SkillsRequestObject {
    sku?: string;
    program?: Programs;
    type?: SkillsType;
    team?: string;
    season?: Seasons;
    rank?: number;
    season_rank?: number;
    limit_number?: number;
    limit_start?: number;
}
export declare const endpoints: Endpoint[];
export declare const passableParams: {
    events: string[];
    teams: string[];
    matches: string[];
    rankings: string[];
    season_rankings: string[];
    awards: string[];
    skills: string[];
};
