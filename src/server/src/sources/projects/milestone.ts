import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const milestoneResponse = {
  id: 170876000000472001,
  name: "Purchasing",
  owner_name: "Amritha Agrawal",
  owner_id: "2063270",
  flag: "internal",
  start_date: "12-05-2012 12:00 AM",
  start_date_long: 1354674600000,
  end_date: "12-12-2016 12:00 AM",
  end_date_long: 1481509800000,
  status: "notcompleted"
};

export type MilestoneResponseType = typeof milestoneResponse;
export const MilestoneTC = composeWithJson("Milestone", milestoneResponse);
export const MilestoneGraphQLType = MilestoneTC.getType();
export const MilestoneQueryFields = {
  milestone: {
    type: MilestoneTC,
    args: {
      portalId: `String!`,
      projectId: `String!`,
      milestoneId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string; milestoneId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/milestones/${args.milestoneId}`
        );
        return response.data.milestones.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  milestones: {
    type: [MilestoneTC],
    args: {
      portalId: `String!`,
      projectId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/milestones/`
        );
        return response.data.milestones;
      } catch (err) {
        return err.response;
      }
    }
  },

  mymilestones: {
    type: [MilestoneTC],
    args: {
      portalId: `String!`
    },
    resolve: async (_: any, args: { portalId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/portal/${args.portalId}/milestones/`);
        return response.data.milestones;
      } catch (err) {
        return err.response;
      }
    }
  }
};
