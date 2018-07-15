/**
 * Contains more advanced filtering logic to allow for lots of versatillity
 */

import {
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
  Endpoint,
  RequestObject,
  validParams
} from "../constants/RequestObjects";

import {
  TeamsResponseObject,
  EventsResponseObject,
  MatchesResponseObject,
  RankingsResponseObject,
  SeasonRankingsResponseObject,
  AwardsResponseObject,
  SkillsResponseObject,
  ResponseObject
} from "../constants/ResponseObjects";

import { endpoints } from "../constants/RequestObjects";
import { settings } from "../constants/settings";
import permutations from "../util/permutations";
import { filter, asyncArrayFilter } from "../util/object";
import request, { requestAll, requestSize } from "./request";
import applyFilter from "../util/filter";

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
export async function get(endpoint, params = {}) {
  // Even though we're typescript, users of the module will not be, we should manually check endpoints
  if (!endpoints.includes(endpoint))
    return Promise.reject(
      new RangeError(
        `Endpoint ${endpoint} not known. Valid endpoints are ${endpoints.join(
          ", "
        )}`
      )
    );

  // Assign defaults
  params = Object.assign({}, settings.params, params);

  // There are 3 types of parameters that can be passed to .get():
  // Those which can be directly passed to VexDB,
  // Those which require us to make extra requests,
  // Those which require us to make a broad request, and filter on the client side

  // First, we'll make all the requests we need, by
  // generating all possible permutations of passed
  // arrays. See util/permutations.ts for more information
  let res: ResponseObject[] = (await Promise.all(
    permutations(endpoint, params).map(param =>
      requestAll(endpoint, param).then(res => res.result)
    )
  )).reduce((a, b) => a.concat(b), []); // Flatten list of responses into one

  // Next, Uniquify the results
  // Create keys to compare for uniques
  let keys = res.map(item => JSON.stringify(item));
  res = res.filter((v, i, a) => keys.indexOf(keys[i]) === i);

  // Finally, do post request client-side filtering
  // First, let's get all of the parameters that require client-side filtering
  let clientside = filter(
    params,
    (value, key) => !validParams[endpoint].includes(key)
  );
  let filterKeys = Object.keys(clientside);

  return asyncArrayFilter<ResponseObject>(res, async item =>
    (await Promise.all(
      filterKeys.map(key => applyFilter(item, key, clientside[key]))
    )).every(a => !!a)
  );
}

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
export async function size(endpoint, params = {}) {
  // If there's client-side filtering, then we actually have to make each request, else, we can just stick nodata on everything
  const filtering = Object.keys(params).some(
    key => !validParams[endpoint].includes(key)
  );

  if (filtering) {
    // TypeScript sometimes has troubles with string unions
    return get(endpoint as any, params).then(res => res.length);
  } else {
    return (await Promise.all(
      permutations(endpoint, params).map(param =>
        requestSize(endpoint, Object.assign({}, settings.params, param))
      )
      // Sum each request
    )).reduce((a, b) => a + b);
  }
}
