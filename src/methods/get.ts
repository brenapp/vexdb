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
} from "../constants/ResponseObjects";

export function permute<I extends { [key: string]: string[] }>(
  permutations: I
) {
  const permutators = Object.keys(permutations);

  const lengths: number[] = permutators.map((key) => permutations[key].length);
  const sizes = new Array(permutators.length + 1)
    .fill(0)
    .map((a, i) => lengths.slice(i).reduce((a, b) => a * b, 1));

  return (
    new Array(sizes[0])
      .fill({})
      .map((a, i) =>
        // Now we generate a "path" to traverse given our index, which is used as a resource measure
        // Basically, for each level of the sizes array, we pick the furthest size given current "resources"
        // Then we subtract for the next level of sizes.
        // Since sizes contains the exact number of permutators + 1, this will generate an array of paths (array of number)
        sizes
          .slice(1) // Skip the first size, which is a meta size (total number of permutations)
          .map((cost) => {
            // Given our currently available resources, which one can we access? Flooring to ensure we never pass nodes we can't
            let path = Math.floor(i / cost);
            // Lose the number of passed nodes
            i -= cost * path;
            return path;
          })
      )
      // Now that we have generated our path, we need to use it to generate the appropriate object
      // Basically, go through each item in the path, and convert it to its corresponding key and value based on the current index
      .map((path) =>
        path
          .map((t, i) => ({
            [permutators[i]]: permutations[permutators[i]][t],
          }))
          .reduce((a, b) => Object.assign({}, a, b), permutations)
      )
  );
}

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

export default async function get(endpoint, params) {
  const endpoints = Object.keys(validParams);

  if (!endpoints.includes(endpoint)) {
    return Promise.reject(
      new Error(
        `Endpoint "${endpoint}" is not valid. Valid endpoints are ${endpoints.join(
          ", "
        )}`
      )
    );
  }

  /**
   * Now we need to sort parameters into the following categories
   * 1) The set of parameters we can pass directly to vexdb
   * 2) The set of parameters we need to filter for after requests are made
   * 3) The set of parameters which we need to generate extra requests for
   *
   * The ones that can be passed directly to vexdb are the simplest:
   *  - Are in validParams
   *  - Are only strings or numbers
   */

  // Basic parameters (those that can be directly passed)
  let basic = {};

  // Post Request Filters
  let filter = new Map<
    string,
    (t: string | number, value: any) => boolean | Promise<boolean>
  >();

  // Permutation filters
  let permuation = {};

  /**
   * Parameter classification
   */

  for (let [key, value] of Object.entries(params)) {
    // If it's a basic parameter (i.e. a string or a number) add it to the basics
    if (typeof value === "number" || typeof value === "string") {
      basic[key] = value;
      continue;
    }

    // Arrays need extra permutations
    if (value instanceof Array) {
      permuation[key] = value;
      continue;
    }

    // Transform RegExp into functions
    if (value instanceof RegExp) {
      const regex = value;
      value = (res) =>
        (res as number | string).toString().match(regex) !== null;
    }

    // Finally, set all post request filters
    filter.set(key, value as any);
  }

  /**
   * Request Permutation
   */

  const requests = Promise.all(
    permute(permuation).map((r) => requestAll(endpoint, { ...basic, ...r }))
  );

  // Collect responses
  const responses = (await requests).map((r) => r.result).flat();

  /**
   * Post Request Filtering
   */
  const final = [];
  for (const response of responses) {
    const validate = await Promise.all(
      [...filter.entries()].map(([key, validator]) =>
        validator(response[key], response)
      )
    );

    if (validate.every((r) => !!r)) {
      final.push(response);
    }
  }

  return final;
}
