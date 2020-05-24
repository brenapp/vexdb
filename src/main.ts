import request from "./methods/request";
import * as cache from "./methods/cache";
import get from "./methods/get";
import size from "./methods/size";
import live from "./methods/live";

import * as req from "./constants/RequestObjects";
import * as res from "./constants/ResponseObjects";
import * as settings from "./constants/settings";
const constant = { ...req, ...res, ...settings };

export { request, cache, get, size, live, constant };
