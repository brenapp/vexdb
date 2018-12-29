import { Endpoint, RequestObject } from "../constants/RequestObjects";
export default function permutations(endpoint: Endpoint, params: RequestObject): {
    [x: string]: any;
}[];
