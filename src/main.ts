// Methods
export * from "./methods/get";
export * from "./methods/cache";
export * from "./methods/live";

// Constants
import * as ReqConstants from "./constants/RequestObjects";
import * as ResConstants from "./constants/ResponseObjects";
import * as Constants from "./constants/settings";
const constant = { ...ReqConstants, ...ResConstants, ...Constants };

export { constant };
