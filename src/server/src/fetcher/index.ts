import axios from "axios";
import oauth from "axios-oauth-client";
// import tokenProvider from "axios-token-interceptor";

const AxiosClient = axios.create({
  baseURL: process.env.API_DOMAIN
});

const CONFIG = {
  url: process.env.AUTH_DOMAIN + "oauth/v2/token",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE
};

export const getClientCredentials = oauth.client(AxiosClient, {
  ...CONFIG,
  redirect_uri: process.env.REDIRECT_URI,
  code: process.env.CODE,
  grant_type: "authorization_code"
});

export const getRefreshToken = oauth.client(AxiosClient, {
  ...CONFIG,
  refresh_token: process.env.REFRESH_TOKEN,
  grant_type: "refresh_token"
});

// const cache = tokenProvider.tokenCache(() => getRefreshToken().then((res: any) => res.body), {
//   getMaxAge: (body: any) => body.expires_in * 1000
// });

// AxiosClient.interceptors.request.use(
//   tokenProvider({
//     getToken: cache,
//     headerFormatter: (body: any) => "Bearer " + body.access_token
//   })
// );

export default AxiosClient;
