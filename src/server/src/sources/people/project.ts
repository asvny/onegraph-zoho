import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const projectResponse = {
  projectManager: "492688000000135005",
  projectUsersCount: 5,
  clientId: "492688000000793027",
  projectManagerName: "Christine",
  clientName: "Robin Li",
  isDeleteAllowed: true,
  isDeptProject: false,
  ownerId: "492688000000135005",
  projectStatus: "In-Progress",
  ownerName: "Sridhar",
  projectCost: 1000,
  projectName: "Project2",
  projectId: "492688000000341099",
  jobCount: 1
};

interface ProjectResolverArgs {
  assignedTo: string;
  clientId: string;
  projectStatus: string;
  isUserCount: boolean;
  isJobCount: boolean;
  includeDeptProjects: boolean;
  sIndex: number;
  limit: number;
}

export type ProjectResponseType = typeof projectResponse;
export const ProjectTC = composeWithJson("Project", projectResponse);
export const ProjectGraphQLType = ProjectTC.getType();
export const ProjectQueryFields = {
  project: {
    type: ProjectTC,
    args: {
      projectId: `String!`
    },
    resolve: async (_: any, args: { projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getprojectdetails`, {
          params: args
        });
        return response.data.response.result.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  projects: {
    type: [ProjectTC],
    args: {
      assignedTo: { type: `String`, defaultValue: "all" },
      clientId: { type: `String`, defaultValue: "all" },
      projectStatus: { type: `String`, defaultValue: "all" },
      isUserCount: { type: `Boolean`, defaultValue: false },
      isJobCount: { type: `Boolean`, defaultValue: false },
      includeDeptProjects: { type: `Boolean`, defaultValue: false },
      sIndex: { type: `Int`, defaultValue: 0 },
      limit: { type: `Int`, defaultValue: 10 }
    },
    resolve: async (_: any, args: ProjectResolverArgs) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getprojects`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
