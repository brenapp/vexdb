/**
 * Typesafe, Cache Respecting, Filterable GET function
 *
 */

import requestAll from "./request";

import {
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
  passableParams,
} from "../constants/RequestObjects";

import {
  TeamsResponseObject,
  EventsResponseObject,
  MatchesResponseObject,
  RankingsResponseObject,
  SeasonRankingsResponseObject,
  AwardsResponseObject,
  SkillsResponseObject,
} from "../constants/ResponseObjects";

export default async function get(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<TeamsResponseObject[]>;

export default async function get(
  endpoint: "events",
  params: EventsRequestObject
): Promise<EventsResponseObject[]>;

export default async function get(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<MatchesResponseObject[]>;

export default async function get(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<RankingsResponseObject[]>;

export default async function get(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<SeasonRankingsResponseObject[]>;

export default async function get(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<AwardsResponseObject[]>;

export default async function get(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<SkillsResponseObject[]>;

export default async function get(endpoint: string, params: object) {
  const endpoints = Object.keys(passableParams);

  if (!endpoints.includes(endpoint)) {
    return Promise.reject(
      new Error(
        `Endpoint "${endpoint}" is not valid. Valid endpoints are ${endpoints.join(
          ", "
        )}`
      )
    );
  }

  // Get the params we can pass to vexbot (on the list of passable params and not functions)
  const passable: string[] = passableParams[endpoint];

  let raw = {};
  let filter: [
    string,
    (k: any, full: object) => boolean | Promise<boolean>
  ][] = [];

  for (const [key, value] of Object.entries(params)) {
    if (passable.includes(key) && typeof value !== "function") {
      raw[key] = value;
    } else {
      filter.push([key, value]);
    }
  }

  // We can go ahead and pass everything to vexdb, it will ignore things it doesn't understand
  const response = await requestAll(endpoint, raw);

  if (!response.status) {
    return Promise.reject(response);
  }

  const final = [];

  for (const result of response.result) {
    const accept = await Promise.all(
      filter.map(([key, fn]) => fn(result[key], result))
    );

    if (accept.every((r) => r)) {
      final.push(result);
    }
  }

  return final;
}
