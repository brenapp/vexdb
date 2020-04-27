/**
 * Abstracts over isomorphic fetch to create more useful request utilites
 * Specifically, the requestAll function respects internal cache, and makes
 * enough requests to ensure that all results are returned
 */

import "isomorphic-fetch";
import { Endpoint } from "../constants/RequestObjects";
import { settings } from "../constants/settings";
import * as cache from "./cache";
import { ResponseObject } from "../constants/ResponseObjects";

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

export default async function request(endpoint, params: object = {}) {
  // Check Cache
  const entry = await cache.resolve(endpoint, params);

  if (entry) {
    return entry.result;
  }

  // Fetch Data
  const data = await fetch(
    `${settings.baseURL}/get_${endpoint}?${serialize(params)}`,
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

export async function requestSize(endpoint, params) {
  return request(
    endpoint,
    Object.assign({}, params, { nodata: true })
  ).then((res) => (res ? res.size : 0));
}

export async function requestAll(
  endpoint,
  params
): Promise<{ status: 0 | 1; size: number; result: ResponseObject[] }> {
  return requestSize(endpoint, params)
    .then((size) =>
      Promise.all(
        new Array(Math.ceil(size / 5000))
          .fill(endpoint)
          .map((e, i) =>
            request(endpoint, { ...params, limit_start: i * 5000 })
          )
      )
    )
    .then((result) => ({
      status: result[0] ? result[0].status : 0,
      size: result.reduce((a, b) => a + b.size, 0),
      result: result.reduce((a, b) => a.concat(b.result), []),
    }));
}
