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
const { version } = require("../../package.json");

export interface CacheEntry<T> {
  expires: number;
  value: T[];
}

export async function store(
  endpoint: "teams",
  params: TeamsRequestObject,
  value: TeamsResponseObject[]
): Promise<CacheEntry<TeamsResponseObject>>;

export async function store(
  endpoint: "events",
  params: EventsRequestObject,
  value: EventsResponseObject[]
): Promise<CacheEntry<EventsResponseObject>>;

export async function store(
  endpoint: "matches",
  params: MatchesRequestObject,
  value: MatchesResponseObject[]
): Promise<CacheEntry<MatchesResponseObject>>;

export async function store(
  endpoint: "rankings",
  params: RankingsRequestObject,
  value: RankingsResponseObject[]
): Promise<CacheEntry<RankingsResponseObject>>;

export async function store(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject,
  value: SeasonRankingsResponseObject[]
): Promise<CacheEntry<SeasonRankingsResponseObject>>;

export async function store(
  endpoint: "awards",
  params: AwardsRequestObject,
  value: AwardsResponseObject[]
): Promise<CacheEntry<AwardsResponseObject>>;

export async function store(
  endpoint: "skills",
  params: SkillsRequestObject,
  value: SkillsResponseObject[]
): Promise<CacheEntry<SkillsResponseObject>>;

export async function store(endpoint, params, value) {
  // Get the cache string and the DB
  const name = `${endpoint}?${serialize(params)}`;
  const store = await keya.store(`vexdb-${version}`);

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
): Promise<TeamsResponseObject | undefined>;

export async function resolve(
  endpoint: "events",
  params: EventsRequestObject
): Promise<EventsResponseObject | undefined>;

export async function resolve(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<MatchesResponseObject | undefined>;

export async function resolve(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<RankingsResponseObject | undefined>;

export async function resolve(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<SeasonRankingsResponseObject | undefined>;

export async function resolve(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<AwardsResponseObject | undefined>;

export async function resolve(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<SkillsResponseObject | undefined>;

export async function resolve(endpoint, params) {
  const name = `${endpoint}?${serialize(params)}`;
  const store = await keya.store(`vexdb-${version}`);

  return store.get(name);
}
