import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const blueprintFieldResponse = {
  display_label: "Attachments",
  _type: "related_lists",
  data_type: "Attachment",
  column_name: null,
  personality_name: "ATTACHMENTSPERSONALITY",
  id: "0",
  transition_sequence: 2,
  mandatory: true,
  layouts: null
};

const blueprintTransitionResponse = {
  next_transitions: [],
  percent_partial_save: 83.334,
  data: {
    Attachments: ""
  },
  next_field_value: "Market Failed",
  name: "22",
  criteria_matched: true,
  id: "1000000033019",
  criteria_message: null
};

const blueprintResponse = {
  process_info: {
    field_id: "1000000000589",
    is_continuous: false,
    api_name: "Rating",
    continuous: false,
    field_label: "Rating",
    name: "test accout",
    column_name: "RATING",
    field_value: "Acquired",
    id: "1000000033119",
    field_name: "Rating"
  }
};

export type BlueprintResponseType = typeof blueprintResponse;

export const BlueprintTC = composeWithJson("Blueprint", blueprintResponse);
export const BlueprintField = composeWithJson("BlueprintField", blueprintFieldResponse);
export const BlueprintTransition = composeWithJson(
  "BlueprintTransition",
  blueprintTransitionResponse
);

BlueprintField.addFields({
  fields: {
    type: [BlueprintTransition],
    resolve: (data: any) => data
  }
});

BlueprintTC.addFields({
  transitions: {
    type: [BlueprintField],
    resolve: (data: any) => data
  }
});

export const BlueprintGraphQLType = BlueprintTC.getType();
export const BlueprintQueryFields = {
  blueprint: {
    type: BlueprintTC,
    args: {
      id: `String!`,
      module: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/${args.module}/${args.id}/actions/blueprint`
        );
        return response.data.blueprint;
      } catch (err) {
        return err.response;
      }
    }
  }
};
