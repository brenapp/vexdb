import { EventEmitter } from "events";

type Endpoint =
  | "events"
  | "teams"
  | "matches"
  | "rankings"
  | "season_rankings"
  | "awards"
  | "skills";

interface CacheEntry {
  expiry: number;
  value: {
    status: 0 | 1;
    size: number;
    result: object[];
  };
}
export function cache(
  endpoint: Endpoint,
  params: object,
  value: object
): CacheEntry;

export function get(endpoint: Endpoint, params: object): Promise<object[]>;

interface LiveEventEmitter extends EventEmitter {
  close(): void;
  params(updateParameters: object): object;
  current(): object[];
}
export function live(endpoint: Endpoint, params: object): LiveEventEmitter;

export function size(endpoint: Endpoint, params: object): Promise<number>;

export namespace cache {
  const ttl: number;

  function clear(): void;

  function has(endpoint: Endpoint, params: object): Promise<boolean>;

  function resolve(endpoint: Endpoint, params: object): Promise<object>;

  function sanitize(endpoint: Endpoint, params: object): object;

  function serialize(url: any, params: object): object;

  function setTTL(ttl: number): object;
}

export namespace constant {
  const endpoints: string[];

  const settings: {
    baseURL: string;
    cache: {
      ttl: number;
    };
    headers: {
      "User-Agent": string;
    };
    live: {
      pollTime: number;
    };
    params: {};
  };

  const uniques: {
    events: string;
    teams: string;
  };

  const validParams: {
    awards: string[];
    events: string[];
    matches: string[];
    rankings: string[];
    season_rankings: string[];
    skills: string[];
    teams: string[];
  };

  function header(headers: object): void;

  function isBrowser(): boolean;

  function param(params: object): void;
}
