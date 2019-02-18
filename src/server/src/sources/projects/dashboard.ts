import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const projectActivitiesResponse = {
  id: 170876000001818005,
  state: "new",
  activity_for: "Status ",
  name: "Release for 4.0",
  activity_by: "Patricia Boyle",
  time_long: 1399484914215,
  display_time: "May 7",
  time: "05-07-2014 03:18 PM"
};

const projectStatusResponse = {
  id: 170876000001818007,
  content: "Release Documents for Build 4.0",
  posted_by: "2060758",
  posted_person: "Patricia Boyle",
  posted_time: "05-07-2014 03:19 PM",
  posted_time_long: 1399484977656
};

export type ProjectActivityResponseType = typeof projectActivitiesResponse;
export type ProjectStatusResponseType = typeof projectStatusResponse;

export const ProjectActivityTC = composeWithJson("ProjectActivity", projectActivitiesResponse);
export const ProjectStatusTC = composeWithJson("ProjectSatus", projectStatusResponse);

export const ProjectActivityGraphQLType = ProjectActivityTC.getType();
export const ProjectStatusGraphQLType = ProjectStatusTC.getType();

export const ProjectActivityQueryFields = {
  projectActivities: {
    type: [ProjectActivityTC],
    args: {
      portalId: `String!`,
      projectId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/activities/`
        );
        return response.data.activities;
      } catch (err) {
        return err.response;
      }
    }
  },

  projectStatuses: {
    type: [ProjectStatusTC],
    args: {
      portalId: `String!`,
      projectId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/statuses/`
        );
        return response.data.statuses;
      } catch (err) {
        return err.response;
      }
    }
  }
};
