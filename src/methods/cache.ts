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
  RequestObject,
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
import SQLiteStore from "keya/out/node/sqlite";

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
  data: APIResponse<TeamsResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "events",
  params: EventsRequestObject,
  data: APIResponse<EventsResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "matches",
  params: MatchesRequestObject,
  data: APIResponse<MatchesResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "rankings",
  params: RankingsRequestObject,
  data: APIResponse<RankingsResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject,
  data: APIResponse<SeasonRankingsResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "skills",
  params: SkillsRequestObject,
  data: APIResponse<SkillsResponseObject>
): Promise<boolean>;

export async function store(
  endpoint: "awards",
  params: AwardsRequestObject,
  data: APIResponse<AwardsResponseObject>
): Promise<boolean>;

export async function store(endpoint, params, value) {
  const store = await keya.store<CacheEntry<ResponseObject>>(
    `vexdb${endpoint}`
  );

  const key = encodeURIComponent(JSON.stringify(params));
  const expires = Date.now() + settings.cache.ttl;

  return store.set(key, { expires, value });
}

export async function resolve(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<APIResponse<TeamsRequestObject>>;

export async function resolve(
  endpoint: "events",
  params: EventsRequestObject
): Promise<APIResponse<EventsRequestObject>>;

export async function resolve(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<APIResponse<MatchesRequestObject>>;

export async function resolve(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<APIResponse<RankingsRequestObject>>;

export async function resolve(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<APIResponse<SeasonRankingsRequestObject>>;

export async function resolve(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<APIResponse<SkillsRequestObject>>;

export async function resolve(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<APIResponse<AwardsRequestObject>>;

export async function resolve(endpoint, params) {
  const store = await keya.store<CacheEntry<any>>(`vexdb${endpoint}`);

  const key = encodeURIComponent(JSON.stringify(params));
  const has = await store.has(key);

  if (!has) {
    return null;
  }

  const record = await store.get(key);

  if (record.expires < Date.now()) {
    store.delete(key);
    return null;
  }

  return record.value;
}
