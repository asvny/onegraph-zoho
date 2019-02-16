import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "../../fetcher";

const attachmentResponse = {
  id: "1000000030750",
  Modified_By: "1000000028468",
  Owner: "1000000028468",
  Parent_Id: "1000000231009",
  Created_Time: "2016-03-30 20:29:35",
  Modified_Time: "2016-03-30 20:29:35",
  Created_By: "1000000028468",
  File_Name: "External-Api-Automation.html",
  Size: "985160",

  Owner_Name: () => ({
    type: "String",
    resolve: (source: any) => source.$Owner
  }),
  Modified_By_Name: () => ({
    type: "String",
    resolve: (source: any) => source.$Modified_By
  }),
  Created_By_Name: () => ({
    type: "String",
    resolve: (source: any) => source.$Created_By
  })
};

export type AttachmentResponseType = typeof attachmentResponse;
export const AttachmentTC = composeWithJson("Attachment", attachmentResponse);
export const AttachmentGraphQLType = AttachmentTC.getType();
export const AttachmentQueryFields = {
  attachments: {
    type: [AttachmentTC],
    args: {
      module: `String!`,
      id: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/${args.module}/${args.id}/Attachments`);
        return response.data.data;
      } catch (err) {
        return err.response;
      }
    }
  }
};
