import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const leaveTypeResponse = {
  Name: "DayBased",
  PermittedCount: 90,
  AvailedCount: 0,
  Id: 3000000030001,
  Unit: "Days",
  BalanceCount: 90
};

const holidayTypeResponse = {
  Name: "Test",
  LocationId: "",
  LocationName: "",
  Remarks: "",
  Id: 3000000065001
};

export type LeaveTypeResponseType = typeof leaveTypeResponse;
export type HolidayTypeResponseType = typeof holidayTypeResponse;

export const LeaveTypeTC = composeWithJson("LeaveType", leaveTypeResponse);
export const HolidayTypeTC = composeWithJson("HolidayType", holidayTypeResponse);

export const LeaveTypeGraphQLType = LeaveTypeTC.getType();
export const HolidayTypeGraphQLType = HolidayTypeTC.getType();

export const LeaveTypeQueryFields = {
  leaveTypes: {
    type: [LeaveTypeTC],
    args: {
      userId: `String!`
    },
    resolve: async (_: any, args: { userId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getLeaveTypeDetails`, {
          params: args
        });
        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  },

  holidays: {
    type: [HolidayTypeTC],
    args: {
      userId: `String!`
    },
    resolve: async (_: any, args: { userId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getHolidays`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
