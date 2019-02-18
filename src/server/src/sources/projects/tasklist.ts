import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const tasklistResponse = {
  id: 170876000000270053,
  name: "ERP Phase III",
  milestone: {
    id: 170876000000366021,
    name: "Accounts Receivables",
    owner_name: "Jasmine Frank",
    owner_id: "2060559",
    flag: "internal",
    start_date: "04-01-2014 12:00 AM",
    start_date_long: 1396319400000,
    end_date: "04-30-2014 12:00 AM",
    end_date_long: 1398825000000,
    status: "notcompleted"
  },
  completed: false,
  created_time: "09-18-2012 10:40 AM",
  created_time_long: 1347973813551,
  rolled: false,
  sequence: 1,
  view_type: "internal"
};

export type TaskListResponseType = typeof tasklistResponse;
export const TaskListTC = composeWithJson("Project", tasklistResponse);
export const TaskListGraphQLType = TaskListTC.getType();
export const TaskListQueryFields = {
  tasklists: {
    type: [TaskListTC],
    args: {
      portalId: `String!`,
      projectId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/tasklists/`,
          {
            params: {
              flag: "external"
            }
          }
        );
        return response.data.tasklists;
      } catch (err) {
        return err.response;
      }
    }
  }
};
