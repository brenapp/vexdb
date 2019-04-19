import { isBrowser, settings } from "../constants/settings";
import {
  validParams,
  Endpoint,
  RequestObject,
  TeamsRequestObject,
  SkillsRequestObject,
  SeasonRankingsRequestObject,
  RankingsRequestObject,
  MatchesRequestObject,
  EventsRequestObject,
  AwardsRequestObject
} from "../constants/RequestObjects";
import * as keya from "keya";
import {
  ResponseObject,
  TeamsResponseObject,
  SkillsResponseObject,
  AwardsResponseObject,
  SeasonRankingsResponseObject,
  RankingsResponseObject,
  MatchesResponseObject,
  EventsResponseObject
} from "../constants/ResponseObjects";

/**
 * Serializes a URL
 * @param url
 * @param params
 */
function serialize(url, params) {
  let str = "";
  for (var p in params) {
    if (params.hasOwnProperty(p)) {
      if (str !== "") str += "&";
      str += `${p}=${encodeURIComponent(params[p])}`;
    }
  }

  return `${url}?${str}`;
}

/**
 * Turns endpoint and params into an appropriate Cache URL
 * @param endpoint
 * @param params
 */
function sanitize(endpoint, params) {
  return serialize(
    endpoint,
    Object.keys(params)
      .filter(key =>
        validParams[endpoint].includes(key) &&
        ["string", "number", "boolean"].includes(typeof params[key]) &&
        key == "limit_start"
          ? params[key] != 0
          : true
      ) // Prevents non-existant key causing duplication
      .sort() // Prevents order causing duplication
      .reduce((obj, key) => ((obj[key] = params[key]), obj), {})
  );
}

export interface CacheEntry<T> {
  expiry: number;
  value: {
    status: 0 | 1;
    size: number;
    result: T[];
  };
}

export function cache(
  endpoint: "teams",
  params: TeamsRequestObject,
  value: TeamsResponseObject[]
): Promise<CacheEntry<TeamsResponseObject>>;

export function cache(
  endpoint: "events",
  params: EventsRequestObject,
  value: EventsResponseObject[]
): Promise<CacheEntry<EventsResponseObject>>;

export function cache(
  endpoint: "matches",
  params: MatchesRequestObject,
  value: MatchesResponseObject[]
): Promise<CacheEntry<MatchesResponseObject>>;

export function cache(
  endpoint: "rankings",
  params: RankingsRequestObject,
  value: RankingsResponseObject[]
): Promise<CacheEntry<RankingsResponseObject>>;

export function cache(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject,
  value: SeasonRankingsResponseObject[]
): Promise<CacheEntry<SeasonRankingsResponseObject>>;

export function cache(
  endpoint: "awards",
  params: AwardsRequestObject,
  value: AwardsResponseObject[]
): Promise<CacheEntry<AwardsResponseObject>>;

export function cache(
  endpoint: "skills",
  params: SkillsRequestObject,
  value: SkillsResponseObject[]
): Promise<CacheEntry<SkillsResponseObject>>;

export async function cache(endpoint, params, value) {
  const file = sanitize(endpoint, params);
  const store = await keya.store("vexdb");
  const entry = { expiry: Date.now() + settings.cache.ttl, value };

  await store.set(file, entry);

  return entry;
}

export namespace cache {
  /**
   * RESOLVE
   */
  export async function resolve(
    endpoint: "teams",
    params: TeamsRequestObject
  ): Promise<CacheEntry<TeamsResponseObject>>;
  export async function resolve(
    endpoint: "events",
    params: EventsRequestObject
  ): Promise<CacheEntry<EventsResponseObject>>;

  export async function resolve(
    endpoint: "matches",
    params: MatchesRequestObject
  ): Promise<CacheEntry<MatchesResponseObject>>;

  export async function resolve(
    endpoint: "rankings",
    params: RankingsRequestObject
  ): Promise<CacheEntry<RankingsResponseObject>>;

  export async function resolve(
    endpoint: "season_rankings",
    params: SeasonRankingsRequestObject
  ): Promise<CacheEntry<SeasonRankingsResponseObject>>;

  export async function resolve(
    endpoint: "awards",
    params: AwardsRequestObject
  ): Promise<CacheEntry<AwardsResponseObject>>;

  export async function resolve(
    endpoint: "skills",
    params: SkillsRequestObject
  ): Promise<CacheEntry<SkillsResponseObject>>;

  export async function resolve(endpoint, params) {
    const file = sanitize(endpoint, params);
    const store = await keya.store("vexdb");

    if (store.get(file)) {
      const record = await store.get(file);
      if (record.expiry > Date.now()) {
        return record.value;
      } else {
        return store.delete(file).then(() => undefined);
      }
    } else {
      return undefined;
    }
  }

  /**
   * HAS
   */
  export async function has(
    endpoint: "teams",
    params: TeamsRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "events",
    params: EventsRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "matches",
    params: MatchesRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "rankings",
    params: RankingsRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "season_rankings",
    params: SeasonRankingsRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "awards",
    params: AwardsRequestObject
  ): Promise<boolean>;

  export async function has(
    endpoint: "skills",
    params: SkillsRequestObject
  ): Promise<boolean>;
  export async function has(endpoint, params) {
    return (await resolve(endpoint, params)) !== undefined;
  }

  export async function clear() {
    const store = await keya.store("vexdb");
    return store.clear();
  }

  /**
   * Serializes a URL
   * @param url
   * @param params
   */
  export function serialize(url, params) {
    let str = "";
    for (var p in params) {
      if (params.hasOwnProperty(p)) {
        if (str !== "") str += "&";
        str += `${p}=${encodeURIComponent(params[p])}`;
      }
    }

    return `${url}?${str}`;
  }

  /**
   * Turns endpoint and params into an appropriate Cache URL
   * @param endpoint
   * @param params
   */
  export function sanitize(endpoint, params) {
    return serialize(
      endpoint,
      Object.keys(params)
        .filter(key =>
          validParams[endpoint].includes(key) &&
          ["string", "number", "boolean"].includes(typeof params[key]) &&
          key == "limit_start"
            ? params[key] != 0
            : true
        ) // Prevents non-existant key causing duplication
        .sort() // Prevents order causing duplication
        .reduce((obj, key) => ((obj[key] = params[key]), obj), {})
    );
  }
}
