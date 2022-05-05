const { REGION, DYNAMO_ENDPOINT } = process.env;

export const makeAwsConfig = () => ({
  endpoint: DYNAMO_ENDPOINT,
  region: REGION,
});
