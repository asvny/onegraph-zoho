import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const timesheetResponse = {
  owner: "469505000000133005",
  formId: "469505000000118001",
  nonbillableHours: "03:48",
  employeeName: "Eliza Madison",
  erecno: "469505000000133005",
  totalHours: "04:48",
  toDate: "13-Apr-2019",
  description: "Worked on System/Requirement Analysis",
  employeeEmail: "eliza.madison@gmail.com",
  approvedBillableHours: "01:00",
  employeeId: "ID - 1",
  billableHours: "01:00",
  recordId: "469505000000272183",
  listId: "469505000000272183",
  fromDate: "07-Apr-2019",
  totalAmount: "100.00",
  approvedNonBillableHours: "00:00",
  approvedRatePerHour: 100,
  approvedTotalAmount: "100.00",
  ratePerHour: 100,
  timesheetName: "Weekly Timesheet (07-Apr-2019 - 13-Apr-2019)",
  currency: "USD",
  approvedTotalHours: "01:00",
  status: "Approved"
};

interface TimeSheetResolverArgs {
  user: string;
  approvalStatus: string;
  employeeStatus: string;
  sIndex: number;
  limit: number;
  toDate: string;
  fromDate: string;
  dateFormat: string;
}

export type TimeSheetResponseType = typeof timesheetResponse;
export const TimeSheetTC = composeWithJson("Timesheet", timesheetResponse);

export const TimeSheetGraphQLType = TimeSheetTC.getType();
export const TimeSheetQueryFields = {
  timesheet: {
    type: TimeSheetTC,
    args: {
      timesheetId: `String!`,
      dateFormat: { type: `String`, defaultValue: null }
    },
    resolve: async (_: any, args: { timesheetId: string; dateFormat: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/gettimesheetdetails`, {
          params: args
        });
        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  },

  timesheets: {
    type: [TimeSheetTC],
    args: {
      user: { type: `String`, defaultValue: "all" },
      approvalStatus: { type: `String`, defaultValue: "all" },
      employeeStatus: { type: `String`, defaultValue: "usersandnonusers" },
      sIndex: { type: `Int`, defaultValue: 0 },
      limit: { type: `Int`, defaultValue: 10 },
      toDate: { type: `String`, defaultValue: null },
      fromDate: { type: `String`, defaultValue: null },
      dateFormat: { type: `String`, defaultValue: null }
    },
    resolve: async (_: any, args: TimeSheetResolverArgs) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/gettimesheet`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
