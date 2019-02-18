import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const portalResponse = {
  trial_enabled: false,
  gmt_time_zone: "(GMT 0:0) Irish Summer Time",
  project_count: {
    active: 2
  },
  role: "admin",
  avail_user_count: 0,
  is_crm_partner: false,
  link: {
    project: {
      url: "https://projectsapi.zoho.com/restapi/portal/647154632/projects/"
    }
  },
  new_user_plan: true,
  available_projects: 0,
  default: false,
  id: 680404658,
  bug_plural: "Issues",
  is_new_plan: false,
  plan: "Free"
};

export type PortalResponseType = typeof portalResponse;
export const PortalTC = composeWithJson("Portal", portalResponse);
export const PortalGraphQLType = PortalTC.getType();
export const PortalQueryFields = {
  portal: {
    type: PortalTC,
    args: {
      id: `String!`
    },
    resolve: async (_: any, args: { id: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/portal/${args.id}`);
        return response.data.portals.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  portals: {
    type: [PortalTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/portals/`);
        return response.data.portals;
      } catch (err) {
        return err.response;
      }
    }
  }
};
