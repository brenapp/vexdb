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

export default async function get(
  endpoint: string,
  params: { [key: string]: string | number }
) {
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

  // We can go ahead and pass everything to vexdb, it will ignore things it doesn't understand
  const response = await requestAll(endpoint, params);

  if (!response.status) {
    return Promise.reject(response);
  }

  // Now we can go through all the other parameters and filter out everything that vexdb can't handle
  let results = response.result;

  for (const param of Object.keys(params)) {
    const passable: boolean = passableParams[endpoint].includes(param);

    results = results.filter((r) => r[param] === params[param]);
  }

  return results;
}
