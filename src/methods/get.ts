/**
 * Typesafe, Cache Respecting, Filterable GET function
 *
 */

import { requestAll } from "./request";

import {
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
  validParams,
} from "../constants/RequestObjects";

import {
  TeamsResponseObject,
  EventsResponseObject,
  MatchesResponseObject,
  RankingsResponseObject,
  SeasonRankingsResponseObject,
  AwardsResponseObject,
  SkillsResponseObject,
  ResponseObject,
} from "../constants/ResponseObjects";

export async function get(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<TeamsResponseObject[]>;

export async function get(
  endpoint: "events",
  params: EventsRequestObject
): Promise<EventsResponseObject[]>;

export async function get(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<MatchesResponseObject[]>;

export async function get(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<RankingsResponseObject[]>;

export async function get(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<SeasonRankingsResponseObject[]>;

export async function get(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<AwardsResponseObject[]>;

export async function get(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<SkillsResponseObject[]>;

export default async function get(endpoint, params) {
  // Parameters can be of the following types
  // 1. Number
  // 2. String
  // 3. Regex
  // 4. Function
  // 5. Array of Valid Cases
  // So for most cases, we need to figure out what parameters we can pass *directly* to vexdb, and what needs some sort of processing

  const direct = {};

  // Processing functions are standardized as pass the result, get a yes or no back
  const processing: ((
    result: ResponseObject
  ) => boolean | Promise<boolean>)[] = [];

  const valid = (p: string) => validParams[endpoint].includes(p);

  // Sort parameters into compatabile and ones that require us to add post-request filter functions
  for (let key in params) {
    // Passed functions are definitely need to be handled afterwards
    if (params[key] instanceof Function) {
      processing.push((result) => params[key](result[key], result));
    }

    // If the parameter is a regex, create a post function
    else if (
      Object.prototype.toString.call(params[key]) === "[object RegExp]"
    ) {
      processing.push((result) => params[key].test(result[key]));
    }

    // Arrays
    else if (params[key] instanceof Array) {
      processing.push((result) => params[key].includes(result[key]));
    }

    // Now it's just strings and numbers, which are conditional based on whether vexdb accepts them as arguments
    else if (valid(key)) {
      direct[key] = params[key];
    } else {
      processing.push((result) => params[key] === result[key]);
    }
  }

  // This'll reject if the req.status != 1
  const req = await requestAll(endpoint, direct);

  // Creates a super filter function, that tests every filter function for a given result
  const filter = (result) =>
    Promise.all(processing.map((fn) => fn(result))).then((results) =>
      results.every((v) => v)
    );

  // Filter all of the results through the super filter function
  const include = await Promise.all(req.result.map(filter));

  // Return only the values that pass through the super filter
  return req.result.filter((v, i) => include[i]);
}
