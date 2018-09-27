/**
 * Performs a basic request to the VexDB API
 */

import "isomorphic-fetch";
import { Endpoint } from "../constants/RequestObjects";
import settings from "../constants/settings";
import { cache } from "./cache";

export default async function request(endpoint, params: object = {}) {
  // Check Cache
  if (await cache.has(endpoint, params)) return cache.resolve(endpoint, params);

  // Fetch Data
  const data = await fetch(
    `${settings.baseURL}/get_${cache.sanitize(endpoint, params)}`,
    {
      headers: settings.headers
    }
  ).then(data => data.json());

  if (data.status) {
    cache(endpoint, params, data);
    return data;
  } else {
    return Promise.reject(Promise.reject(new Error(data.error_text)));
  }
}

export async function requestSize(endpoint, params) {
  return request(endpoint, Object.assign({}, params, { nodata: true })).then(
    res => res.size
  );
}

export async function requestAll(endpoint, params) {
  return requestSize(endpoint, params)
    .then(size =>
      Promise.all(
        new Array(Math.ceil(size / 5000))
          .fill(endpoint)
          .map((e, i) =>
            request(endpoint, { ...params, limit_start: i * 5000 })
          )
      )
    )
    .then(result => ({
      status: result[0] ? result[0].status : 0,
      size: result.reduce((a, b) => a + b.size, 0),
      result: result.reduce((a, b) => a.concat(b.result), [])
    }));
}
