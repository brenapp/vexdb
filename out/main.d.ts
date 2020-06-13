import request from "./methods/request";
import * as cache from "./methods/cache";
import get from "./methods/get";
import size from "./methods/size";
import live from "./methods/live";
import * as req from "./constants/RequestObjects";
import * as settings from "./constants/settings";
declare const constant: {
    header(headers: {
        [header: string]: string;
    }): void;
    param(params: req.RequestObject): void;
    isBrowser: Function;
    settings: settings.settings;
    SkillsType: typeof req.SkillsType;
    endpoints: req.Endpoint[];
    passableParams: {
        events: string[];
        teams: string[];
        matches: string[];
        rankings: string[];
        season_rankings: string[];
        awards: string[];
        skills: string[];
    };
};
export { request, cache, get, size, live, constant };
