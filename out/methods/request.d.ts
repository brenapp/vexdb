import "isomorphic-fetch";
import * as cache from "./cache";
import { ResponseObject } from "../constants/ResponseObjects";
import PQueue from "p-queue";
export declare const queue: PQueue<import("p-queue/dist/priority-queue").default, import("p-queue/dist").DefaultAddOptions>;
export declare function serialize(params: object): string;
export declare function request<T extends ResponseObject = ResponseObject>(endpoint: any, params?: object): Promise<cache.APIResponse<T>>;
export declare function requestSize<T extends ResponseObject = ResponseObject>(endpoint: any, params: any): Promise<number>;
export default function requestAll<T extends ResponseObject = ResponseObject>(endpoint: any, params: any): Promise<cache.APIResponse<T>>;
