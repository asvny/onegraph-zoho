import { schemaComposer } from "graphql-compose";

import { UserQueryFields } from "./user";
import { OrganizationQueryFields } from "./organization";

const CRMType = schemaComposer.createObjectTC({ name: "CRMQuery" });

CRMType.addFields({
  ...UserQueryFields,
  ...OrganizationQueryFields
});

export default {
  crm: {
    type: CRMType,
    resolve: () => ({})
  }
};
