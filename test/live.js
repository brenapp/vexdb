import test from "ava";
import { live } from '../main';
import EventEmitter from "events";

test(".live() returns an EventEmitter", t => {
    var emitter = live("matches", { season: "In The Zone" });
    emitter.emit("stop");
    if(emitter instanceof EventEmitter) {
        t.pass();
    } else {
        t.fail();
    }
});

test(".live() emits item enough times", t => {
    var emitter = live("matches", { season: "StarStruck" });
    var i = 0;
    emitter.on("item", () => i++ === 60467 && t.pass());
});