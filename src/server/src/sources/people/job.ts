import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const jobResponse = {
  jobName: "System Performance Analysis",
  owner: "469505000000133005",
  jobStatus: "In-Progress",
  hours: "57:00",
  assignedBy: "Eliza Madison",
  clientId: "469505000000133417",
  clientName: "Adamo Meyrick",
  toDate: "12/04/2019",
  description: "To analyse the system performance",
  jobBillableStatus: "Non-Billable",
  assigneeCount: 26,
  isDeleteAllowed: true,
  fromDate: "05/04/2019",
  jobId: "469505000000268001",
  ratePerHour: 0,
  totalhours: "52:00",
  projectName: "Analysis",
  projectId: "469505000000267333"
};

const jobDeptsResponse = {
  deptName: "HR",
  deptId: "469505000000133001"
};

const jobAssigneesResponse = {
  hours: "50:00",
  erecno: "469505000000133275",
  rate: 70,
  name: "Patrick Dohnman",
  totalhours: "40:00"
};

interface JobsResolverArgs {
  assignedTo: string;
  assignedBy: string;
  jobStatus: string;
  projectId: string;
  clientId: string;
  isAssigneeCount: boolean;
  fetchLoggedHrs: boolean;
  sIndex: number;
  limit: number;
  dateFormat: string;
}

export type JobResponseType = typeof jobResponse;
export type JobDeptResponseType = typeof jobDeptsResponse;
export type JobAssigneesResponseType = typeof jobAssigneesResponse;

export const JobTC = composeWithJson("Job", jobResponse);
export const JobDeptTC = composeWithJson("JobDept", jobDeptsResponse);
export const JobAssigneesTC = composeWithJson("JobAssignee", jobAssigneesResponse);

export const JobGraphQLType = JobTC.getType();
export const JobDeptGraphQLType = JobDeptTC.getType();
export const JobAssigneesGraphQLType = JobAssigneesTC.getType();

JobTC.addFields({
  jobDepts: {
    type: [JobDeptTC],
    resolve: (data: any) => data
  },

  assignees: {
    type: [JobAssigneesTC],
    resolve: (data: any) => data
  }
});

export const JobQueryFields = {
  job: {
    type: JobTC,
    args: {
      jobId: `String!`,
      dateFormat: { type: `String` },
      includeDept: { type: `Boolean`, defaultValue: false }
    },
    resolve: async (_: any, args: { jobId: string; dateFormat: string; includeDept: boolean }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getjobdetails`, {
          params: args
        });
        return response.data.response.result.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  jobs: {
    type: [JobTC],
    args: {
      assignedTo: { type: `String!` },
      assignedBy: { type: `String`, defaultValue: "all" },
      jobStatus: { type: `String`, defaultValue: "all" },
      projectId: { type: `String`, defaultValue: "all" },
      clientId: { type: `String`, defaultValue: "all" },
      isAssigneeCount: { type: `Boolean`, defaultValue: false },
      fetchLoggedHrs: { type: `Boolean`, defaultValue: false },
      sIndex: { type: `Int`, defaultValue: 0 },
      limit: { type: `Int`, defaultValue: 10 },
      dateFormat: { type: `String` }
    },
    resolve: async (_: any, args: JobsResolverArgs) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getjobs`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
