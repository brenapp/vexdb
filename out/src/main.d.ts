export * from "./methods/get";
export * from "./methods/cache";
export * from "./methods/live";
import * as ReqConstants from "./constants/RequestObjects";
import * as Constants from "./constants/settings";
declare const constant: {
    header(headers: {
        [header: string]: string;
    }): void;
    param(params: ReqConstants.RequestObject): void;
    isBrowser: Function;
    settings: Constants.settings;
    endpoints: ReqConstants.Endpoint[];
    validParams: {
        events: string[];
        teams: string[];
        matches: string[];
        rankings: string[];
        season_rankings: string[];
        awards: string[];
        skills: string[];
    };
};
export { constant };
