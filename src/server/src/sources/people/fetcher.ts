import axios from "axios";

// let authToken = process.env.PEOPLE_AUTH_TOKEN;

const AxiosClient = axios.create({
  baseURL: "https://people.zoho.com/people/api/"
});

// const CONFIG = {
//   url: process.env.AUTH_DOMAIN + "oauth/v2/token",
//   client_id: process.env.PROJECTS_CLIENT_ID,
//   client_secret: process.env.PROJECTS_CLIENT_SECRET
// };

// export const getClientCredentials = axiosOAuth(AxiosClient, {
//   ...CONFIG,
//   redirect_uri: process.env.REDIRECT_URI,
//   code: process.env.PROJECTS_CODE,
//   scope: process.env.PROJECTS_SCOPE,
//   grant_type: "authorization_code"
// });

// export const getRefreshToken = axiosOAuth(AxiosClient, {
//   ...CONFIG,
//   refresh_token: process.env.PROJECTS_REFRESH_TOKEN,
//   grant_type: "refresh_token"
// });

AxiosClient.interceptors.request.use(config => {
  config.params = {
    ...config.params,
    authtoken: "cf1c028e479f7727034ee3fb918507d6"
  };
  return config;
});

// AxiosClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const {
//       config,
//       response: { status }
//     } = error;

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
