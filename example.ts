import * as vexdb from "./src/main";

async function main() {
  let teams = await vexdb.get("teams", {
    number: /^[0-9]{4}B/
  });

  console.log(teams);
}

main();
