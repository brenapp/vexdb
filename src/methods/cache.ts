/**
 * Caching utilites
 */

import { settings } from "../constants/settings";
import {
  Endpoint,
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
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
import { serialize } from "./request";

import * as keya from "keya";

export interface APIResponse<T> {
  status: 0 | 1;
  size: number;
  result: T[];
}

export interface CacheEntry<T> {
  expires: number;
  value: APIResponse<T>;
}

export async function store(
  endpoint: "teams",
  params: TeamsRequestObject,
  value: APIResponse<TeamsResponseObject[]>
): Promise<CacheEntry<TeamsResponseObject>>;

export async function store(
  endpoint: "events",
  params: EventsRequestObject,
  value: APIResponse<EventsResponseObject[]>
): Promise<CacheEntry<EventsResponseObject>>;

export async function store(
  endpoint: "matches",
  params: MatchesRequestObject,
  value: APIResponse<MatchesResponseObject[]>
): Promise<CacheEntry<MatchesResponseObject>>;

export async function store(
  endpoint: "rankings",
  params: RankingsRequestObject,
  value: APIResponse<RankingsResponseObject[]>
): Promise<CacheEntry<RankingsResponseObject>>;

export async function store(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject,
  value: APIResponse<SeasonRankingsResponseObject[]>
): Promise<CacheEntry<SeasonRankingsResponseObject>>;

export async function store(
  endpoint: "awards",
  params: AwardsRequestObject,
  value: APIResponse<AwardsResponseObject[]>
): Promise<CacheEntry<AwardsResponseObject>>;

export async function store(
  endpoint: "skills",
  params: SkillsRequestObject,
  value: APIResponse<SkillsResponseObject[]>
): Promise<CacheEntry<SkillsResponseObject>>;

export async function store(endpoint, params, value) {
  // Get the cache string and the DB
  const name = `${endpoint}?${serialize(params)}`;
  const store = await keya.store(`vexdb`);

  // Make the cache entry
  const entry = {
    expires: Date.now() + settings.cache.ttl,
    value,
  };

  await store.set(name, entry);
  await store.save();

  return entry;
}

export async function resolve(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<APIResponse<TeamsResponseObject> | undefined>;

export async function resolve(
  endpoint: "events",
  params: EventsRequestObject
): Promise<APIResponse<EventsResponseObject> | undefined>;

export async function resolve(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<APIResponse<MatchesResponseObject> | undefined>;

export async function resolve(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<APIResponse<RankingsResponseObject> | undefined>;

export async function resolve(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<APIResponse<SeasonRankingsResponseObject> | undefined>;

export async function resolve(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<APIResponse<AwardsResponseObject> | undefined>;

export async function resolve(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<APIResponse<SkillsResponseObject> | undefined>;

export async function resolve(endpoint, params) {
  const name = `${endpoint}?${serialize(params)}`;
  const store = await keya.store(`vexdb`);

  const response = await store.get(name);

  if (!response) {
    return undefined;
  }

  if (response.expires > Date.now()) {
    store.delete(name);
    return undefined;
  } else {
    return response.value;
  }
}
