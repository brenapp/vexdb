import { RequestObject } from "./RequestObjects";
export declare const isBrowser: Function;
interface settings {
    cache: {
        ttl: number;
    };
    maxConcurrentRequests: number;
    headers: {
        [header: string]: string;
    };
    params: RequestObject;
    baseURL: string;
    live: {
        pollTime: number;
    };
}
declare let settings: settings;
export { settings };
export declare function header(headers: {
    [header: string]: string;
}): void;
export declare function param(params: RequestObject): void;
