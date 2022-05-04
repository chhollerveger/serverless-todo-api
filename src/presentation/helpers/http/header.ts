export type HttpResponseHeader = { [header: string]: string | number | boolean; }

export const makeHttpResponseHeaders = (): HttpResponseHeader => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
  }
};
