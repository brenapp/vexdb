import { RequestObject } from "./RequestObjects";

export const isBrowser = new Function(
  "try { return this === window; } catch(e) { return false }"
);

interface settings {
  cache: {
    ttl: number;
  };
  headers: { [header: string]: string };
  params: RequestObject;
  baseURL: string;
  live: {
    pollTime: number;
  };
}

let settings: settings = {
  cache: {
    ttl: 4 * 60 * 1000
  },
  headers: {
    "User-Agent": "vexdb (nodejs)"
  },
  params: {},
  baseURL: "https://api.vexdb.io/v1/",
  live: {
    pollTime: 10 * 1000
  }
};

export { settings };
export default settings;

// CORS policy forbids setting headers on foreign requests, and will cause the library to fail
if (isBrowser()) delete settings.headers["User-Agent"];

/**
 * Convience methods to change defaults
 */

export function header(headers: { [header: string]: string }) {
  if (isBrowser())
    console.warn(
      "Setting headers will prevent requests from made, due to the same origin policy. It is not reccomended"
    );
  Object.assign(settings.headers, headers);
}

export function param(params: RequestObject) {
  Object.assign(settings.params, params);
}
