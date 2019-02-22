import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const timelogResponse = {
  erecno: "492688000000135005",
  timerLog: true,
  employeeMailId: "c.spalding@zylker.com",
  isTimelogPushedToZF: false,
  jobColor: 1,
  employeeFirstName: "Christine",
  isDeleteAllowed: true,
  type: "2",
  workDate: "04-04-2019",
  fromTime: 666,
  billedStatus: "not billed",
  jobIsActive: true,
  toTime: 667,
  jobName: "Development Phase",
  approvalStatus: "notsubmitted",
  hours: "05:00",
  db_workDate: "2019-04-04 00:00:00.0",
  jobIsCompleted: 0,
  jobBillableStatus: "0",
  isEditAllowed: true,
  billingStatus: "billable",
  jobId: "492688000000808246",
  isTimelogPushedToQBO: false,
  totaltime: 18015,
  employeeLastName: "Spalding",
  timelogId: "492688000000808276",
  taskName: ""
};

const timelogTimeArrResponse = {
  timerId: "492688000000808292",
  fromTime: 54040,
  fromTimeInTimeFormat: "03:00PM",
  toTime: 64847,
  toTimeInTimeFormat: "06:00PM"
};

interface TimelogResolverArgs {
  assignedTo: string;
  clientId: string;
  projectStatus: string;
  isUserCount: boolean;
  isJobCount: boolean;
  includeDeptProjects: boolean;
  sIndex: number;
  limit: number;
}

export type TimelogResponseType = typeof timelogResponse;
export type TimelogTimeArrResponseType = typeof timelogTimeArrResponse;

export const TimelogTC = composeWithJson("Timelog", timelogResponse);
export const TimelogTimeItemTC = composeWithJson("TimelogTimeItem", timelogTimeArrResponse);

export const TimelogGraphQLType = TimelogTC.getType();
export const TimelogTimeItemGraphQLType = TimelogTimeItemTC.getType();

export const TimelogQueryFields = {
  timelog: {
    type: TimelogTC,
    args: {
      timelogId: `String!`
    },
    resolve: async (_: any, args: { timelogId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/gettimelogdetails`, {
          params: args
        });
        return response.data.response.result.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  timelogs: {
    type: [TimelogTC],
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
    resolve: async (_: any, args: TimelogResolverArgs) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/gettimelogs`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
