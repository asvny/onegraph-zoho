import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const timerResponse = {
  jobName: "UI designing",
  date: 60574,
  hours: 241,
  erecno: "492688000000142191",
  diff: 573,
  billingStatus: "billable",
  timerId: "492688000000820013",
  jobId: "492688000000790013",
  workDate: "2019-04-06",
  totaltime: 14495,
  isRunning: true,
  timelogId: "492688000000821095",
  fromTime: 60001,
  taskName: "",
  jobIsActive: true,
  employeename: "Christine Spalding",
  isCompleted: 0
};

const timerCommentResponse = {
  commentId: "492688000000821129",
  createdTime: "06-04-2019 , 17:22:28",
  comment: "Complete security testing"
};

export type TimerResponseType = typeof timerResponse;
export type TimerCommentResponseType = typeof timerCommentResponse;

export const TimerTC = composeWithJson("Timer", timerResponse);
export const TimerCommentTC = composeWithJson("TimerComment", timerCommentResponse);

export const TimerGraphQLType = TimerTC.getType();
export const TimerCommentGraphQLType = TimerCommentTC.getType();

export const TimerQueryFields = {
  currentlyActiveTimer: {
    type: TimerTC,
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getcurrentlyrunningtimer`);
        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  },

  timerComments: {
    type: [TimerCommentTC],
    args: {
      timeLogId: { type: `String!` }
    },
    resolve: async (_: any, args: { timeLogId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getcomments`, {
          params: args
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
