import * as AWS from "aws-sdk";
import { IConfig } from "./config";

const {
  STAGE,
  DYNAMODB_LOCAL_STAGE,
  DYNAMODB_LOCAL_ACCESS_KEY_ID,
  DYNAMODB_LOCAL_SECRET_ACCESS_KEY,
  DYNAMODB_LOCAL_ENDPOINT
} = process.env;

export const makeAwsConfig = (): void => {
  const config: IConfig = { region: "sa-east-1" };
  if (STAGE === DYNAMODB_LOCAL_STAGE) {
    config.accessKeyId = DYNAMODB_LOCAL_ACCESS_KEY_ID; // local dynamodb accessKeyId
    config.secretAccessKey = DYNAMODB_LOCAL_SECRET_ACCESS_KEY; // local dynamodb secretAccessKey
    config.endpoint = DYNAMODB_LOCAL_ENDPOINT; // local dynamodb endpoint
  }
  AWS.config.update(config);
}
