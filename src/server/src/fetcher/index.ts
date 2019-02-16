import axios, { AxiosInstance, AxiosConfig } from "axios";
import qs from "qs";

function axiosOAuth(axios: AxiosInstance, { url, ...credentials }: AxiosConfig) {
  const config = {
    url,
    method: "post",
    data: qs.stringify(credentials)
  };

  return () => axios(config).then((res: any) => res.data);
}

let accessToken = process.env.ACCESS_TOKEN;

const AxiosClient = axios.create({
  baseURL: process.env.API_DOMAIN
});

const CONFIG = {
  url: process.env.AUTH_DOMAIN + "oauth/v2/token",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE
};

export const getClientCredentials = axiosOAuth(AxiosClient, {
  ...CONFIG,
  redirect_uri: process.env.REDIRECT_URI,
  code: process.env.CODE,
  grant_type: "authorization_code"
});

export const getRefreshToken = axiosOAuth(AxiosClient, {
  ...CONFIG,
  refresh_token: process.env.REFRESH_TOKEN,
  grant_type: "refresh_token"
});

AxiosClient.interceptors.request.use(config => {
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  return config;
});

AxiosClient.interceptors.response.use(
  response => response,
  async error => {
    const {
      config,
      response: { status }
    } = error;

    if (status === 401) {
      let response = await getRefreshToken(config);
      accessToken = response.access_token;

      return AxiosClient.request(config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default AxiosClient;
