import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const territoryResponse = {
  created_time: "2019-04-10T14:27:50+05:30",
  modified_time: "2019-04-10T14:27:50+05:30",
  manager: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  },
  parent_id: "",
  criteria: "",
  name: "CRM",
  modified_by: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  },
  description: "Organization Parent Territory",
  id: "554023000000430341",
  created_by: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  }
};

export type TerritoryResponseType = typeof territoryResponse;
export const TerritoryTC = composeWithJson("Territory", territoryResponse);
export const TerritoryGraphQLType = TerritoryTC.getType();
export const TerritoryQueryFields = {
  territories: {
    type: [TerritoryTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/territories`);
        return response.data.territories;
      } catch (err) {
        return err.response;
      }
    }
  }
};
