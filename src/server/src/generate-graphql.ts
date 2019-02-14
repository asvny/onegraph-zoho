import fs from "fs";
import { promisify } from "util";
import { printSchema } from "graphql";

import schema from "./schema";

const writeFileAsync = promisify(fs.writeFile);

async function main() {
  let schemaString = printSchema(schema);
  try {
    await writeFileAsync("./onegraphql-zoho.graphql", schemaString);
  } catch (err) {
    return err;
  }
}

main().catch(err => console.log(err));
