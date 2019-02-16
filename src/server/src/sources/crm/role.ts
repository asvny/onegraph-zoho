import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "../../fetcher";

const roleResponse = {
  display_label: "CEO",
  name: "CEO",
  id: "2883756000000026005",
  reporting_to: null,
  admin_user: true
};

export type RoleResponseType = typeof roleResponse;
export const RoleTC = composeWithJson("Role", roleResponse);
export const RoleGraphQLType = RoleTC.getType();
export const RoleQueryFields = {
  role: {
    type: RoleTC,
    args: {
      id: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/roles/${args.id}`);
        return response.data.roles.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  roles: {
    type: [RoleTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/roles`);
        return response.data.roles;
      } catch (err) {
        return err.response;
      }
    }
  }
};
