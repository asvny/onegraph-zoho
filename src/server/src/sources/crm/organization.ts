import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const organizationResponse = {
  country: "US",
  mc_status: false,
  gapps_enabled: false,
  id: "111111000000033001",
  state: "sd",
  employee_count: "154",
  website: "www.zylker.com",
  currency_symbol: "$",
  mobile: 343,
  currency_locale: "en_US",
  primary_zuid: "5478235",
  zgid: "5478236",
  country_code: "US",
  license_details: {
    paid_expiry: "23",
    users_license_purchased: 3,
    trial_type: "professional",
    trial_expiry: "2018-05-17T17:20:05+05:30",
    paid: false,
    paid_type: "free"
  },
  company_name: "23",
  privacy_settings: true,
  primary_email: "p.boyle@zylker.com",
  iso_code: "USD"
};

export type OrganizationResponseType = typeof organizationResponse;
export const OrganizationTC = composeWithJson("Organization", organizationResponse);
export const OrganizationGraphQLType = OrganizationTC.getType();
export const OrganizationQueryFields = {
  organization: {
    type: OrganizationTC,
    resolve: async (_: any, _args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/org`);
        return response.data.org.pop();
      } catch (err) {
        return err.response;
      }
    }
  }
};
