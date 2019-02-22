import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const announcementResponse = {
  owner: "3000000013255",
  modifiedTime: "1543209052900",
  subject: "Wellness Program!",
  isCommentDisable: 1,
  isNotify: 1,
  announcementId: "3000000183011",
  publishDate: "1543209052899",
  expireDate: -1,
  message: "Enjoy a week-long wellness program at all our office locations.",
  isActive: false,
  isSticky: 1,
  notifyOthersEmailIds: "c.spalding@zylker.com,"
};

export type AnnouncementResponseType = typeof announcementResponse;
export const AnnouncementTC = composeWithJson("Announcement", announcementResponse);
export const AnnouncementGraphQLType = AnnouncementTC.getType();
export const AnnouncementQueryFields = {
  announcement: {
    type: AnnouncementTC,
    args: {
      id: `String!`
    },
    resolve: async (_: any, { id }: { id: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/announcement/getAnnouncementByID`, {
          params: {
            id
          }
        });
        return response.data.response.result.resultData.announcementList.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  announcements: {
    type: [AnnouncementTC],
    args: {
      isSticky: { type: `Boolean`, defaultValue: false },
      startIdx: { type: `Int`, defaultValue: 0 },
      search: { type: `String`, defaultValue: null }
    },
    resolve: async (
      _: any,
      { isSticky, startIdx, search }: { isSticky: boolean; startIdx: number; search: string }
    ) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/announcement/getAllAnnouncement`, {
          params: {
            isSticky,
            startIdx,
            search
          }
        });

        return response.data.response.result.resultData.announcementList;
      } catch (err) {
        return err.response;
      }
    }
  }
};
