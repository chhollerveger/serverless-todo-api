const { REGION, DYNAMO_ENDPOINT } = process.env;

export const makeAwsConfigure = () => ({
  endpoint: DYNAMO_ENDPOINT,
  region: REGION,
});
