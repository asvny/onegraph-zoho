// const credentials = {
//   client: {
//     id: '1000.RGTA9UEV0HSZZBKJAO81IUFERTNTIH',
//     secret: '340f9ae1c73e30e37b0c3605841e9db788f299cd62',
//   },
//   auth: {
//     tokenHost: 'https://accounts.zoho.com',
//     tokenPath: '/oauth/v2/token',
//     revokePath: '/oauth/v2/revoke'
//   },
//   http: {
//     payload: {
//       grant_type: 'authorization_code'
//     }
//   },
//   options: {
//     // bodyFormat: 'json'
//   }
// };

// const oauth2 = require('simple-oauth2').create(credentials);
// const tokenConfig = {
//   scope: ['ZohoCRM.modules.all'], // also can be an array of multiple scopes, ex. ['<scope1>, '<scope2>', '...']
// };

// // Optional per-call http options
// const httpOptions = {
//   payload: JSON.stringify({
//     grant_type: 'authorization_code'
//   })
// };

// // Get the access token object for the client
// async function main() {
//   try {
//     const result = await oauth2.clientCredentials.getToken(tokenConfig, httpOptions);
//     console.log(result)
//     if (result.error) { throw result.error; }
//     const accessToken = oauth2.accessToken.create(result);
//     // console.log(accessToken)
//   } catch (error) {
//     console.log('Access Token error - ', error);
//   }
// }

// main().catch(console.error)

require('dotenv').config();

const axios = require('axios');
const qs = require('qs')

function axiosOAuth(_axios, { url, ...credentials }) {
  const config = {
    url,
    method: "post",
    data: qs.stringify(credentials)
  };

  // console.log(qs.stringify(credentials))

  return () => _axios(config).then((res) => res.data);
}



const AxiosClient = axios.create();

const CONFIG = {
  url: process.env.AUTH_DOMAIN + "oauth/v2/token",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  // scope: process.env.SCOPE
};


const getClientCredentials = axiosOAuth(AxiosClient, {
  url: process.env.AUTH_DOMAIN + "oauth/v2/token",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  scope: process.env.SCOPE,
  redirect_uri: process.env.REDIRECT_URI,
  code: process.env.CODE,
  grant_type: "authorization_code",
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent'




});

// url: 'https://accounts.zoho.com/oauth/v2/token',
// grant_type: 'authorization_code',
// client_id: '1000.RGTA9UEV0HSZZBKJAO81IUFERTNTIH',
// client_secret: '340f9ae1c73e30e37b0c3605841e9db788f299cd62',
// scope: 'ZohoCRM.modules.all',
// redirect_uri: 'https://zoho.com',
// code: '1000.c98ba53504c4151fc24fc053acac6838.70e77b87e9e261bfc24f8f1fd71dea2c'

const getRefreshToken = axiosOAuth(AxiosClient, {
  ...CONFIG,
  refresh_token: process.env.REFRESH_TOKEN,
  grant_type: "refresh_token"
});


async function main() {

  // const auth = await getClientCredentials();
  // console.log(auth);

  try {
    const auth = await getRefreshToken();
    console.log(auth)
  }
  catch (err) {
    console.log(err)
  }
}

main();