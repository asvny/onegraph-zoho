import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";

function axiosOAuth(axios: AxiosInstance, { url, ...credentials }: Record<string, any>) {
  const config = {
    url,
    method: "post",
    data: qs.stringify(credentials)
  };

  return () => axios(config as AxiosRequestConfig).then((res: any) => res.data);
}

let accessToken = process.env.PROJECTS_ACCESS_TOKEN;

const AxiosClient = axios.create({
  baseURL: "https://projectsapi.zoho.com/restapi/"
});

const CONFIG = {
  url: process.env.AUTH_DOMAIN + "oauth/v2/token",
  client_id: process.env.PROJECTS_CLIENT_ID,
  client_secret: process.env.PROJECTS_CLIENT_SECRET
};

export const getClientCredentials = axiosOAuth(AxiosClient, {
  ...CONFIG,
  redirect_uri: process.env.REDIRECT_URI,
  code: process.env.PROJECTS_CODE,
  scope: process.env.PROJECTS_SCOPE,
  grant_type: "authorization_code"
});

export const getRefreshToken = axiosOAuth(AxiosClient, {
  ...CONFIG,
  refresh_token: process.env.PROJECTS_REFRESH_TOKEN,
  grant_type: "refresh_token"
});

AxiosClient.interceptors.request.use(config => {
  console.log(accessToken);
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

// AxiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const {
//       config,
//       response: { status }
//     } = error;

//     console.log(status);

//     if (status === 401) {
//       let response = await getRefreshToken();
//       accessToken = response.access_token;

//       return AxiosClient.request(config);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default AxiosClient;
