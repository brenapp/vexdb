var EventEmitter = require("events"),
    { get } = require("./request"),
    { settings } = require("./configure").globalOptions,
    equal = require("deep-equal");


var lastBatch = [];
function removeDuplicates(listing) {
    var unique = listing.filter(a => lastBatch.every( b => !equal(a, b) ));
    lastBatch = listing;
    return unique;
}

/**
 * Performs a series of requests which 
 * @param {String<URL>} endpoint The endpoint to watch
 * @param {Object} params Params to apply to the requests
 * @return EventEmitter
 */
function live(endpoint, params) {
    var emitter = new EventEmitter();
    
    var id = setInterval(function() {
        get(endpoint, params)
            .then(removeDuplicates)
            .then( list => list.forEach(function(item) {
                emitter.emit("item", item);
            }, this))
    }, settings.live.pollTime);

    emitter.on("stop", emitter.stop = function() {
        clearInterval(id);
    })

    return emitter;
}

module.exports = live;