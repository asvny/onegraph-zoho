import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const tagResponse = {
  created_by: {
    id: "2000000030444",
    name: "Construction Industry"
  },
  created_time: "2017-03-24T11:08:23+05:30",
  id: "2000000039007",
  modified_by: {
    id: "2000000030444",
    name: "Chems"
  },
  modified_time: "2017-03-24T11:08:23+05:30",
  name: "Chemical Industry"
};

export type TagResponseType = typeof tagResponse;
export const TagTC = composeWithJson("Tag", tagResponse);
export const TagGraphQLType = TagTC.getType();
export const TagQueryFields = {
  tags: {
    type: [TagTC],
    args: {
      module: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/settings/tags?module=${args.module}`);
        return response.data.tags;
      } catch (err) {
        return err.response;
      }
    }
  }
};
