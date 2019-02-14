import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "../../fetcher";

const userResponse = {
  country: "US",
  role: {
    name: "CEO",
    id: "3206844000000026005"
  },
  customize_info: {
    notes_desc: "",
    show_right_panel: "ull",
    bc_view: "",
    show_home: false,
    show_detail_view: true,
    unpin_recent_item: ""
  },
  city: "Melbourne",
  signature: "",
  name_format: "Salutation,First Name,Last Name",
  language: "en_US",
  locale: "en_US",
  microsoft: false,
  personal_account: true,
  Isonline: true,
  default_tab_group: "0",
  Modified_By: {
    name: "Vikram patel",
    id: "3206844000000152015"
  },
  street: "",
  alias: "",
  theme: {
    normal_tab: {
      font_color: "#FFFFFF",
      background: "#222222"
    },
    selected_tab: {
      font_color: "#FFFFFF",
      background: "#222222"
    },
    new_background: "",
    background: "#F3F0EB",
    screen: "fixed",
    type: "default"
  },
  id: "3206844000000152015",
  state: "New South Wales",
  fax: "",
  country_locale: "US",
  first_name: "Vikram",
  email: "roguez.it@gmail.com",
  zip: 3423,
  decimal_separator: "en_US",
  created_time: "2018-04-22T15:56:53+08:00",
  Modified_Time: "2019-08-29T07:52:06+08:00",
  website: "",
  time_format: "hh:mm a",
  offset: 28800000,
  profile: {
    name: "Administrator",
    id: "3206844000000026011"
  },
  mobile: "",
  last_name: "Vikram patel",
  time_zone: "Australia/Perth",
  created_by: {
    name: "Vikram patel",
    id: "3206844000000152015"
  },
  zuid: "650517247",
  confirm: true,
  full_name: "Vikram patel",
  territories: [],
  phone: "",
  dob: "01/01/1990",
  date_format: "MM/dd/yyyy",
  status: "active"
};

export type UserResponseType = typeof userResponse;
export const UserTC = composeWithJson("User", userResponse);
export const UserGraphQLType = UserTC.getType();
export const UserQueryFields = {
  user: {
    type: UserTC,
    args: {
      id: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/users/${args.id}`);
        return response.data["users"].pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  users: {
    type: [UserTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/users`);
        return response.data;
      } catch (err) {
        return err.response;
      }
    }
  }
};
