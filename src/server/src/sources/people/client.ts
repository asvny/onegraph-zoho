import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const clientResponse = {
  clientId: "",
  clientName: "",
  currencyCode: "",
  billingMethod: "",
  emailId: "",
  firstName: "",
  lastName: "",
  phoneNo: "",
  mobileNo: "",
  faxNo: "",
  streetAddr: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  industry: "",
  compsize: 0,
  description: ""
};

export type ClientResponseType = typeof clientResponse;
export const ClientTC = composeWithJson("Client", clientResponse);
export const ClientGraphQLType = ClientTC.getType();
export const ClientQueryFields = {
  client: {
    type: ClientTC,
    args: {
      clientId: `String!`
    },
    resolve: async (_: any, { id }: { id: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getclientdetails`, {
          params: {
            id
          }
        });
        return response.data.response.result.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  clients: {
    type: [ClientTC],
    args: {
      limit: { type: `Int`, defaultValue: 10 },
      sIndex: { type: `Int`, defaultValue: 0 }
    },
    resolve: async (_: any, { limit, sIndex }: { limit: number; sIndex: number }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/timetracker/getclients`, {
          params: {
            limit,
            sIndex
          }
        });

        return response.data.response.result;
      } catch (err) {
        return err.response;
      }
    }
  }
};
