/**
 * Basic Live Support!
 * Turn any request into a .live() which returns a custom event emitter firing on new items
 */

import { EventEmitter } from "events";
import {
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
  Endpoint,
  RequestObject
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
import { get } from "./get";
import { settings } from "../constants/settings";

export interface LiveEventEmitter<Q, R> extends EventEmitter {
  close(): void;
  params(updateParameters: Q): Q;
  current(): R[];
  fetch(): Promise<boolean>;

  // Update Events
  on(event: "item", callback: (item: R) => void): this;
  on(event: "fetch", callback: (newItems: R[]) => void): this;
  on(event: "prefetch", callback: (results: R[]) => void): this;
}

export type LiveRequestObject<T> = T & { prefetch?: boolean };

export function live(
  endpoint: "teams",
  params: LiveRequestObject<TeamsRequestObject>
): LiveEventEmitter<TeamsRequestObject, TeamsResponseObject>;

export function live(
  endpoint: "events",
  params: LiveRequestObject<EventsRequestObject>
): LiveEventEmitter<EventsRequestObject, EventsResponseObject>;

export function live(
  endpoint: "matches",
  params: LiveRequestObject<MatchesRequestObject>
): LiveEventEmitter<MatchesRequestObject, MatchesResponseObject>;

export function live(
  endpoint: "rankings",
  params: LiveRequestObject<RankingsRequestObject>
): LiveEventEmitter<RankingsRequestObject, RankingsResponseObject>;

export function live(
  endpoint: "season_rankings",
  params: LiveRequestObject<SeasonRankingsRequestObject>
): LiveEventEmitter<SeasonRankingsRequestObject, SeasonRankingsResponseObject>;

export function live(
  endpoint: "awards",
  params: LiveRequestObject<AwardsRequestObject>
): LiveEventEmitter<AwardsRequestObject, AwardsResponseObject>;

export function live(
  endpoint: "skills",
  params: LiveRequestObject<SkillsRequestObject>
): LiveEventEmitter<SkillsRequestObject, SkillsResponseObject>;

export function live(
  endpoint: string,
  params: LiveRequestObject<RequestObject>
): LiveEventEmitter<RequestObject, ResponseObject>;

export function live(endpoint, params) {
  let results = [],
    keys = [],
    emitter = new EventEmitter();

  async function fetch() {
    let incoming = await get(endpoint, params),
      newItems = incoming.filter(
        (e, i) => keys.indexOf(JSON.stringify(e)) === -1
      );

    newItems.forEach(item => emitter.emit("item", item));
    results = incoming;
    keys = incoming.map(a => JSON.stringify(a));
    emitter.emit("fetch", newItems);
    return true;
  }

  let poll = setInterval(fetch, settings.live.pollTime);

  setTimeout(async () => {
    if (!params.prefetch) return;

    (results = await get(endpoint, params)),
      (keys = results.map(a => JSON.stringify(a)));
    emitter.emit("prefetch", results);
  }, 0);

  // Custom Events
  emitter.on("close", () => clearInterval(poll));

  // Custom API functions, to make things easier
  return Object.assign(emitter, {
    close() {
      emitter.emit("close");
    },
    params(p) {
      return (params = Object.assign(params, p));
    },
    current() {
      return results;
    },
    fetch
  });
}
