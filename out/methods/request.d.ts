import "isomorphic-fetch";
import * as cache from "./cache";
import { ResponseObject } from "../constants/ResponseObjects";
export declare function serialize(params: object): string;
export declare function request(endpoint: any, params?: object): Promise<any>;
export declare function requestSize(endpoint: any, params: any): Promise<any>;
export default function requestAll(endpoint: any, params: any): Promise<cache.APIResponse<ResponseObject>>;
