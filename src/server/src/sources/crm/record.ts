import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "../../fetcher";

const recordResponse = {
  Owner: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  },
  Ownership: "Private",
  Description: null,
  Account_Type: "Partner",
  Rating: null,
  SIC_Code: null,
  Shipping_State: null,
  Website: null,
  Product: null,
  Employees: 200,
  Last_Activity_Time: "2019-04-26T14:01:40+05:30",
  Industry: "Education",
  Record_Image: null,
  Modified_By: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  },
  Account_Site: "Chennai - South",
  Phone: "555555555",
  Billing_Country: null,
  Account_Name: "Zylker",
  id: "554023000000366005",
  Account_Number: "0",
  Ticker_Symbol: null,
  Modified_Time: "2019-04-26T14:01:40+05:30",
  Billing_Street: null,
  Created_Time: "2019-03-22T15:28:27+05:30",
  Billing_Code: null,
  Vendor: {
    name: "MyVendor",
    id: "554023000000310037"
  },
  Territories: ["Chennai", "Chennai-South"],
  Parent_Account: {
    name: "King",
    id: "554023000000238121"
  },
  Shipping_City: "Chennai",
  Shipping_Country: null,
  Shipping_Code: null,
  Billing_City: "Chennai",
  Billing_State: "Tamil Nadu",
  Tag: [],
  Created_By: {
    name: "Patricia Boyle",
    id: "554023000000235011"
  },
  Fax: null,
  Annual_Revenue: null,
  Shipping_Street: null,
  approval: () => ({
    type: "JSON",
    resolve: (source: any) => source.$approval
  }),
  approved: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$approved
  }),
  editable: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$editable
  }),
  currency_symbol: () => ({
    type: "String",
    resolve: (source: any) => source.$currency_symbol
  })
};

const recordDeletedResponse = {
  deleted_by: {
    name: "Patricia Boyle",
    id: "410888000000086001"
  },
  id: "410888000000099071",
  display_name: "Patricia",
  type: "recycle",
  created_by: {
    name: "Patricia Boyle",
    id: "410888000000086001"
  },
  deleted_time: "2015-06-19T11:19:38+05:30"
};

const recordSearchResponse = {
  Account: null,
  Owner: {
    name: "Patricia Boyle",
    id: "3652397000000186017"
  },
  Company: null,
  Email: "newcrmapi@zoho.com",
  Visitor_Score: null,
  Last_Activity_Time: "2019-03-22T11:10:55+05:30",
  Industry: "ASP",
  Street: "Street",
  Zip_Code: "Zip_Code",
  id: "3652397000000415002",
  First_Visited_URL: null,
  Days_Visited: null,
  Created_Time: "2019-01-10T13:04:32+05:30",
  City: "City",
  No_of_Employees: 100,
  State: "State",
  Country: "Country",
  Last_Visited_Time: null,
  Created_By: {
    name: "Patricia Boyle",
    id: "3652397000000186017"
  },
  Annual_Revenue: 100000,
  Secondary_Email: "newcrmapi@zoho.com",
  Description:
    "Design your own layouts that align your business processes precisely. Assign them to profiles appropriately.",
  Number_Of_Chats: null,
  Rating: "Acquired",
  Website: "crm.zoho.com",
  Twitter: "Twitter",
  Average_Time_Spent_Minutes: null,
  Associated_Contacts: null,
  Salutation: "Mr.",
  First_Name: "First_Name",
  Lead_Status: "Contacted",
  Full_Name: "Mr. First_Name Last_Name",
  Record_Image: null,
  Modified_By: {
    name: "Patricia Boyle",
    id: "3652397000000186017"
  },
  Skype_ID: "Skype_ID",
  Phone: "98883434559",
  Email_Opt_Out: false,
  Designation: "Designation",
  Modified_Time: "2019-03-22T11:10:55+05:30",
  Mobile: "98883434559",
  Prediction_Score: null,
  First_Visited_Time: null,
  Last_Name: "Last_Name",
  Referrer: null,
  Lead_Source: "Twitter",
  Tag: [],
  Fax: "Fax",
  approval: () => ({
    type: "JSON",
    resolve: (source: any) => source.$approval
  }),
  approved: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$approved
  }),
  converted: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$converted
  }),
  editable: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$editable
  }),
  currency_symbol: () => ({
    type: "String",
    resolve: (source: any) => source.$currency_symbol
  })
};

export type RecordResponseType = typeof recordResponse;
export type RecordDeletedResponseType = typeof recordDeletedResponse;
export type RecordSearchResponseType = typeof recordSearchResponse;

export const RecordTC = composeWithJson("Record", recordResponse);
export const RecordDeletedTC = composeWithJson("RecordDeleted", recordDeletedResponse);
export const RecordSearchTC = composeWithJson("RecordSearch", recordSearchResponse);

export const RecordGraphQLType = RecordTC.getType();
export const RecordQueryFields = {
  record: {
    type: RecordTC,
    args: {
      id: `String!`,
      module: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/${args.module}/${args.id}`);
        return response.data.data.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  records: {
    type: [RecordTC],
    args: {
      module: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/${args.module}`);
        return response.data.data;
      } catch (err) {
        return err.response;
      }
    }
  },

  deletedRecords: {
    type: [RecordDeletedTC],
    args: {
      module: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/${args.module}/deleted`);
        return response.data.data;
      } catch (err) {
        return err.response;
      }
    }
  },

  searchRecords: {
    type: [RecordSearchTC],
    args: {
      module: `String!`,
      // Eg : ((Last_Name:equals:Burns\,B)and(First_Name:starts_with:M))"
      criteria: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/${args.module}/search?criteria=${args.criteria}`
        );
        return response.data.data;
      } catch (err) {
        return err.response;
      }
    }
  }
};
