/**
 * Abstracts over isomorphic fetch to create more useful request utilites
 * Specifically, the requestAll function respects internal cache, and makes
 * enough requests to ensure that all results are returned
 */

import "isomorphic-fetch";
import { settings } from "../constants/settings";
import * as cache from "./cache";
import { ResponseObject } from "../constants/ResponseObjects";

// Request queuing (only allow so many concurrent requests at once)
import PQueue from "p-queue";

// Right now, this won't update with settings, but p-queue supports changing concurrency
// @TODO add setter in the settings to update this
export const queue = new PQueue({
  concurrency: settings.maxConcurrentRequests,
});

/**
 * Converts a parameters object into URL Encoded String
 */
export function serialize(params: object) {
  let str = "";

  for (let key in params) {
    if (str != "") {
      str += "&";
    }

    str += key + "=" + encodeURIComponent(params[key]);
  }

  return str;
}

async function doRequest(
  endpoint,
  params: object = {}
): Promise<cache.APIResponse<any>> {

  // Check Cache
  const entry = await cache.resolve(endpoint, params);

  if (entry !== null) {
    return entry;
  }

  // Fetch Data
  const data = await fetch(
    `${settings.baseURL}/get_${endpoint}?${serialize({
      ...settings.params,
      ...params,
    })}`,
    {
      headers: settings.headers,
    }
  ).then((data) => data.json());

  if (data.status) {
    await cache.store(endpoint, params, data);

    return data;
  } else {
    return Promise.reject(Promise.reject(new Error(data.error_text)));
  }
}

export async function request<T extends ResponseObject = ResponseObject>(
  endpoint,
  params: object = {}
): Promise<cache.APIResponse<T>> {
  return queue.add<cache.APIResponse<T>>(() => doRequest(endpoint, params));
}

export async function requestSize<T extends ResponseObject = ResponseObject>(
  endpoint,
  params
) {
  return request<T>(
    endpoint,
    Object.assign({}, params, { nodata: true })
  ).then((res) => (res.status ? res.size : 0));
}

export default async function requestAll<
  T extends ResponseObject = ResponseObject
>(endpoint, params): Promise<cache.APIResponse<T>> {
  return (
    requestSize<T>(endpoint, params)
      .then((size) =>
        Promise.all(
          new Array(Math.ceil(size / 5000))
            .fill(endpoint)
            .map((e, i) =>
              request<T>(endpoint, { ...params, limit_start: i * 5000 })
            )
        )
      )

      // Only consider the successfully results
      .then((results) => results.filter((r) => r.status === 1))
      .then((results: cache.APISuccess<T>[]) => ({
        status: 1,
        size: results.reduce((a, b) => a + b.size, 0),
        result: results.map((r) => r.result).flat(),
      }))
  );
}
