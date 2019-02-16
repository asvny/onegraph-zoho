import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "../../fetcher";

const profileResponse = {
  name: "Administrator",
  modified_by: null,
  description:
    "Users with Administrator profile will be able to view and manage all the data within the organization account by default.",
  id: "2883756000000026011",
  category: false
};

export type ProfileResponseType = typeof profileResponse;
export const ProfileTC = composeWithJson("Profile", profileResponse);
export const ProfileGraphQLType = ProfileTC.getType();
export const ProfileQueryFields = {
  profile: {
    type: ProfileTC,
    args: {
      id: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/profiles/${args.id}`);
        console.log(response);
        return response.data.profiles.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  profiles: {
    type: [ProfileTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/profiles`);
        return response.data.profiles;
      } catch (err) {
        return err.response;
      }
    }
  }
};
