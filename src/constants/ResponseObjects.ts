/**
 * Response Objects
 */

import { SkillsType, Seasons, Programs, Grades } from "./RequestObjects";

export type ResponseObject =
  | TeamsResponseObject
  | EventsResponseObject
  | MatchesResponseObject
  | RankingsResponseObject
  | SeasonRankingsResponseObject
  | AwardsResponseObject
  | SkillsResponseObject;

export interface TeamsResponseObject {
  number: string;
  program: Programs;
  team_name: string;
  robot_name: string;
  organisation: string;
  city: string;
  region: string;
  country: string;
  grade: Grades;
  is_registered: 0 | 1;
}

export interface EventsResponseObject {
  sku: string;
  key: string;
  program: Programs;
  name: string;
  loc_venue: string;
  loc_address1: string;
  loc_address2: string;
  loc_city: string;
  loc_region: string;
  loc_postcode: string;
  loc_country: string;
  season: Seasons;
  start: string;
  end: string;
  divisions: string[];
}

export interface MatchesResponseObject {
  sku: string;
  division: string;
  round: 1 | 2 | 3 | 4 | 5 | 6 | 16;
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

export interface RankingsResponseObject {
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

export interface SeasonRankingsResponseObject {
  team: string;
  season: Seasons;
  program: Programs;
  vrating_rank: number;
  vrating: number;
}

export interface AwardsResponseObject {
  sku: string;
  name: string;
  team: string;
  qualifies: string[];
  order: number;
}

export interface SkillsResponseObject {
  sku: string;
  type: SkillsType;
  rank: number;
  team: string;
  program: Programs;
  attempts: number;
  score: number;
}
