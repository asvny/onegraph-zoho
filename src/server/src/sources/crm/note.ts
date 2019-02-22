import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const noteResponse = {
  Owner: {
    name: "Patricia Boyle",
    id: "410888000000086001"
  },
  Modified_By: {
    name: "Patricia Boyle",
    id: "410888000000086001"
  },
  Modified_Time: "2016-09-15T18:03:09+05:30",
  Created_Time: "2016-09-15T18:03:09+05:30",
  Parent_Id: {
    name: "",
    id: "410888000000698006"
  },
  id: "410888000000734003",
  Created_By: {
    name: "Patricia Boyle",
    id: "410888000000086001"
  },
  Note_Title: "",
  Note_Content: "Demo scheduled for this Lead",

  se_module: () => ({
    type: "String",
    resolve: (source: any) => source.$se_module
  }),
  followed: () => ({
    type: "Boolean",
    resolve: (source: any) => source.$followed
  }),
  approval: () => ({
    type: "JSON",
    resolve: (source: any) => source.$approval
  })
};

// @ts-ignore
// const ModuleEnum = EnumTypeComposer.create(`enum MyEnumType { FOO BAR }`, schemaComposer);

export type NoteResponseType = typeof noteResponse;
export const NoteTC = composeWithJson("Note", noteResponse);

export const NoteGraphQLType = NoteTC.getType();
export const NoteQueryFields = {
  note: {
    type: NoteTC,
    args: {
      module: `String!`,
      id: `String!`
    },
    resolve: async (_: any, args: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/${args.module}/${args.id}/Notes`);
        return response.data.data.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  notes: {
    type: [NoteTC],
    resolve: async (_: any) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/Notes`);
        return response.data.data;
      } catch (err) {
        return err.response;
      }
    }
  }
};
