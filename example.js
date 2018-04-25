var vexdb = require("./main");

vexdb.get("teams", {
    region: ["South Carolina"],
    city: "Greenville",
    grade: "High School",
    number: /^[0-9]{4}B$/
})
    .then(console.log)
    .catch(console.error)

vexdb.get("events", {
    date: new Date().toISOString()
})
    .then(console.log)
    .catch(console.error)


vexdb.size("events", { season: "Nothing But Net" })
    .then(console.log)