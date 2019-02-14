import { schemaComposer } from "graphql-compose";

import CRMQueries from "./sources/crm";

schemaComposer.Query.addFields({
  ...CRMQueries
});
const schema = schemaComposer.buildSchema();

export default schema;
