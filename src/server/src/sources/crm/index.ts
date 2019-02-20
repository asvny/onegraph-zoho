import { schemaComposer } from "graphql-compose";

import { UserQueryFields } from "./user";
import { OrganizationQueryFields } from "./organization";
import { NoteQueryFields } from "./note";
import { AttachmentQueryFields } from "./attachment";
import { BlueprintQueryFields } from "./blueprint";
import { ProfileQueryFields } from "./profile";
import { RoleQueryFields } from "./role";
import { TagQueryFields } from "./tag";
import { TerritoryQueryFields } from "./territory";
import { RecordQueryFields } from "./record";

const CRMType = schemaComposer.createObjectTC({ name: "CRMQuery" });

CRMType.addFields({
  ...UserQueryFields,
  ...OrganizationQueryFields,
  ...NoteQueryFields,
  ...AttachmentQueryFields,
  ...BlueprintQueryFields,
  ...ProfileQueryFields,
  ...RoleQueryFields,
  ...TagQueryFields,
  ...TerritoryQueryFields,
  ...RecordQueryFields
});

export default {
  crm: {
    type: CRMType,
    resolve: () => ({})
  }
};
