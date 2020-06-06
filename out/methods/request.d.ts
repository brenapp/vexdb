import "isomorphic-fetch";
import { ResponseObject } from "../constants/ResponseObjects";
export declare function serialize(params: object): string;
export declare function request(endpoint: any, params?: object): Promise<any>;
export declare function requestSize(endpoint: any, params: any): Promise<any>;
export default function requestAll(endpoint: any, params: any): Promise<{
    status: 0 | 1;
    size: number;
    result: ResponseObject[];
}>;
