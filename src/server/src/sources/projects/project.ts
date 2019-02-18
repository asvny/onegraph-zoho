import { composeWithJson } from "graphql-compose-json";
import { AxiosResponse } from "axios";

import fetcher from "./fetcher";

const projectResponse = {
  is_strict: "no",
  project_percent: "7",
  role: "Portal Owner",
  bug_count: {
    closed: 0,
    open: 11
  },
  IS_BUG_ENABLED: true,
  owner_id: "39606834",
  bug_client_permission: "allexternal",
  taskbug_prefix: "EZ1",
  custom_status_id: "1543498000000020089",
  description:
    "<p style='font-family: Roboto, Helvetica, sans-serif; font-size: 13px;'>Zoho Projects, belonging to the web based project management and collaboration tools, includes an issue tracking software that allows teams to collaborate and get projects done faster.&nbsp;<br><br>With Zoho Projects you can post the working status and project members can chat with each other. The Project Stream helps all the team members get immediate updates about the current status of their project. Users easily can keep all content organized and accessible by centrally posting files and easily creating a project web page or documentation.<br><br>Create project files directly on your browser, without any need to install additional software. Upload your Microsoft Office, Open Office, Star Office, AutoCad, Photoshop, ZIP files and any other kind of document that might be necessary for your project.<br><br>Issue Tracking module is a powerful issue submission software using which you can define a structure and organize how issues are to be handled.</p><p style='font-family: Roboto, Helvetica, sans-serif; font-size: 13px;'>Key Features</p><p style='font-family: Roboto, Helvetica, sans-serif; font-size: 13px;'></p><ul style='font-family: Roboto, Helvetica, sans-serif; font-size: 13px;'><li>Task Management and Time Tracking</li><li>Project Reports (Gantt Charts)</li><li>Project Calendar &amp; Meetings</li><li>Online Project Chat</li><li>Issue Tracking Software</li><li>Google Apps Integration</li><li>Document Management</li><li>Dropbox Integration</li><li>Hourly Tasks and Sub tasks</li><li>Github Integration</li><li>iPhone App</li><li>Email Collaboration</li></ul>",
  milestone_count: {
    closed: 1,
    open: 2
  },
  updated_date_long: 1578477720585,
  show_project_overview: true,
  task_count: {
    closed: 2,
    open: 14
  },
  updated_date_format: "01-08-2020 06:02:00 PM",
  workspace_id: "im0w2a5b4653fd3804f5c90f1639d0c31690c",
  custom_status_name: "zp.projstatus.active",
  is_client_assign_bug: "false",
  bug_defaultview: "6",
  billing_status: "Billable",
  id: 1543498000000031781,
  key: "AS-1",
  is_chat_enabled: true,
  is_sprints_project: false,
  custom_status_color: "#33927d",
  owner_name: "Zoho Projects Companion",
  created_date_long: 1578477720549,
  created_date_format: "01-08-2020 06:02:00 PM",
  profile_id: 1543498000000031330,
  enabled_tabs: [
    "dashboard",
    "projectfeed",
    "tasks",
    "bugs",
    "milestones",
    "calendar",
    "documents",
    "timesheet",
    "invoices",
    "users",
    "reports"
  ],
  name: "Explore Zoho Projects!",
  is_public: "no",
  id_string: "1543498000000031781",
  created_date: "01-08-2020",
  updated_date: "01-08-2020",
  bug_prefix: "EZ1-I",
  cascade_setting: {
    date: false,
    logHours: false,
    plan: true,
    percentage: false,
    workHours: false
  },
  status: "active"
};

export type ProjectResponseType = typeof projectResponse;
export const ProjectTC = composeWithJson("Project", projectResponse);
export const ProjectGraphQLType = ProjectTC.getType();
export const ProjectQueryFields = {
  project: {
    type: ProjectTC,
    args: {
      portalId: `String!`,
      projectId: `String!`
    },
    resolve: async (_: any, args: { portalId: string; projectId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(
          `/portal/${args.portalId}/projects/${args.projectId}/`
        );
        return response.data.projects.pop();
      } catch (err) {
        return err.response;
      }
    }
  },

  portals: {
    type: [ProjectTC],
    args: {
      portalId: `String!`
    },
    resolve: async (_: any, args: { portalId: string }) => {
      try {
        let response: AxiosResponse = await fetcher.get(`/portal/${args.portalId}/projects/`);
        return response.data.projects;
      } catch (err) {
        return err.response;
      }
    }
  }
};
